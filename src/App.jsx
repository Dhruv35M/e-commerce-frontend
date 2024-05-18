import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import SummaryApi from "./common";
import Context from "./context";

function App() {
  const jwtToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchUserDetails = async () => {
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

    const response = await responseData.json();
    console.log("user: ", response);

    if (response.ok) {
      console.log(response);
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
