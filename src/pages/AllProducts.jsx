import React, { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import { toast } from "react-toastify";

const AllProducts = () => {
  const jwtToken = localStorage.getItem("token");
  const [openaddProduct, setOpenaddProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const fetchData = await fetch(
        // `${SummaryApi.allProduct.url}?pageNumber=2&pageSize=10`,
        `${SummaryApi.allProduct.url}`,
        {
          method: SummaryApi.allProduct.method,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchData.ok) {
        const responseData = await fetchData.json();
        setAllProduct(responseData.content);
        const imageUrls =
          responseData?.image.length() > 0 ? responseData.image.split(",") : [];

        setAllProduct((prev) => ({
          ...prev,
          image: imageUrls,
        }));

        console.log({ responseData });
      } else {
        console.log("failed", fetchData);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, [setOpenaddProduct]);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenaddProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4  h-[calc(100vh-190px)] overflow-y-scroll">
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
          onClick={() => setOpenaddProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
