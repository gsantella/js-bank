
import { useEffect, useState } from "react";

interface PendingItem {
  id: number;
  amount: number;
  description: string;
}

// Matches your MockAPI Account structure
interface Account {
  id: string;
  AccountHolderId?: string;
  balance?: number | string;
}

export default function Pending() {
  const urlBase =
    "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account";

  // Real account data from API
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Still mock data (since API does not support "pending" yet)
  const [pending] = useState<PendingItem[]>([
    { id: 1, amount: 100, description: "Pending transfer to checking" },
    { id: 2, amount: 50, description: "Pending bill payment" },
  ]);

  /**
   * Load ONE account from the API.
   * You can change the ID here or later make it dynamic.
   */
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch(`${urlBase}/1`); // ← example account ID
        if (!res.ok) throw new Error("Failed to fetch account");

        const data = await res.json();
        data.balance = Number(data.balance) || 0;
        setAccount(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load account data");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  if (loading) return <p>Loading account...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!account) return null;

  return (
    <>
      {/* REAL account data from API */}
      <p>User Account Holder Name: {account.AccountHolderId ?? "—"}</p>
      <p>User Account ID: **** {account.id}</p>
      <p>Balance of User Account: ${Number(account.balance).toFixed(2)}</p>

      <h3>Pending Withdrawals:</h3>

      {/*Mock pending data (API does not provide this yet) */}
      <ul>
        {pending.map((item) => (
          <li key={item.id}>
            {item.description}: -${item.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </>
  );
}
