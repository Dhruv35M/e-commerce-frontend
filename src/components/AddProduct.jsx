import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { productCategory, getCategoryId } from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AddProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    image: [],
    description: "",
    price: 0.0,
    discount: 0,
    categoryId: 3,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const jwtToken = localStorage.getItem("token");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name);
    console.log("Value:", value);

    setData((prev) => ({
      ...prev,
      // [name]: name === "category" ? getCategoryId(value) : value,
      [name]: value,
    }));
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({
        ...prev,
        image: [...prev.image, file],
      }));
    }
  };

  const uploadImages = async (imageFiles) => {
    const urls = [];

    for (const imageFile of imageFiles) {
      const formData = new FormData();
      formData.append("image", imageFile);
      console.log(imageFile);

      try {
        const response = await fetch(SummaryApi.ImageUpload.url, {
          method: SummaryApi.ImageUpload.method,
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          urls.push(responseData.url);
        } else {
          console.error("Failed to upload image:", await response.text());
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    return urls;
  };

  const handleDeleteimage = async (index) => {
    console.log("image index", index);

    const newimage = [...data.image];
    newimage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        image: [...newimage],
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

    let product = {
      productName: data.productName,
      description: data.description,
      price: data.price,
      brandName: data.brandName,
      imageUrl: imageUrls,
      discount: data.discount,
      quantity: 30,
      categoryId: data.categoryId,
    };

    console.log({ product });
    try {
      const response = await fetch(SummaryApi.addProduct.url, {
        method: SummaryApi.addProduct.method,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const responseData = await response.json();

      if (responseData) {
        if (responseData.ok) {
          toast.success(responseData.message);
          onClose();
          fetchData();
        } else {
          toast.error(responseData.message);
        }
      } else {
        toast.error("Failed to upload product");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Failed to upload product");
    }
  };

  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
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
            value={data.category}
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

          <label htmlFor="image" className="mt-3">
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
                  onChange={handleUploadImage}
                  id="uploadImageInput"
                  className="hidden"
                />
              </div>
            </div>
          </label>
          <div>
            {data?.image[0] ? (
              <div className="flex items-center gap-2">
                {data.image.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={URL.createObjectURL(el)}
                        alt={el}
                        width={80}
                        height={80}
                        name="image"
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(URL.createObjectURL(el));
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-blue-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteimage(index)}
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
            value={data.price}
            name="price"
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
            Upload Product
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

export default AddProduct;
