import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import OrderList from "./pages/OrderList/OrderList";
import UserList from "./pages/UserList/UserList";
import LanguagePrice from "./pages/language-price/LanguagePrice";
import MyAccount from "./pages/MyAccount/MyAccount";
import Order from "./pages/order/Order";
import Notifications from "./pages/notifications/Notifications";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/language-price" element={<LanguagePrice />} />
        <Route path="/order" element={<Order />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
