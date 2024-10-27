import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Api } from "../modules";
import { IProduct } from "../modules/products/types";
import { useCart } from "../Store/useCardStore";
import toast from "react-hot-toast";
import { SlBasket } from "react-icons/sl";
import { MdFavoriteBorder } from "react-icons/md";

export default function ProductList() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { productID } = useParams<{ productID: string }>();
  const { addToWishes, addToCart, cart, wishes } = useCart();

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

  const handleAddToCart = () => {
    if (product) {
      const existsInCart = cart.some(
        (item) => String(item.id) === String(product.id)
      );
      if (existsInCart) {
        toast.error("This product is already in your basket");
      } else {
        addToCart(product as any);
        toast.success("Added to basket");
      }
    }
  };

  const handleAddToWishes = () => {
    if (product) {
      const existsInWishes = wishes.some(
        (item) => String(item.id) === String(product.id)
      );
      if (existsInWishes) {
        toast.error("This product is already in your liked list");
      } else {
        addToWishes(product as any);
        toast.success("Added to favorites");
      }
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
