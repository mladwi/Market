import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Api } from "../modules";
import { IProduct } from "../modules/products/types";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { SlBasket } from "react-icons/sl";
import { MdFavoriteBorder } from "react-icons/md";

export default function ProductList() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  let { productID } = useParams<{ productID: string }>();
  const { addToWishes, addToCart } = useCart();

  const getSingleProduct = async () => {
    try {
      if (productID) {
        const response = await Api.Product.Single(productID);
        //@ts-ignore
        const data: IProduct = response.data;
        console.log(data);
        setProduct(data);
      }
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [productID]);

  const handleAddToWishes = () => {
    if (product) {
      addToWishes(product as any);
      toast.success(`Added to favorites`);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product as any);
      toast.success(`Added to basket`);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="product-skeleton">
          <Skeleton height={300} width={300} />
          <Skeleton count={3} />
        </div>
      ) : product ? (
        <div className="product-details">
          <div className="product_derails_img">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
          </div>
          <div className="product_details_info">
            <h2>{product.title}</h2>
            <h4>{product.description}</h4>
            <p>Price: {product.price} $</p>
            <div className="product_details_buttons">
              <button className="Buy" onClick={handleAddToCart}>
                Add to Basket <SlBasket />
              </button>
              <button className="Like" onClick={handleAddToWishes}>
                <MdFavoriteBorder />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Error :[</p>
      )}
    </div>
  );
}
