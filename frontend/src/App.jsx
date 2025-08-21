import "./App.css";
import { useState } from "react";
import viteLogo from "/vite.svg";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import About from "./pages/About";

function App() {
  const [count, setCount] = useState(0);

  return (
    
    <MainLayout>
      <Home />
      {/* <About /> */}
    </MainLayout>
  );
}

export default App;
