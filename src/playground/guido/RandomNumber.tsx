import { useState } from "react";

export default function RandomNumber() {
  const [value, setValue] = useState(() => Math.floor(Math.random() * 100));

  const generate = () => {
    setValue(Math.floor(Math.random() * 100));
  };

  return (
    <div>
      <p>Random number: {value}</p>
      <button onClick={generate}>Generate new</button>
    </div>
  );
}
