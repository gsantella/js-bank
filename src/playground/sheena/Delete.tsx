
import { useEffect, useState } from "react";

type Account = {
  id: string;
  AccountHolderId?: string;
  balance?: number | string;
};

export default function DeleteAccounts() {
  const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account";

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(urlBase);
      if (!res.ok) throw new Error("Failed to load accounts");
      const data: Account[] = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) {
      setMessage("Select an account to delete");
      return;
    }

    const confirm = window.confirm(`Delete account #${selectedId}?`);
    if (!confirm) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${urlBase}/${selectedId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      // Remove from list and reset selection
      setAccounts((prev) => prev.filter((a) => a.id !== selectedId));
      setSelectedId("");
      setMessage("Account deleted");
    } catch (err) {
      console.error(err);
      setMessage("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "1.5rem auto", fontFamily: "sans-serif" }}>
      <h3>Delete Account</h3>

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

      <button
        onClick={handleDelete}
        disabled={loading || !selectedId}
        style={{ padding: "8px 12px" }}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>

      <button
        onClick={fetchAccounts}
        disabled={loading}
        style={{ marginLeft: 8, padding: "8px 12px" }}
      >
        Refresh
      </button>

      {message && (
        <p style={{ marginTop: "10px", color: /fail/i.test(message) ? "crimson" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}
