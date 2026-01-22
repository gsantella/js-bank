
import { useState, useEffect } from "react";

type Account = {
  id: string;
  AccountHolderId?: string;
  balance?: number | string;
};

type TransferProps = {
  // Keep these if your parent is passing them (optional)
  accountData?: any;
  setAccountData?: (v: any) => void;

  // NEW: parent can listen for successful transfers
  onTransfer?: (amount: number, fromId: string, toId: string) => void;
};

export default function SheenaComponent3({
  accountData,
  setAccountData,
  onTransfer,
}: TransferProps) {
  const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account";

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [fromAccountID, setFromAccountID] = useState("");
  const [toAccountID, setToAccountID] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all accounts
  const fetchAccounts = async () => {
    try {
      const res = await fetch(urlBase);
      if (!res.ok) throw new Error("Failed to fetch accounts");
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load accounts from API");
    }
  };

  useEffect(() => {
    fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Correct, safe transfer logic
  const handleTransfer = async () => {
    const transferAmount = Number(amount);

    if (!fromAccountID || !toAccountID) {
      return setMessage("Select both accounts");
    }
    if (fromAccountID === toAccountID) {
      return setMessage("Cannot transfer to the same account");
    }
    if (!transferAmount || isNaN(transferAmount) || transferAmount <= 0) {
      return setMessage("Enter a valid transfer amount");
    }

    setLoading(true);
    setMessage("");

    try {
      // Fetch latest snapshots for both accounts
      const [fromRes, toRes] = await Promise.all([
        fetch(`${urlBase}/${fromAccountID}`),
        fetch(`${urlBase}/${toAccountID}`),
      ]);
      if (!fromRes.ok || !toRes.ok) {
        throw new Error("Failed to fetch account data");
      }

      const fromAccount = await fromRes.json();
      const toAccount = await toRes.json();

      const fromBalance = Number(fromAccount.balance) || 0;
      const toBalance = Number(toAccount.balance) || 0;

      if (transferAmount > fromBalance) {
        setLoading(false);
        return setMessage("Insufficient funds in source account");
      }

      const newFromBalance = fromBalance - transferAmount;
      const newToBalance = toBalance + transferAmount;

      // PATCH both balances
      const updateFrom = fetch(`${urlBase}/${fromAccountID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ balance: newFromBalance }),
      });

      const updateTo = fetch(`${urlBase}/${toAccountID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ balance: newToBalance }),
      });

      const [updateFromRes, updateToRes] = await Promise.all([
        updateFrom,
        updateTo,
      ]);

      if (!updateFromRes.ok || !updateToRes.ok) {
        throw new Error("Balance update failed");
      }

      // Refresh UI list
      await fetchAccounts();

      // Notify parent for session stats (use current IDs before clearing state)
      onTransfer?.(transferAmount, fromAccountID, toAccountID);

      // Reset form
      setAmount("");
      setFromAccountID("");
      setToAccountID("");

      setMessage(
        `✅ Transferred $${transferAmount.toFixed(
          2
        )} from account ${fromAccountID} to ${toAccountID}`
      );
    } catch (err) {
      console.error(err);
      setMessage("❌ Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Transfer Between Accounts</h3>

      <label>
        From Account:&nbsp;
        <select
          value={fromAccountID}
          onChange={(e) => setFromAccountID(e.target.value)}
          disabled={loading}
        >
          <option value="">-- Select Source Account --</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              ID: {acc.id} | Holder: {acc.AccountHolderId ?? "—"} | Balance: $
              {Number(acc.balance || 0).toFixed(2)}
            </option>
          ))}
        </select>
      </label>

      <br />
      <br />

      <label>
        To Account:&nbsp;
        <select
          value={toAccountID}
          onChange={(e) => setToAccountID(e.target.value)}
          disabled={loading}
        >
          <option value="">-- Select Destination Account --</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              ID: {acc.id} | Holder: {acc.AccountHolderId ?? "—"} | Balance: $
              {Number(acc.balance || 0).toFixed(2)}
            </option>
          ))}
        </select>
      </label>

      <p>
        Amount:&nbsp;
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
          min="0"
          step="0.01"
        />
      </p>

      <button onClick={handleTransfer} disabled={loading}>
        {loading ? "Transferring..." : "Transfer"}
      </button>

      {message && (
        <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
