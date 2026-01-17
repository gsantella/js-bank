import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";
import './App.css'

export default function App() {
  return (
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
  )
}