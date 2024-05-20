import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
  const jwtToken = localStorage.getItem("token");
  const response = await fetch(
    // `${SummaryApi.categoryWiseProduct.url}/${category}/products`,
    `${SummaryApi.categoryWiseProduct.url}/${category}/products`,
    {
      method: SummaryApi.categoryWiseProduct.method,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "content-type": "application/json",
      },
    }
  );

  const responseData = await response.json();
  // console.log(responseData);
  return responseData;
};

export default fetchCategoryWiseProduct;
