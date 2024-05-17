import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main style={{ minHeight: `calc(100vh - 120px)` }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
