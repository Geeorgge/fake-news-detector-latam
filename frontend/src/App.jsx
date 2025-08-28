import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./layout/MainLayout";
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";
import StatsDashboard from "./components/StatsDashboard";

function App() {

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/stats" element={<StatsDashboard />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
