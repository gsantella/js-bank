import { useState } from "react";

export default function SheenaComponent3({ balances, setBalances }) {
  const [fromAccount, setFromAccount] = useState("savings");
  const [toAccount, setToAccount] = useState("checking");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = () => {
    const transferAmount = Number(amount);

    // Basic validation
    if (transferAmount <= 0 || transferAmount > balances[fromAccount]) {
      setMessage("Invalid transfer amount!");
      return;
    }

    // Update balances
    setBalances({
      ...balances,
      [fromAccount]: balances[fromAccount] - transferAmount,
      [toAccount]: balances[toAccount] + transferAmount,
    });

    setMessage(
      `Transferred $${transferAmount.toFixed(2)} from ${fromAccount} to ${toAccount}`
    );
    setAmount(""); // clear input
  };

  return (
    <>
      <label>
        From Account:{" "}
        <select
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
        >
          <option value="savings">Savings</option>
          <option value="checking">Checking</option>
        </select>
      </label>

      <p>
        Amount:{" "}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </p>

      <label>
        To Account:{" "}
        <select
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
        >
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>
      </label>

      <button onClick={handleTransfer}>Transfer</button>

      {message && <p>{message}</p>}
    </>
  );
}
