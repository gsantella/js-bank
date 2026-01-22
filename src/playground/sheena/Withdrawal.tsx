
import { useEffect, useState } from "react";

type Account = {
  id: string;
  AccountHolderId?: string;
  balance?: number | string;
};

export default function Withdrawal() {
  const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account";

  // All accounts for the dropdown.
  const [accounts, setAccounts] = useState<Account[]>([]);
  // The currently selected account ID in the dropdown.
  const [selectedId, setSelectedId] = useState("");
  // The full account object for the selected ID (loaded on-demand).
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  // Controlled input for withdrawal amount.
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  // User-facing status: success or error message.
  const [message, setMessage] = useState<string>("");
  // Global loading flag to prevent duplicate actions and show progress text.
  const [loading, setLoading] = useState(false);

  /**
   * Load all accounts once on mount to populate the dropdown.
   */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(urlBase);
        if (!res.ok) throw new Error("Failed to fetch account list");
        const data = await res.json();
        setAccounts(data);
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch accounts from API");
      }
    })();
  }, []);

  /**
   * Fetch a single account by ID.
   * - If no ID, we clear the current selection.
   * - On success, we coerce `balance` to a number to avoid string math issues.
   * - On failure, we show a friendly error message.
   */
  const loadAccount = async (id: string) => {
    if (!id) {
      setSelectedAccount(null);
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${urlBase}/${id}`);
      if (!res.ok) throw new Error("Account not found");
      const data: Account = await res.json();
      data.balance = Number(data.balance) || 0; // normalize to number
      setSelectedAccount(data);
    } catch (err) {
      console.error(err);
      setSelectedAccount(null);
      setMessage("Failed to load account");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Withdraw from the selected account.
   */
  const handleWithdrawal = async () => {
    const amount = Number(withdrawalAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage("Enter a valid withdrawal amount");
      return;
    }
    if (!selectedAccount) {
      setMessage("No account selected");
      return;
    }

    const currentBalance = Number(selectedAccount.balance) || 0;
    const newBalance = currentBalance - amount;
    if (newBalance < 0) {
      setMessage("Insufficient funds for this withdrawal");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${urlBase}/${selectedAccount.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ balance: newBalance }),
      });
      if (!res.ok) throw new Error("Withdrawal failed");

      // Reload the account to reflect the new balance
      await loadAccount(selectedAccount.id);
      setMessage("Withdrawal successful");
      setWithdrawalAmount("");
    } catch (err) {
      console.error(err);
      setMessage("Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  // Automatically load account details when a user selects a new account
  useEffect(() => {
    if (selectedId) {
      void loadAccount(selectedId);
    } else {
      setSelectedAccount(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Withdrawal</h2>

      <label htmlFor="account">Select Account</label>
      <select
        id="account"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        disabled={loading || accounts.length === 0}
        style={{ display: "block", width: "100%", padding: "8px", marginBottom: "12px" }}
      >
        <option value="">-- Choose an account --</option>
        {accounts.map((acc) => (
          <option key={acc.id} value={acc.id}>
            {`ID: ${acc.id}`}{acc.AccountHolderId ? ` — Holder: ${acc.AccountHolderId}` : ""}
          </option>
        ))}
      </select>

      <div style={{ marginBottom: "12px" }}>
        <strong>Balance: </strong>
        {selectedAccount != null ? `$${Number(selectedAccount.balance || 0).toFixed(2)}` : "—"}
      </div>

      <label htmlFor="amount">Withdrawal Amount</label>
      <input
        id="amount"
        type="number"
        min="0"
        step="0.01"
        value={withdrawalAmount}
        onChange={(e) => setWithdrawalAmount(e.target.value)}
        disabled={loading || !selectedAccount}
        placeholder="e.g., 25.00"
        style={{ display: "block", width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      <button
        onClick={handleWithdrawal}
        disabled={loading || !selectedAccount || !withdrawalAmount}
        style={{ padding: "10px 14px", cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Processing..." : "Withdraw"}
      </button>

      {message && (
        <div style={{ marginTop: "12px", color: /failed|insufficient|invalid/i.test(message) ? "crimson" : "green" }}>
          {message}
        </div>
      )}
    </div>
  );
}
