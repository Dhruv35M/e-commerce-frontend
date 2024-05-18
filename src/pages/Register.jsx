import React, { useState } from "react";
import Avatar from "../assests/avatar.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userProfileImg, setuserProfileImg] = useState(null);
  // const [gender, setGender] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    profilePic: "",
    confirmPassword: "",
    address: {},
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImgUpdate = async (e) => {
    setuserProfileImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleImgUpload = async (formDataImg) => {
    try {
      const response = await fetch(SummaryApi.ImageUpload.url, {
        method: SummaryApi.ImageUpload.method,
        body: formDataImg,
      });

      if (response.ok) {
        const imgResponse = await response.json();
        return imgResponse.url;
      } else {
        console.error("Failed to upload image");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      toast.error("All feilds are required!");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("password and confirm password must be same!");
      return;
    }

    try {
      const formData = new FormData();
      if (userProfileImg) {
        formData.append("image", userProfileImg);
        let imgUrl = await handleImgUpload(formData);
        if (imgUrl) data.profilePic = imgUrl;
      }

      const responseData = await fetch(SummaryApi.Register.url, {
        method: SummaryApi.Register.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await responseData.json();

      if (response.status === 201) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        toast.success(response);
        console.log({ data, response });
        navigate("/");
      }

      toast.error(response.message);
      console.log(response.message);
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };

  return (
    <section id="Register">
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{ minHeight: `calc(100vh - 120px)` }}
      >
        <div className="mx-auto container p-4">
          <div className="bg-white p-5 w-full max-w-sm mx-auto">
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <div>
                <img
                  src={
                    userProfileImg
                      ? URL.createObjectURL(userProfileImg)
                      : Avatar
                  }
                  alt="User profile image"
                />
              </div>
              <form>
                <label>
                  <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleProfileImgUpdate}
                  />
                </label>
              </form>
            </div>

            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="flex gap-5">
                <div className="grid">
                  <label>First Name: </label>
                  <div className="bg-slate-100 p-2">
                    <input
                      type="text"
                      placeholder="Enter first name"
                      name="firstName"
                      value={data.firstName}
                      onChange={handleOnChange}
                      required
                      className="w-full h-full outline-none bg-transparent"
                    />
                  </div>
                </div>
                <div className="grid">
                  <label>Last Name: </label>
                  <div className="bg-slate-100 p-2">
                    <input
                      type="text"
                      placeholder="Enter family name"
                      name="lastName"
                      value={data.lastName}
                      onChange={handleOnChange}
                      required
                      className="w-full h-full outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="grid">
                <label>Email: </label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="">
                Gender:
                <div className="flex gap-5 justify-start">
                  <label className="cursor-pointer flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={data.gender === "male"}
                      onChange={handleOnChange}
                      className="mr-2"
                      required
                    />
                    <p>male</p>
                  </label>
                  <label className="cursor-pointer flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={data.gender === "female"}
                      onChange={handleOnChange}
                      className="mr-2"
                      required
                    />
                    <p>female</p>
                  </label>
                  <label className="cursor-pointer flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="others"
                      checked={data.gender === "others"}
                      onChange={handleOnChange}
                      className="mr-2"
                      required
                    />
                    <p>others</p>
                  </label>
                </div>
              </div>

              <div>
                <label>Password: </label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={data.password}
                    name="password"
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
              </div>
              <div>
                <label>Confirm Password: </label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter confirm password"
                    value={data.confirmPassword}
                    name="confirmPassword"
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />

                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    <span>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Register
              </button>
            </form>

            <p className="my-5">
              Already have account?{" "}
              <Link
                to={"/login"}
                className=" text-blue-600 hover:text-blue-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
