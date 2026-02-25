import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AddTransaction from "./pages/AddTransaction";
import LiveDashboard from "./pages/LiveDashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="app-nav">
        <div className="app-nav-left">
          <span className="app-nav-connected">
            <span className="app-nav-dot" />
            Connected
          </span>
        </div>
        <div className="app-nav-right">
          <div className="app-nav-brand-text">
            <span className="app-nav-brand-name">FinTrack</span>
            <span className="app-nav-brand-sub">Financial transaction management</span>
          </div>
          <div className="app-nav-brand-icon">🏛</div>
        </div>
      </nav>

      <div className="app-tab-bar">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            "app-tab-link" + (isActive ? " app-tab-link--active" : "")
          }
        >
          Add Transaction
        </NavLink>
        <NavLink
          to="/monitor"
          className={({ isActive }) =>
            "app-tab-link" + (isActive ? " app-tab-link--active" : "")
          }
        >
          Live Dashboard
        </NavLink>
      </div>

      <Routes>
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/monitor" element={<LiveDashboard />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;