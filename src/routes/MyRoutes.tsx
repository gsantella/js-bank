import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import About from "../About";
import Playground from "../Playground";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Playground />} />
      <Route path="/about" element={<About />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

