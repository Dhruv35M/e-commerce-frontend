import React, { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const jwtToken = localStorage.getItem("token");
  const [openaddProduct, setOpenaddProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const fetchData = await fetch(
      // `${SummaryApi.allProduct.url}?pageNumber=1&pageSize=35`,
      `${SummaryApi.allProduct.url}`,
      {
        method: SummaryApi.allProduct.method,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await fetchData.json();
    if (!responseData) {
      toast.error(responseData.message);
    } else {
      setAllProduct(responseData.content);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-red-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenaddProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}
            />
          );
        })}
      </div>

      {openaddProduct && (
        <AddProduct
          onClose={() => setOpenaddProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
