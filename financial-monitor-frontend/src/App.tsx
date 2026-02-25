import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AddTransaction from "./pages/AddTransaction";
import LiveDashboard from "./pages/LiveDashboard";
import "./App.css";

function App() {
  return (
    // <BrowserRouter>
    //   <nav style={{ padding: 20 }}>
    //     <NavLink to="/add" style={{ marginRight: 20 }}>Add Transaction</NavLink>
    //     <NavLink to="/monitor">Live Dashboard</NavLink>
    //   </nav>

    //   <Routes>
    //     <Route path="/add" element={<AddTransaction />} />
    //     <Route path="/monitor" element={<LiveDashboard />} />
    //   </Routes>
    // </BrowserRouter>
    // חדש
//  <BrowserRouter>
//       <nav className="app-nav">
//         <div className="app-nav-inner">
//           <div className="app-nav-brand">
//             <span className="app-nav-brand-mark">◈</span>
//             <span className="app-nav-brand-name">FinFlow</span>
//           </div>
//           <div className="app-nav-links">
//             <NavLink
//               to="/add"
//               className={({ isActive }) =>
//                 "app-nav-link" + (isActive ? " app-nav-link--active" : "")
//               }
//             >
//               Add Transaction
//             </NavLink>
//             <NavLink
//               to="/monitor"
//               className={({ isActive }) =>
//                 "app-nav-link" + (isActive ? " app-nav-link--active" : "")
//               }
//             >
//               Live Dashboard
//             </NavLink>
//           </div>
//         </div>
//       </nav>

//       <Routes>
//         <Route path="/add" element={<AddTransaction />} />
//         <Route path="/monitor" element={<LiveDashboard />} />
//       </Routes>
//     </BrowserRouter>
// V0 
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
    // כהה
    // <BrowserRouter>
    //   <nav className="app-nav">
    //     <div className="app-nav-inner">
    //       <span className="app-nav-brand">⬡ FinFlow</span>
    //       <div className="app-nav-links">
    //         <NavLink
    //           to="/add"
    //           className={({ isActive }) => "app-nav-link" + (isActive ? " app-nav-link--active" : "")}
    //         >
    //           Add Transaction
    //         </NavLink>
    //         <NavLink
    //           to="/monitor"
    //           className={({ isActive }) => "app-nav-link" + (isActive ? " app-nav-link--active" : "")}
    //         >
    //           Live Dashboard
    //         </NavLink>
    //       </div>
    //     </div>
    //   </nav>
    //   <Routes>
    //     <Route path="/add" element={<AddTransaction />} />
    //     <Route path="/monitor" element={<LiveDashboard />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;