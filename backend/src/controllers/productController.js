import Product from "../models/product.js";

// POST /api/products
async function createProduct(req, res) {
  try {
    const { name, category, quantity, price } = req.body;
    if (!name || quantity == null || price == null) {
      return res.status(400).json({
        message: "Name, Quantity and Price Required!",
      });
    }

    const newProduct = await Product.create({
      name,
      category: category || "General",
      quantity,
      price,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Create Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/products
async function getProducts(req, res) {
  try {
    const search = req.query.search || "";

    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.log("Get Product Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

// UPDATE /api/products/:id
async function updateProduct(req, res) {
  try {
    const Updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!Updated) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(Updated);
  } catch (error) {
    console.log("Update Product Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE /api/products/:id
async function deleteProduct(req, res) {
  try {
    const Deleted = await Product.findByIdAndDelete(req.params.id);
    if (!Deleted) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    console.log("Delete Product Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

export { createProduct, getProducts, updateProduct, deleteProduct };
