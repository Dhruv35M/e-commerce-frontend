import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const jwtToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      if (!userId) {
        navigate("/login");
        return;
      }

      const responseData = await fetch(
        `${SummaryApi.currentUser.url}/${userId}`,
        {
          method: SummaryApi.currentUser.method,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!responseData.ok) {
        console.error("Error:", responseData);
        return;
      }

      const response = await responseData.json();
      console.log({ response });

      dispatch(setUserDetails(response));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main style={{ minHeight: `calc(100vh - 120px)` }}>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
