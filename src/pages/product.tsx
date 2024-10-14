import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../modules";
import { IProduct } from "../modules/products/types";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import beauty from "../assets/images/beauty.png";
import fourcooking from "../assets/images/four-cooking-accessories-set-for-kitchen.png";
import furniture from "../assets/images/furniture.png";
import grocery from "../assets/images/grocery.png";
import laptop from "../assets/images/laptop.png";
import mensclothing from "../assets/images/mens-clothing.png";
import perfume from "../assets/images/perfume.png";
import shelf from "../assets/images/shelf.png";
import smart from "../assets/images/smart.png";
import tablet from "../assets/images/tablet.png";
import watch from "../assets/images/watch.png";
import womanwatch from "../assets/images/woman2.png";
import womanclothes from "../assets/images/woman-clothes.png";
import womanjewelry from "../assets/images/woman.png";

export default function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory] = useState<string | null>(null);
  const productsPerPage = 15;
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const response = await Api.Product.List();
      //@ts-ignore
      let data = Array.isArray(response.data.products)
        ? //@ts-ignore
          (response.data.products as IProduct[])
        : [];
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const filterByCategory = async (category: string) => {
    try {
      const response = await Api.Product.ByCategory(category);
      //@ts-ignore
      const data = response.data.products;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
    setCurrentPage(1);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="category-list">
        <div className="category-list_box1">
          <h2>Browse By Category</h2>
        </div>

        <Swiper spaceBetween={10} slidesPerView={7}>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("beauty")}
            >
              <img src={beauty} alt="beauty" />
              <p>Beauty</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("kitchen-accessories")}
            >
              <img src={fourcooking} alt="four cooking" />
              <p>Four Cooking</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("groceries")}
            >
              <img src={grocery} alt="grocery" />
              <p>Grocery</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("laptops")}
            >
              <img src={laptop} alt="laptop" />
              <p>Laptop</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("mens-shirts")}
            >
              <img src={mensclothing} alt="mens clothing" />
              <p>Mens Clothing</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("fragrances")}
            >
              <img src={perfume} alt="perfume" />
              <p>Perfume</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("furniture")}
            >
              <img src={furniture} alt="furniture" />
              <p>Furniture</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card "
              onClick={() => filterByCategory("home-decoration")}
            >
              <img src={shelf} alt="shelf" />
              <p>home decoration</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("mens-shoes")}
            >
              <img src={smart} alt="smart" />
              <p>Men Shoes</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("tablets")}
            >
              <img src={tablet} alt="tablet" />
              <p>Tablet</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("mens-watches")}
            >
              <img src={watch} alt="watch" />
              <p>Men Watchs</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card "
              onClick={() => filterByCategory("womens-watches")}
            >
              <img src={womanwatch} alt="woman watch" />
              <p>Woman Watchs</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("womens-dresses")}
            >
              <img src={womanclothes} alt="" />
              <p>Womens Dresses</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("womens-jewellery")}
            >
              <img src={womanjewelry} alt="woman jewelry" />
              <p>Woman Jewellery</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="product-list">
        {loading
          ? Array.from({ length: productsPerPage }).map((_, index) => (
              <div key={index} className="product-card">
                <Skeleton height={250} width={200} />
                <Skeleton count={1} />
              </div>
            ))
          : currentProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img src={product.thumbnail} alt="" className="product-image" />
                <h3>{product.title}</h3>
                <h4>{product.category}</h4>
                <p>Price: {product.price}</p>
              </div>
            ))}
      </div>

      <div className="pagination">
        {[
          ...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys(),
        ].map((number) => (
          <button key={number} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
