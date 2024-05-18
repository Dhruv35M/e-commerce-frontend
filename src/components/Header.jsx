import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import ROLE from "../common/role";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);
  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    localStorage.clear();
    dispatch(setUserDetails(null));
    toast.success("logout successfully!");
    navigate("/login");
  };

  const authButtonHandler = () => {
    setCurrentRoute((prev) => (prev === "/login" ? "/register" : "/login"));
  };

  return (
    <header className="h-16 shadow-md bg-white w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4">
        <div className="justify-start flex-1">
          <Logo w={90} h={50} />
        </div>

        <div className="hidden lg:flex items-center w-full max-w-sm border rounded-full focus-within:shadow pl-2 flex-3 justify-center">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white hover:cursor-pointer">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-end gap-7 flex-1 justify-end">
          <div className="flex items-center gap-7">
            <div className="relative flex justify-center">
              {user?.userId && (
                <div
                  className="text-3xl cursor-pointer relative flex justify-center"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  {user ? (
                    <img
                      src={user?.profilePic || userAvatar}
                      className="w-10 h-10 rounded-full"
                      alt={user?.name}
                    />
                  ) : (
                    <FaRegCircleUser />
                  )}
                </div>
              )}

              {menuDisplay && (
                <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                  <nav>
                    {user?.roles[0].roleName === ROLE.ADMIN && (
                      <Link
                        to={"/admin-panel/all-products"}
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        Admin Panel
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
          </div>

          <Link to={"/cart"} className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>

            <div className="bg-blue-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">1</p>
            </div>
          </Link>

          <div>
            {user?.userId ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={location.pathname === "/login" ? "/register" : "/login"}
                onClick={authButtonHandler}
              >
                <button className="px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700">
                  {currentRoute === "/login" ? "Register" : "Login"}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
