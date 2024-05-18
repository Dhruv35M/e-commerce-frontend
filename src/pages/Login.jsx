import React, { useContext, useState } from "react";
import Avatar from "../assests/avatar.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("All feilds are required!");
      return;
    }

    try {
      const responseData = await fetch(SummaryApi.logIn.url, {
        method: SummaryApi.logIn.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await responseData.json();
      console.log("this is the preponse", { response });

      if (response.ok) {
        toast.error("Request failed!");
        console.log(response.status);
        return;
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      toast.success("login successfully");
      console.log({ response });
      navigate("/");
      fetchUserDetails();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <section id="login">
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{ minHeight: `calc(100vh - 120px)` }}
      >
        <div className="bg-white p-5 w-full max-w-sm mx-auto ">
          <div className="w-20 h-20 mx-auto">
            <img src={Avatar} alt="login icons" />
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
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
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-blue-600"
              >
                Forgot password ?
              </Link>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>

          <p className="my-5">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className=" text-blue-600 hover:text-blue-700 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
