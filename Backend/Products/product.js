
const photo1 = "../Assests/WhatsApp Image 2026-06-19 at 10.56.40 AM.jpeg";
const photo2 = "../Assests/WhatsApp Image 2026-06-19 at 10.56.43 AM.jpeg";
const photo3 = "../Assests/WhatsApp Image 2026-06-19 at 10.59.06 AM.jpeg";

const products = [
  {
    name: "Nukra Hing - Hybrid Dana Crystal",
    image: {
      url: photo1,
      filename: "nukra-hing.jpg",
    },
    price: 10000,
    bulkPrice: 10000,
    wholesaleDiscount: 5,
    description:
      "Premium quality Nukra Hing with strong aroma, ideal for spice blends and retail packs.",
    category: "Hing (Asafoetida)",
    productType: "Nukra",
    stock: 100,
    minOrder: 1,
    unit: "kg",
    quality: "Premium",
    productGrade: "Export Grade",
    leadTime: "5-7 Days",
    availability: "In stock",
  },

  {
    name: "Sarkash Hing – Best Power Rohgani",
    image: {
      url: photo2,
      filename: "sarkash-hing.jpg",
    },
    price: 6000,
    bulkPrice: 5800,
    wholesaleDiscount: 6,
    description:
      "High-grade Sarkash Hing with intense flavor and aroma, perfect for culinary and industrial use.",
    category: "Hing (Asafoetida)",
    productType: "Sarkash",
    stock: 80,
    minOrder: 1,
    unit: "kg",
    quality: "Premium",
    productGrade: "Export Grade",
    leadTime: "5-7 Days",
    availability: "In stock",
  },

  {
    name: "Kabuli Hing – Pure",
    image: {
      url: photo3,
      filename: "kabuli-hing.jpg",
    },
    price: 3500,
    bulkPrice: 3350,
    wholesaleDiscount: 5,
    description:
      "Authentic Kabuli Hing with rich flavour and strong aroma.",
    category: "Hing (Asafoetida)",
    productType: "Kabuli",
    stock: 60,
    minOrder: 1,
    unit: "kg",
    quality: "A Grade",
    productGrade: "Premium",
    leadTime: "7 Days",
    availability: "In stock",
  }
];

module.exports = products;
