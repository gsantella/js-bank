
import { useState } from "react";

// Very simple shape for accounts returned by your API
type Account = {
  id: string;
  AccountHolderId?: string;
  balance?: number | string; // API may return balance as string
};

export default function CreateJointAccount() {
  // Base API URL (same as your other components)
  const urlBase = "https://695f03af7f037703a8128fbf.mockapi.io/api/v1/Account";

  // Two IDs that the user will type in (the accounts to join)
  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");

  // Loaded account details (so the user can preview before creating)
  const [firstAcc, setFirstAcc] = useState<Account | null>(null);
  const [secondAcc, setSecondAcc] = useState<Account | null>(null);

  // Message shown to the user (success or error)
  const [message, setMessage] = useState("");

  // Loading flag to prevent double clicks and to show "Loading..." text
  const [loading, setLoading] = useState(false);

  /**
   * Helper: Load one account by ID from the API.
   * Returns the Account or null if not found.
   */
  const loadAccountById = async (id: string): Promise<Account | null> => {
    if (!id.trim()) return null; // no empty IDs
    const res = await fetch(`${urlBase}/${id}`);
    if (!res.ok) return null; // not found or API error
    const data: Account = await res.json();
    return data;
    };

  /**
   * Load both accounts.
   * - Checks that two different IDs are provided.
   * - Fetches both in parallel.
   * - Stores them in state so we can show a preview.
   */
  const handleLoadAccounts = async () => {
    // Clear old messages
    setMessage("");

    // Basic validation
    if (!firstId.trim() || !secondId.trim()) {
      setMessage("Please enter both account IDs.");
      return;
    }
    if (firstId.trim() === secondId.trim()) {
      setMessage("The two account IDs must be different.");
      return;
    }

    // Start loading
    setLoading(true);

    try {
      // Fetch both accounts at the same time
      const [a, b] = await Promise.all([
        loadAccountById(firstId.trim()),
        loadAccountById(secondId.trim()),
      ]);

      // If any account wasn't found, show an error
      if (!a || !b) {
        setFirstAcc(a);
        setSecondAcc(b);
        setMessage("One or both accounts were not found.");
        return;
      }

      // Save accounts to state (for preview)
      setFirstAcc(a);
      setSecondAcc(b);
      setMessage(""); // clear any old message
    } catch (err) {
      console.error(err);
      setMessage("Failed to load accounts.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a NEW joint account by combining:
   * - Holder name: "<HolderA> + <HolderB>" (fallback to IDs if names missing)
   * - Balance: sum of both balances
   *
   * This does NOT delete or change the original accounts.
   */
  const handleCreateJoint = async () => {
    // Ensure both accounts are loaded first
    if (!firstAcc || !secondAcc) {
      setMessage("Load both accounts first.");
      return;
    }

    // Convert balances to numbers safely
    const balanceA = Number(firstAcc.balance) || 0;
    const balanceB = Number(secondAcc.balance) || 0;

    // Calculate new combined balance
    const newBalance = balanceA + balanceB;

    // Build a simple display for the joint holder
    const holderA = firstAcc.AccountHolderId || `ID:${firstAcc.id}`;
    const holderB = secondAcc.AccountHolderId || `ID:${secondAcc.id}`;
    const jointHolder = `${holderA} + ${holderB}`;

    setLoading(true);
    setMessage("");

    try {
      // Create the new joint account via POST
      const res = await fetch(urlBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          AccountHolderId: jointHolder,
          balance: newBalance,
        }),
      });

      if (!res.ok) throw new Error("Failed to create joint account");

      const created: Account = await res.json();

      // Success message with the new account's ID and balance
      setMessage(
        `✅ Joint account created (id: ${created.id}) with balance $${Number(
          created.balance
        ).toFixed(2)}.`
      );

      // Optional: clear inputs and preview
      setFirstId("");
      setSecondId("");
      setFirstAcc(null);
      setSecondAcc(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Could not create joint account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "2rem auto", fontFamily: "sans-serif" }}>
      {/* Title */}
      <h3>Create Joint Account</h3>

      {/* Two text inputs for account IDs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div>
          <label>First Account ID</label>
          <input
            value={firstId}
            onChange={(e) => setFirstId(e.target.value)}
            placeholder="e.g., 1"
            disabled={loading}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div>
          <label>Second Account ID</label>
          <input
            value={secondId}
            onChange={(e) => setSecondId(e.target.value)}
            placeholder="e.g., 2"
            disabled={loading}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
      </div>

      {/* Button: Load both accounts so the user can preview */}
      <div style={{ marginTop: 12 }}>
        <button onClick={handleLoadAccounts} disabled={loading || !firstId || !secondId}>
          {loading ? "Loading..." : "Load Accounts"}
        </button>
      </div>

      {/* Preview of both accounts (only shows after loading) */}
      {(firstAcc || secondAcc) && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <strong>Preview</strong>
          <div style={{ marginTop: 6 }}>
            {firstAcc ? (
              <div>
                A) ID: {firstAcc.id} | Holder: {firstAcc.AccountHolderId ?? "—"} | Balance: $
                {Number(firstAcc.balance || 0).toFixed(2)}
              </div>
            ) : (
              <div>A) Not loaded</div>
            )}
            {secondAcc ? (
              <div>
                B) ID: {secondAcc.id} | Holder: {secondAcc.AccountHolderId ?? "—"} | Balance: $
                {Number(secondAcc.balance || 0).toFixed(2)}
              </div>
            ) : (
              <div>B) Not loaded</div>
            )}
          </div>

          {/* Show the resulting merged balance if both are present */}
          {firstAcc && secondAcc && (
            <div style={{ marginTop: 8 }}>
              New Joint Balance: $
              {(
                (Number(firstAcc.balance) || 0) + (Number(secondAcc.balance) || 0)
              ).toFixed(2)}
            </div>
          )}
        </div>
      )}

      {/* Button: Create the joint account */}
      <div style={{ marginTop: 12 }}>
        <button
          onClick={handleCreateJoint}
          disabled={loading || !firstAcc || !secondAcc}
        >
          {loading ? "Creating..." : "Create Joint Account"}
        </button>
      </div>

      {/* Status message (errors or success) */}
      {message && (
        <p
          style={{
            marginTop: 10,
            color: /fail|error|not found|missing|could not/i.test(message)
              ? "crimson"
              : "green",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
