
import { useEffect, useState } from "react";

type Account = {
  id: string;
  AccountHolderId?: string;
  balance?: number | string;
};

type DepositProps = {
  // Keep these if your parent is passing them (optional)
  accountData?: any;
  setAccountData?: (v: any) => void;

  // NEW: parent can listen for successful deposits
  onDeposit?: (amount: number, accountId: string) => void;
};

export default function SheenaComponent2({
  accountData,
  setAccountData,
  onDeposit,
}: DepositProps) {
  const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account";

  // All accounts for the dropdown.
  const [accounts, setAccounts] = useState<Account[]>([]);
  // The currently selected account ID in the dropdown.
  const [selectedId, setSelectedId] = useState("");
  // The full account object for the selected ID (loaded on-demand).
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  // Controlled input for deposit amount.
  const [depositAmount, setDepositAmount] = useState("");
  // User-facing status: success or error message.
  const [message, setMessage] = useState<string>("");
  // Global loading flag to prevent duplicate actions and show progress text.
  const [loading, setLoading] = useState(false);

  // Load all accounts once on mount to populate the dropdown.
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
   * Handle a deposit:
   * - Validate amount and selection
   * - Compute the new balance
   * - PATCH only the `balance` field
   * - Refresh selected account and optionally the list
   * - Notify parent via onDeposit callback
   */
  const handleDeposit = async () => {
    const amount = Number(depositAmount);

    if (!selectedAccount) return setMessage(" No account selected");
    if (!amount || isNaN(amount) || amount <= 0) {
      return setMessage("Enter a valid deposit amount");
    }

    const currentBalance = Number(selectedAccount.balance) || 0;
    const newBalance = currentBalance + amount;

    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${urlBase}/${selectedAccount.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ balance: newBalance }),
      });
      if (!res.ok) throw new Error("Update failed");

      // Update the local selected account view with the latest server data.
      const updated = await res.json();
      updated.balance = Number(updated.balance) || 0;
      setSelectedAccount(updated);

      // Clear input and show success.
      setDepositAmount("");
      setMessage(`✅ Deposited $${amount.toFixed(2)} successfully`);

      // Notify parent for session stats
      onDeposit?.(amount, selectedAccount.id);

      // Optional: refresh the full list so the dropdown reflects updated balance.
      try {
        const resAll = await fetch(urlBase);
        if (resAll.ok) {
          const all = await resAll.json();
          setAccounts(all);
        }
      } catch {
        // ignore list refresh errors
      }
    } catch (err) {
      console.error(err);
      setMessage("Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Select Account</h3>

      {/* Lightweight "loading" hint before any message is shown */}
      {accounts.length === 0 && !message && <p>Loading accounts...</p>}

      {/* Account dropdown */}
      {accounts.length > 0 && (
        <select
          value={selectedId}
          onChange={(e) => {
            const id = e.target.value;
            setSelectedId(id);
            void loadAccount(id);
          }}
          disabled={loading}
        >
          <option value="">-- Select Account --</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              ID: {acc.id} | Holder: {acc.AccountHolderId ?? "—"}
            </option>
          ))}
        </select>
      )}

      {/* Details and deposit controls when an account is selected */}
      {selectedAccount && (
        <div style={{ marginTop: "1em" }}>
          <p>Account Holder ID: {selectedAccount.AccountHolderId ?? "—"}</p>
          <p>Account Number: **** {selectedAccount.id}</p>
          <p>Balance: ${Number(selectedAccount.balance).toFixed(2)}</p>

          <input
            placeholder="Enter Deposit Amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            disabled={loading}
            type="number"
            min="0"
            step="0.01"
          />
          <button onClick={handleDeposit} disabled={loading}>
            {loading ? "Processing..." : "Submit Deposit"}
          </button>
        </div>
      )}

      {/* Messages */}
      {message && (
        <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
