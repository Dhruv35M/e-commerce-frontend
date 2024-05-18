import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Header />
      <main style={{ minHeight: `calc(100vh - 120px)` }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
