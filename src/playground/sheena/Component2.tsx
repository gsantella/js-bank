import { useState } from "react";

export default function SheenaComponent2({ balances }) {
  const [accountType, setAccountType] = useState("savings");

  return (
    <>
      <p>Account Holder Name: Sheena Martinez</p>
      <p>Account Number: **** 4821</p>

      <label>
        Account Type:{" "}
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="savings">Savings</option>
          <option value="checking">Checking</option>
        </select>
      </label>

      <p>Balance: ${balances[accountType].toFixed(2)}</p>
    </>
  );
}
