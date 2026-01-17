import { useState, useEffect } from "react";

export default function GuidoComponent1() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      const data = await res.json();
      setJoke(data);
    } catch (err) {
      setJoke({ setup: "Oops!", punchline: "Couldn't fetch a joke." });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <p><strong>{joke.setup}</strong></p>
      <p>{joke.punchline}</p>
      <button onClick={fetchJoke}>Get another joke</button>
    </div>
  );
}
