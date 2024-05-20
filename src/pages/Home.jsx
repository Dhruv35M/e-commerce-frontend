import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular's Watches"}
      />

      <VerticalCardProduct key={1} category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct key={2} category={"Mouse"} heading={"Mouse"} />
      <VerticalCardProduct
        key={3}
        category={"televisions"}
        heading={"Televisions"}
      />
      <VerticalCardProduct
        key={4}
        category={"camera"}
        heading={"Camera & Photography"}
      />
      <VerticalCardProduct
        key={5}
        category={"earphones"}
        heading={"Wired Earphones"}
      />
      <VerticalCardProduct
        category={"speakers"}
        heading={"Bluetooth Speakers"}
      />
      <VerticalCardProduct
        key={6}
        category={"refrigerator"}
        heading={"Refrigerator"}
      />
      <VerticalCardProduct key={7} category={"trimmers"} heading={"Trimmers"} />
    </div>
  );
};

export default Home;
