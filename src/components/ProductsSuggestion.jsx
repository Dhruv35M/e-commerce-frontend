import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getCategoryId, getCategoryValue } from "../helpers/productCategory";
import productImgTemp from "../assests/headphone.jpg";
import { useDispatch, useSelector } from "react-redux";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import scrollToTop from "../helpers/scrollToTop";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const user = useSelector((state) => state?.user?.user);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id, user?.cart?.cartId);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoryWiseProduct(getCategoryId(2));
      if (
        categoryProduct &&
        categoryProduct.content &&
        Array.isArray(categoryProduct.content)
      ) {
        setData(categoryProduct.content);
      } else {
        console.error("Invalid data fetched:", categoryProduct);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div key={index} className="bg-white rounded-sm shadow ">
                  <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                    <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
                    <div className="flex gap-3">
                      <p className="text-blue-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                      <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                    </div>
                    <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  key={index}
                  to={`/products/${product?.productId}`}
                  className="bg-white rounded-sm shadow"
                  onClick={scrollToTop()}
                >
                  <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                    {product?.image ? (
                      <img
                        src={product?.image.split(",")[0]}
                        className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                      />
                    ) : (
                      <img
                        src={productImgTemp}
                        className="object-scale-down h-full hover:scale-110 transition-all"
                      />
                    )}
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {getCategoryValue(product?.categoryId) || ""}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-blue-600 font-medium">
                        {displayINRCurrency(product?.price)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.specialPrice)}
                      </p>
                    </div>
                    <button
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                      onClick={(e) => handleAddToCart(e, product?.productId)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
