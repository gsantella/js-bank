import { useState } from "react";
import SheenaComponent2 from "./SheenaComponent2";
import SheenaComponent3 from "./SheenaComponent3";

export default function AccountPage() {
  const [balances, setBalances] = useState({
    savings: 2450.75,
    checking: 820.32,
  });

  return (
    <>
      <article>
        <header>User Account Summary</header>
        <SheenaComponent2 balances={balances} />
      </article>

      <article>
        <header>Transfer Form</header>
        <SheenaComponent3 balances={balances} setBalances={setBalances} />
      </article>
    </>
  );
}
