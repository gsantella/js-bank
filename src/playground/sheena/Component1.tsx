
import { useEffect, useState } from "react";

export default function SheenaComponent1() {
  const urlBase =
    "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account";

  // Stores all accounts from API
  const [accounts, setAccounts] = useState<any[]>([]);

  // Account ID typed for search
  const [searchId, setSearchId] = useState("");

  // Status message
  const [message, setMessage] = useState("");

  /**
   * LOAD ACCOUNTS
   * Translation: "Get all users/accounts from the database"
   */
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await fetch(urlBase);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAccounts(data);
      setMessage("");
    } catch {
      setMessage("Failed to load accounts");
    }
  };

  /**
   * SEARCH ACCOUNT
   * Translation: "Find one account by ID"
   */
  const handleSearch = async () => {
    if (!searchId) {
      setMessage("Enter an account ID to search");
      return;
    }

    try {
      const res = await fetch(`${urlBase}/${searchId}`);
      if (!res.ok) throw new Error();

      const data = await res.json();
      setAccounts([data]); // show only searched account
      setMessage("");
    } catch {
      setMessage("Account not found");
    }
  };

  return (
    <>
      <h3>Bank Accounts</h3>

      {/* TOTAL USERS */}
      <p>Total Users: {accounts.length}</p>

      {/* SEARCH INPUT */}
      <input
        placeholder="Enter Account ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />

      {/* SEARCH BUTTON */}
      <button onClick={handleSearch}>Search</button>

      {/* RESET BUTTON */}
      <button onClick={fetchAccounts}>Reset</button>

      {/* ACCOUNT LIST */}
      <ul>
        {accounts.map((acc) => (
          <li key={acc.id}>
            ID: {acc.id} | Holder: {acc.AccountHolderId} | Balance: $
            {Number(acc.balance).toFixed(2)}
          </li>
        ))}
      </ul>

      {/* STATUS MESSAGE */}
      {message && <p>{message}</p>}
    </>
  );
}
