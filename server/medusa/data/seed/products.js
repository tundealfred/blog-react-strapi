const { v4: uuidv4 } = require("uuid");

module.exports = async function (container) {
  const { productService } = container; // Extract productService from the container
  console.log("🌱 Seeding products...");

  const storeProducts = [
    {
      title: "Blogging Mastery eBook",
      description: "Digital eBook guide to becoming a pro blogger.",
      type: { value: "digital" },
      tags: ["Digital", "eBook"],
      options: [],
      variants: [
        {
          title: "Default",
          prices: [{ currency_code: "gbp", amount: 899 }],
          inventory_quantity: 9999,
        },
      ],
    },
    {
      title: "Notion Blog Content Calendar",
      description: "Plan your posts with this Notion template.",
      type: { value: "digital" },
      tags: ["Digital", "Template"],
      variants: [
        {
          title: "Notion Template",
          prices: [{ currency_code: "gbp", amount: 1299 }],
          inventory_quantity: 9999,
        },
      ],
    },
    {
      title: "Minimal Tee - Men",
      description: "Soft cotton T-shirt for everyday wear.",
      type: { value: "apparel" },
      tags: ["Physical", "Apparel", "Men"],
      options: [{ title: "Size" }],
      variants: [
        {
          title: "M",
          options: [{ value: "M" }],
          prices: [{ currency_code: "gbp", amount: 2000 }],
          inventory_quantity: 50,
        },
        {
          title: "L",
          options: [{ value: "L" }],
          prices: [{ currency_code: "gbp", amount: 2000 }],
          inventory_quantity: 50,
        },
      ],
    },
    {
      title: "Cozy Hoodie - Women",
      description: "Warm fleece-lined hoodie.",
      type: { value: "apparel" },
      tags: ["Physical", "Apparel", "Women"],
      options: [{ title: "Size" }],
      variants: [
        {
          title: "S",
          options: [{ value: "S" }],
          prices: [{ currency_code: "gbp", amount: 3500 }],
          inventory_quantity: 30,
        },
        {
          title: "M",
          options: [{ value: "M" }],
          prices: [{ currency_code: "gbp", amount: 3500 }],
          inventory_quantity: 30,
        },
      ],
    },
    {
      title: "Canvas Tote - Unisex",
      description: "Durable cotton tote for daily use.",
      type: { value: "accessory" },
      tags: ["Physical", "Accessory", "Unisex"],
      variants: [
        {
          title: "Default",
          prices: [{ currency_code: "gbp", amount: 1500 }],
          inventory_quantity: 100,
        },
      ],
    },
    {
      title: "Leather Wristband - Men",
      description: "Stylish black leather wristband.",
      type: { value: "accessory" },
      tags: ["Physical", "Accessory", "Men"],
      variants: [
        {
          title: "Default",
          prices: [{ currency_code: "gbp", amount: 2700 }],
          inventory_quantity: 40,
        },
      ],
    },
    {
      title: "Layered Necklace - Women",
      description: "Chic multi-layer necklace for a modern look.",
      type: { value: "accessory" },
      tags: ["Physical", "Accessory", "Women"],
      variants: [
        {
          title: "Default",
          prices: [{ currency_code: "gbp", amount: 3200 }],
          inventory_quantity: 40,
        },
      ],
    },
  ];

  // Create each product in the database
  for (const product of storeProducts) {
    const createdProduct = await productService.create(product);
    console.log(`✅ Created: ${createdProduct.title}`);
  }

  console.log("🌱 Product seeding complete.");
};
