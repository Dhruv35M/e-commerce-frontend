import SummaryApi from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, productId, cartId) => {
  e?.stopPropagation();
  e?.preventDefault();
  let responseData = {};
  try {
    let quantity = 1;
    const jwtToken = localStorage.getItem("token");
    const response = await fetch(
      `${SummaryApi.addToCart.url}/${cartId}/products/${productId}/quantity/${quantity}`,
      {
        method: SummaryApi.addToCart.method,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      responseData = await response.json();
      toast.success(responseData.message);
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }

  return responseData;
};

export default addToCart;
