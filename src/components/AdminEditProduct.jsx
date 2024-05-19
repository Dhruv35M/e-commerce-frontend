import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { productCategory } from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { getCategoryValue } from "../helpers/productCategory";
import uploadImages from "../helpers/imageUpload";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  console.log({ productData });
  const [category, setCategory] = useState(null);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    image: [],
    description: "",
    price: 0.0,
    discount: 0,
    categoryId: 13,
  });

  useEffect(() => {
    // const categoryValue = getCategoryValue(productData?.categoryId);
    // setCategory(categoryValue);
    setData({
      productName: productData.productName,
      brandName: productData.brandName,
      category: getCategoryValue(productData.categoryId),
      image: productData.image ? productData.image.split(",") : [],
      description: productData.description,
      price: productData.price,
      discount: productData.discount,
    });
  }, [productData?.categoryId]);

  // const [data, setData] = useState({
  //   ...productData,
  //   productName: productData?.productName,
  //   brandName: productData?.brandName,
  //   category: getCategoryValue(productData?.brandName),
  //   image: productData?.image.split(",") || [],
  //   description: productData?.description,
  //   price: productData?.price,
  //   discount: productData?.discount,
  // });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const jwtToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleaddProduct = async (e) => {
    const imgFile = e.target.files[0];
    const imageUrls = await uploadImages(imgFile);

    setData((prev) => {
      return {
        ...prev,
        imageUrl: [...prev.imageUrls, imageUrls],
      };
    });
  };

  const handleUpdateImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({
        ...prev,
        image: [...prev.image, file],
        category: [category],
      }));
    }
  };

  const handleDeleteProductImage = async (index) => {
    console.log("image index", index);

    const newImage = [...data.image];
    newImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        image: [...newImage],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrls = await uploadImages(data.image);
    console.log({ imageUrls });
    if (imageUrls) {
      imageUrls.map((item) => console.log(item));
    }

    const response = await fetch(
      `${SummaryApi.updateProduct.url}/${productData.productId}`,
      {
        method: SummaryApi.updateProduct.method,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      toast.success(responseData?.message);
      onClose();
      const responseData = await response.json();
      fetchdata();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Edit Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-blue-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter brand name"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            required
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleaddProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.image ? (
              <div className="flex items-center gap-2">
                {data.image.map((el, index) => {
                  return (
                    <div className="relative group" key={index}>
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                          handleUpdateImage;
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-blue-600 text-xs">
                *Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            name="price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="discount" className="mt-3">
            discount(%):
          </label>
          <input
            type="number"
            id="discount"
            placeholder="Enter selling price"
            value={data.discount}
            name="discount"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description" className="mt-3">
            Description:
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter product description"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="px-3 py-2 bg-blue-600 text-white mb-10 hover:bg-blue-700">
            Update Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
