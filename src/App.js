import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import OrderList from "./pages/OrderList/OrderList";
import UserList from "./pages/UserList/UserList";
import LanguagePrice from "./pages/language-price/LanguagePrice";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/language-price" element={<LanguagePrice />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
