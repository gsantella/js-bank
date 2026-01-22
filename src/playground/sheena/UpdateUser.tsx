
import { useState } from "react";

export default function UpdateUser() {
  // Base API URL
  const urlBase =
    "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account";

  // ID entered to find an existing user/account
  const [searchId, setSearchId] = useState("");

  // Fields that can be updated
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  // Selected account loaded from API
  const [account, setAccount] = useState<any>(null);

  // Message for success/errors
  const [message, setMessage] = useState("");

  /**
   * SEARCH ACCOUNT
   * Translation: "Find this user/account from the database"
   */
  const handleSearch = async () => {
    if (!searchId) return setMessage("Enter an account ID");

    try {
      const res = await fetch(`${urlBase}/${searchId}`);
      if (!res.ok) throw new Error("Account not found");

      const data = await res.json();
      setAccount(data);
      setName(data.AccountHolderId || "");
      setBalance(String(Number(data.balance) || 0));
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Account not found");
      setAccount(null);
    }
  };

  /**
   * UPDATE ACCOUNT
   * Translation: "Save the new name and/or balance"
   */
  const handleUpdate = async () => {
    if (!account) return setMessage("No account loaded");

    try {
      const res = await fetch(`${urlBase}/${account.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          AccountHolderId: name,
          balance: Number(balance),
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      setMessage("✅ Account updated successfully");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update account");
    }
  };

  return (
    <>
      <h3>Update User</h3>

      {/* SEARCH BAR
          Translation: "Type an account ID to find the user" */}
      <p>
        Account ID:
        <br />
        <input
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter account ID"
        />
        <button onClick={handleSearch}>Search</button>
      </p>

      {/* SHOW FIELDS ONLY AFTER ACCOUNT IS FOUND */}
      {account && (
        <>
          {/* NAME UPDATE
              Translation: "Change account holder name" */}
          <p>
            Account Holder Name:
            <br />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </p>

          {/* BALANCE UPDATE
              Translation: "Change the balance amount" */}
          <p>
            Balance:
            <br />
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </p>

          {/* SUBMIT BUTTON
              Translation: "Save changes to the database" */}
          <button onClick={handleUpdate}>Submit Update</button>
        </>
      )}

      {/* STATUS MESSAGE */}
      {message && <p>{message}</p>}
    </>
  );
}
