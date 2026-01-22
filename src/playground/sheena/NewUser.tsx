
import { useState } from "react";

export default function NewUser() {
  const urlBase =
    "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account";

  // Simple form state
  const [accountHolder, setAccountHolder] = useState("");
  const [accountType, setAccountType] = useState("Checking");
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Create a new account using MockAPI
   */
  const handleCreateAccount = async () => {
    const startingBalance = Number(balance);

    // Basic validation
    if (!accountHolder) {
      return setMessage(" Enter account holder name");
    }
    if (!startingBalance || startingBalance < 0) {
      return setMessage("Enter a valid starting balance");
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(urlBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          AccountHolderId: accountHolder,
          accountType,
          balance: startingBalance,
        }),
      });

      if (!res.ok) throw new Error("Failed to create account");

      const newAccount = await res.json();

      setMessage(
        `New ${accountType} account created for ${newAccount.AccountHolderId}`
      );

      // Reset form
      setAccountHolder("");
      setAccountType("Checking");
      setBalance("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to create new account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Create New Account</h3>

      <p>
        Account Holder Name:
        <br />
        <input
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
          placeholder="Enter full name"
          disabled={loading}
        />
      </p>

      <p>
        Account Type:
        <br />
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          disabled={loading}
        >
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
        </select>
      </p>

      <p>
        Starting Balance:
        <br />
        <input
          type="number"
          min="0"
          step="0.01"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="0.00"
          disabled={loading}
        />
      </p>

      <button onClick={handleCreateAccount} disabled={loading}>
        {loading ? "Creating..." : "Create New Account"}
      </button>

      {message && (
        <p style={{ color: message.startsWith(":3") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </>
  );
}
