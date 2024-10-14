import { Routes as Switch, Route, Navigate } from "react-router-dom";
import Cart from "../pages/basket";
import Contact from "../pages/contact";
import Login from "../pages/login";
import ProductList from "../pages/product";
import Register from "../pages/register";
import Single from "../pages/single";
import Wishes from "../pages/liked";

const Routes = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Switch>
      <Route path="/" element={<ProductList />} />

      <Route path="contact">
        <Route index element={<Contact />} />
        <Route path="*" element={<Navigate to={"/contact"} />} />
      </Route>

      <Route path="wishes">
        <Route index element={<Wishes />} />
        <Route path="*" element={<Navigate to={"/wishes"} />} />
      </Route>

      <Route path="/product/:productID" element={<Single />} />

      <Route
        path="sign-in"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />

      <Route
        path="sign-up"
        element={isAuthenticated ? <Navigate to="/" /> : <Register />}
      />

      <Route
        path="cart"
        element={isAuthenticated ? <Cart /> : <Navigate to="/sign-in" />}
      />
    </Switch>
  );
};

export default Routes;
