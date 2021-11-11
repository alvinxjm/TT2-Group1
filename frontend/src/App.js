import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ExpensesPage from "./components/pages/ExpensesPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/expenses" element={<ExpensesPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
