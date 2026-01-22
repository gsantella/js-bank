import { useEffect, useState } from "react";

/**
 * Tracks session-only statistics.
 * These reset when the page reloads.
 */
type Stats = {
  depositsCount: number;
  depositsAmount: number;
  withdrawalsCount: number;
  withdrawalsAmount: number;
  transfersCount: number;
  transfersAmount: number;
};

/**
 * Shape of an account returned from the API
 */
type Account = {
  id: string;
  AccountHolderId?: string;
  balance?: number | string;
};

export default function AccountPage() {
  /**
   * Base API endpoint for accounts
   */
  const urlBase =
    "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account";

  /**
   * Session stats (read-only on this page)
   * These values are displayed but not modified here
   */
  const [stats] = useState<Stats>({
    depositsCount: 0,
    depositsAmount: 0,
    withdrawalsCount: 0,
    withdrawalsAmount: 0,
    transfersCount: 0,
    transfersAmount: 0,
  });

  /**
   * Holds the sum of all account balances from the API
   */
  const [totalApiBalance, setTotalApiBalance] = useState<number>(0);

  /**
   * Loading state while fetching balances
   */
  const [loadingTotal, setLoadingTotal] = useState<boolean>(false);

  /**
   * Error message if the API request fails
   */
  const [totalError, setTotalError] = useState<string>("");

  /**
   * Fetches all accounts from the API and
   * calculates the total balance
   */
  const refreshTotalApiBalance = async () => {
    setLoadingTotal(true);     // show loading state
    setTotalError("");         // clear any previous error

    try {
      const res = await fetch(urlBase);

      // Stop if the request failed
      if (!res.ok) throw new Error("Failed to fetch accounts");

      const data: Account[] = await res.json();

      // Convert balances to numbers and sum them
      const sum = data.reduce(
        (acc, account) => acc + (Number(account.balance) || 0),
        0
      );

      setTotalApiBalance(sum);
    } catch (error) {
      console.error(error);
      setTotalError("Failed to load total API balance");
    } finally {
      setLoadingTotal(false); // stop loading state
    }
  };

  /**
   * Run once when the component mounts
   * Loads the total balance automatically
   */
  useEffect(() => {
    refreshTotalApiBalance();
  }, []);

  return (
    /**
     * Main overview container
     */
    <section
      style={{
        maxWidth: 900,
        margin: "1rem auto",
        padding: "1rem",
        border: "1px solid #eee",
        borderRadius: 12,
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Overview</h2>

      {/* Responsive grid for stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 12,
        }}
      >
        {/* Total API balance card */}
        <div style={{ padding: 12, background: "#fafafa", borderRadius: 10 }}>
          <div style={{ fontSize: 12, color: "#555" }}>
            Total API Balance
          </div>

          <div style={{ fontSize: 20, fontWeight: 700 }}>
            {loadingTotal
              ? "Loading..."
              : `$${totalApiBalance.toFixed(2)}`}
          </div>

          {/* Show error only if one exists */}
          {totalError && (
            <div style={{ color: "crimson", fontSize: 12 }}>
              {totalError}
            </div>
          )}
        </div>

        {/* Deposit session stats */}
        <div style={{ padding: 12, background: "#fafafa", borderRadius: 10 }}>
          <div style={{ fontSize: 12, color: "#555" }}>
            Deposits (session)
          </div>
          <div>
            <strong>{stats.depositsCount}</strong> actions
          </div>
          <div>
            Amount: ${stats.depositsAmount.toFixed(2)}
          </div>
        </div>

        {/* Withdrawal session stats */}
        <div style={{ padding: 12, background: "#fafafa", borderRadius: 10 }}>
          <div style={{ fontSize: 12, color: "#555" }}>
            Withdrawals (session)
          </div>
          <div>
            <strong>{stats.withdrawalsCount}</strong> actions
          </div>
          <div>
            Amount: ${stats.withdrawalsAmount.toFixed(2)}
          </div>
        </div>

        {/* Transfer session stats */}
        <div style={{ padding: 12, background: "#fafafa", borderRadius: 10 }}>
          <div style={{ fontSize: 12, color: "#555" }}>
            Transfers (session)
          </div>
          <div>
            <strong>{stats.transfersCount}</strong> actions
          </div>
          <div>
            Amount: ${stats.transfersAmount.toFixed(2)}
          </div>
        </div>
      </div>
    </section>
  );
}
