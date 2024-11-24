import { Routes as Switch, Route, Navigate } from "react-router-dom";
import Cart from "../pages/basket";


import ProductList from "../pages/product";

import Single from "../pages/single";
import Wishes from "../pages/liked";

const Routes = () => {
  

  return (
    <Switch>
      <Route path="/" element={<ProductList />} />



      <Route path="wishes">
        <Route index element={<Wishes />} />
        <Route path="*" element={<Navigate to={"/wishes"} />} />
      </Route>
      <Route path="/product/:productID" element={<Single />} />
      <Route path="cart">
        <Route index element={<Cart/>} />
        <Route path="" element={<Navigate to={"/basket"} />} />
        </Route>
    </Switch>
  );
};

export default Routes;
