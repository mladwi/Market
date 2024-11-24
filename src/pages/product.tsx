import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../modules";
import { IProduct } from "../modules/products/types";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useRef } from "react";

import { IoArrowBack, IoArrowForward, IoSearchSharp } from "react-icons/io5";

export default function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("");
  const swiperRef = useRef<any>(null);
  const productsPerPage = 15;
  const navigate = useNavigate();

  

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await Api.Product.List();
      //@ts-ignore
      const data = Array.isArray(response.data.products)
        ? //@ts-ignore
          (response.data.products as IProduct[])
        : [];
      setProducts(data);
      setAllProducts(data);
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
      if (category === "default") {
        setProducts(allProducts);
      } else {
        const response = await Api.Product.ByCategory(category);
        //@ts-ignore
        const data = response.data.products;
        setProducts(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSort = (sortOption: string) => {
    let sortedProducts = [...products];

    if (sortOption === "price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "title") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "stars") {
      sortedProducts.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortOption === "default") {
      sortedProducts = [...allProducts];
    }

    setProducts(sortedProducts);
  };

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = async (keyword: string) => {
    if (keyword) {
      try {
        const response = await Api.Product.Search(keyword);
        //@ts-ignore
        const data = response.data.products;
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch search results", error);
      }
    } else {
      setProducts(allProducts);
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

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const pageNumbers = [];
    const maxPageLimit = currentPage + 2;
    const minPageLimit = currentPage - 2;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= minPageLimit && i <= maxPageLimit)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={i === currentPage ? "active" : ""}
          >
            {i}
          </button>
        );
      }

      if (i === minPageLimit - 1 && minPageLimit > 2) {
        pageNumbers.push(<span key="left-ellipsis">...</span>);
      }

      if (i === maxPageLimit + 1 && maxPageLimit < totalPages - 1) {
        pageNumbers.push(<span key="right-ellipsis">...</span>);
      }
    }
    return <>{pageNumbers}</>;
  };

  const goHome = () => {
    setProducts(allProducts);
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <div className="label_search">
      <label className="search">
        <input
          value={searchKeyword}
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            const keyword = e.target.value.toLowerCase();
            setSearchKeyword(keyword);
            handleSearch(keyword);
          }}
        />
        <IoSearchSharp />
      </label>
      </div>
      <div className="category-list">
        <div className="category-list_box1">
          <h2>By Category</h2>
        </div>
        <Swiper
          spaceBetween={10}
          slidesPerView={7}
          ref={swiperRef}
          breakpoints={{
            850: {
              slidesPerView: 7,
            },
            640: {
              slidesPerView: 5,
            },
            500: {
              slidesPerView: 4,
            },
            400: {
              slidesPerView: 2.8,
            },
            320: {
              slidesPerView: 2,
            },
            200: {
              slidesPerView: 1.8,
            },
          }}
        >
          <SwiperSlide>
            <div className="category_card" onClick={goHome}>
              <h1>Back</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("beauty")}
            >
              <h1>Beauty</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("kitchen-accessories")}
            >
              <h1>For Cooking</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("groceries")}
            >
              <h1>Grocery</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("laptops")}
            >
              <h1>Laptop</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("mens-shirts")}
            >
              <h1>Men's wear</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("fragrances")}
            >
              <h1>Perfume</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("furniture")}
            >
              <h1>Furniture</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card "
              onClick={() => filterByCategory("home-decoration")}
            >
              <h1>Home decoration</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("mens-shoes")}
            >
              <h1>Men Shoes</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("tablets")}
            >
              <h1>Tablet</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("mens-watches")}
            >
              <h1>Men's Watches</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card "
              onClick={() => filterByCategory("womens-watches")}
            >
              <h1>Women's Watches</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("womens-dresses")}
            >
              <h1>Women's Dresses</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="category_card"
              onClick={() => filterByCategory("womens-jewellery")}
            >
              <h1>Women's Jewellery</h1>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="pagination">
        <button onClick={handlePrevClick} disabled={currentPage === - 1}>
          <IoArrowBack />
        </button>
        <button onClick={handleNextClick} disabled={currentPage === Math.ceil(products.length / productsPerPage)}>
          <IoArrowForward />
        </button>
      </div>
      </div>
      <div className="container">
        <div className="sort_box">
          <h2>Sort By</h2>
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              handleSort(e.target.value);
            }}
          >
            <option value="default">Default</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
            <option value="stars">Stars</option>
          </select>
        </div>
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
                <p>Price: {product.price} $</p>
                {/* Display rating as stars */}
                <div className="product-rating">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < (product.rating ?? 0) ? "star filled" : "star"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="rating-text">
                    {product.rating ? `(${product.rating})` : "(No Rating)"}
                  </span>
                </div>
              </div>
            ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoArrowBack />
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredProducts.length / productsPerPage)
          }
        >
          <IoArrowForward />
        </button>
      </div>
    </div>
  );
}
