import { Routes as Switch, Route, Navigate } from "react-router-dom";
import Cart from "../pages/basket";


import ProductList from "../pages/product";

import Single from "../pages/single";
import Wishes from "../pages/liked";

const Routes = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Switch>
      <Route path="/" element={<ProductList />} />



      <Route path="wishes">
        <Route index element={<Wishes />} />
        <Route path="*" element={<Navigate to={"/wishes"} />} />
      </Route>

      <Route path="/product/:productID" element={<Single />} />
      <Route
        path="cart"
        element={isAuthenticated ? <Cart /> : <Navigate to="/sign-in" />}
      />
    </Switch>
  );
};

export default Routes;
