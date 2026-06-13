const photo1 = "../Assests/WhatsApp Image 2026-06-08 at 3.40.48 PM.jpeg";
const photo2 = "../Assests/WhatsApp Image 2026-06-08 at 3.40.54 PM.jpeg";
const photo3 = "../Assests/WhatsApp Image 2026-06-08 at 3.41.00 PM.jpeg";
const photo4 = "../Assests/WhatsApp Image 2026-06-08 at 3.41.04 PM.jpeg";
const photo5 = "../Assests/WhatsApp Image 2026-06-08 at 3.41.37 PM.jpeg";
const photo6 = "../Assests/WhatsApp Image 2026-06-08 at 3.41.38 PM.jpeg";

const products = [
  {
    name: "Uzbeki Dana Hing",
    image: {
      url: photo1,
      filename: "uzbeki-dana.jpg",
    },
    price: 850,
    bulkPrice: 800,
    wholesaleDiscount: 5,
    description: "Premium quality Uzbeki Dana Hing used in spice processing and food manufacturing.",
    category: "Raw Hing",
    productType: "Dana",
    stock: 100,
    minOrder: 5,
    moq: 5,
    unit: "kg",
    quality: "Premium",
    productGrade: "Export Grade",
    packaging: "25kg Bags",
    packagingSize: "25kg",
    leadTime: "5-7 Days",
    exportQuality: "Yes",
    availability: "In stock"
  },

  {
    name: "Uzbeki Sarkash Hing",
    image: {
      url: photo2,
      filename: "uzbeki-sarkash.jpg",
    },
    price: 950,
    bulkPrice: 900,
    wholesaleDiscount: 6,
    description: "Strong aroma Uzbeki Sarkash Hing suitable for premium spice blends.",
    category: "Raw Hing",
    productType: "Sarkash",
    stock: 80,
    minOrder: 5,
    moq: 5,
    unit: "kg",
    quality: "Premium",
    productGrade: "Export Grade",
    packaging: "25kg Bags",
    packagingSize: "25kg",
    leadTime: "5-7 Days",
    exportQuality: "Yes",
    availability: "In stock"
  },

  {
    name: "Afghani Dana Hing",
    image: {
      url: photo3,
      filename: "afghani-dana.jpg",
    },
    price: 1200,
    bulkPrice: 1150,
    wholesaleDiscount: 5,
    description: "Authentic Afghani Dana Hing with rich flavour and strong aroma.",
    category: "Raw Hing",
    productType: "Dana",
    stock: 60,
    minOrder: 5,
    moq: 5,
    unit: "kg",
    quality: "A Grade",
    productGrade: "Premium",
    packaging: "25kg Bags",
    packagingSize: "25kg",
    leadTime: "7 Days",
    exportQuality: "Yes",
    availability: "In stock"
  },

  {
    name: "Afghani Sarkash Hing",
    image: {
      url: photo1,
      filename: "afghani-sarkash.jpg",
    },
    price: 1400,
    bulkPrice: 1325,
    wholesaleDiscount: 6,
    description: "Premium Afghani Sarkash Hing for exporters and spice manufacturers.",
    category: "Raw Hing",
    productType: "Sarkash",
    stock: 50,
    minOrder: 5,
    moq: 5,
    unit: "kg",
    quality: "Export Quality",
    productGrade: "A+",
    packaging: "25kg Bags",
    packagingSize: "25kg",
    leadTime: "7-10 Days",
    exportQuality: "Yes",
    availability: "In stock"
  },

  {
    name: "Kabuli Dana Hing",
    image: {
      url: photo2,
      filename: "kabuli-dana.jpg",
    },
    price: 1000,
    bulkPrice: 950,
    wholesaleDiscount: 5,
    description: "Kabuli Dana Hing with balanced aroma and excellent purity.",
    category: "Raw Hing",
    productType: "Dana",
    stock: 90,
    minOrder: 5,
    moq: 5,
    unit: "kg",
    quality: "Premium",
    productGrade: "A Grade",
    packaging: "25kg Bags",
    packagingSize: "25kg",
    leadTime: "5-7 Days",
    exportQuality: "Yes",
    availability: "In stock"
  },

  {
    name: "Kabuli Sarkash Hing",
    image: {
      url: photo3,
      filename: "kabuli-sarkash.jpg",
    },
    price: 1150,
    bulkPrice: 1100,
    wholesaleDiscount: 5,
    description: "Natural Kabuli Sarkash Hing for wholesalers and exporters.",
    category: "Raw Hing",
    productType: "Sarkash",
    stock: 70,
    minOrder: 5,
    moq: 5,
    unit: "kg",
    quality: "Premium",
    productGrade: "Export Grade",
    packaging: "25kg Bags",
    packagingSize: "25kg",
    leadTime: "5-7 Days",
    exportQuality: "Yes",
    availability: "In stock"
  },

  {
    name: "Hing Paste",
    image: {
      url: photo4,
      filename: "hing-paste.jpg",
    },
    price: 650,
    bulkPrice: 620,
    wholesaleDiscount: 4,
    description: "Ready-to-use Hing Paste for food processing industries.",
    category: "Paste",
    productType: "Paste",
    stock: 120,
    minOrder: 10,
    moq: 10,
    unit: "kg",
    quality: "Food Grade",
    productGrade: "Commercial",
    packaging: "20kg Drums",
    packagingSize: "20kg",
    leadTime: "5 Days",
    exportQuality: "No",
    availability: "In stock"
  },

  {
    name: "Hing Powder",
    image: {
      url: photo5,
      filename: "hing-powder.jpg",
    },
    price: 500,
    bulkPrice: 470,
    wholesaleDiscount: 5,
    description: "Fine Hing Powder suitable for spice blending and packaging.",
    category: "Powder",
    productType: "Powder",
    stock: 150,
    minOrder: 10,
    moq: 10,
    unit: "kg",
    quality: "Food Grade",
    productGrade: "Premium",
    packaging: "25kg Bags",
    packagingSize: "25kg",
    leadTime: "5 Days",
    exportQuality: "Yes",
    availability: "In stock"
  },
  {
    name: "Organic Hing",
    image: {
      url: photo6,
      filename: "organic-hing.jpg",
    },
    price: 1500,
    bulkPrice: 1400,
    wholesaleDiscount: 7,
    description: "100% Organic Hing with natural aroma and exceptional quality.",
    category: "Organic",
    productType: "Hing",
    stock: 40,
    minOrder: 5,
    moq: 5,
    unit: "kg",
    quality: "Organic",
    productGrade: "Premium",
    packaging: "25kg Bags",
    packagingSize: "25kg",
    leadTime: "10-12 Days",
    exportQuality: "Yes",
    availability: "In stock"
  }
];


module.exports = products;