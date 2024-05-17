import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./componenets/Header";
import Footer from "./componenets/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
