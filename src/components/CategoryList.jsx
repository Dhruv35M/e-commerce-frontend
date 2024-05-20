import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import { productCategory } from "../helpers/productCategory";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    // const response = await fetch(`${SummaryApi.categoryWiseProduct.url}`, {
    //   method: SummaryApi.filterProduct.method,
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //   }),
    // });
    // const dataResponse = await response.json();
    // setCategoryProduct(dataResponse.data);
    setCategoryProduct(productCategory);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? productCategory.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.value}
                  className="cursor-pointer"
                  key={product?.url}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                    <img
                      src={product?.imgUrl}
                      alt={product?.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.label}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
