const productCategory = [
  { id: 1, label: "Airpodes", value: "airpodes" },
  { id: 2, label: "Camera", value: "camera" },
  { id: 3, label: "Earphones", value: "earphones" },
  { id: 4, label: "Mobiles", value: "mobiles" },
  { id: 5, label: "Mouse", value: "Mouse" },
  { id: 6, label: "Printers", value: "printers" },
  { id: 7, label: "Processor", value: "processor" },
  { id: 8, label: "Refrigerator", value: "refrigerator" },
  { id: 9, label: "Speakers", value: "speakers" },
  { id: 10, label: "Trimmers", value: "trimmers" },
  { id: 11, label: "Televisions", value: "televisions" },
  { id: 12, label: "Watches", value: "watches" },
  { id: 13, label: "Others", value: "Others" },
];

const getCategoryId = (value) => {
  const category = productCategory.find((category) => category.value === value);
  return category ? category.id : 13;
};

const getCategoryValue = (id) => {
  const category = productCategory.find((id) => category.id === id);
  return category ? category.value : "Others";
};

export { productCategory, getCategoryId, getCategoryValue };
