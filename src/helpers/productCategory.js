const productCategory = [
  {
    id: 1,
    label: "Airpodes",
    value: "airpodes",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716114407/yxwhdbbaucw6isg18tyx.webp",
  },
  {
    id: 2,
    label: "Camera",
    value: "camera",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716111884/rti45opmbywzhj69uzaz.webp",
  },
  {
    id: 3,
    label: "Earphones",
    value: "earphones",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716142038/rsuvmmusyqbufvkmkxal.webp",
  },
  {
    id: 4,
    label: "Mobiles",
    value: "mobiles",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716111884/rti45opmbywzhj69uzaz.webp",
  },
  {
    id: 5,
    label: "Mouse",
    value: "Mouse",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716128343/obr22ymi36vtn6qdev83.webp",
  },
  {
    id: 6,
    label: "Printers",
    value: "printers",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716144286/eqbtycdfim87376jbhjd.webp",
  },
  {
    id: 7,
    label: "Processor",
    value: "processor",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716111884/rti45opmbywzhj69uzaz.webp",
  },
  {
    id: 8,
    label: "Refrigerator",
    value: "refrigerator",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716113292/amnn73nyggnkfybuhvlm.webp",
  },
  {
    id: 9,
    label: "Speakers",
    value: "speakers",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716111884/rti45opmbywzhj69uzaz.webp",
  },
  {
    id: 10,
    label: "Trimmers",
    value: "trimmers",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716113292/amnn73nyggnkfybuhvlm.webp",
  },
  {
    id: 11,
    label: "Televisions",
    value: "televisions",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716114407/yxwhdbbaucw6isg18tyx.webp",
  },
  {
    id: 12,
    label: "Watches",
    value: "watches",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716111884/rti45opmbywzhj69uzaz.webp",
  },
  {
    id: 13,
    label: "Others",
    value: "Others",
    imgUrl:
      "https://res.cloudinary.com/dvqaeehte/image/upload/v1716111884/rti45opmbywzhj69uzaz.webp",
  },
];

const getCategoryId = (value) => {
  const category = productCategory.find((category) => category.value === value);
  return category ? category.id : 13;
};

const getCategoryValue = (id) => {
  if (id === null || id === undefined) {
    return null;
  }
  const category = productCategory.find((id) => productCategory.id === id);
  return category ? category.value : "Others";
};

export { productCategory, getCategoryId, getCategoryValue };
