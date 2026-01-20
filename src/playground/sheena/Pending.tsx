import { useState } from "react";

interface PendingItem {
  id: number;
  amount: number;
  description: string;
}

export default function Pending() {
  // Fake user data
  const accountHolder = "Sheena Martinez";
  const accountId = "**** 4821";
  const balance = 2450.75;

  // Fake pending withdrawals
  const [pending, setPending] = useState<PendingItem[]>([
    { id: 1, amount: 100, description: "Pending transfer to checking" },
    { id: 2, amount: 50, description: "Pending bill payment" },
  ]);

  return (
    <>
      <p>User Account Holder Name: {accountHolder}</p>
      <p>User Account ID: {accountId}</p>
      <p>Balance of User Account: ${balance.toFixed(2)}</p>

      <h3>Pending Withdrawals:</h3>
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
