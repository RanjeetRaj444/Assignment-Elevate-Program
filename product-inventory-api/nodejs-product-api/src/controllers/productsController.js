const productsService = require("../services/productsService");

async function getAllProducts(req, res) {
  try {
    const filters = req.query || {};
    const products = await productsService.getAllProducts(filters);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

async function addProduct(req, res) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const product = JSON.parse(body);
        const validation = validateProduct(product);
        if (!validation.valid) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: validation.message }));
          return;
        }
        const newProduct = await productsService.addProduct(product);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newProduct));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

async function updateProduct(req, res) {
  const id = req.url.split("/").pop();
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    try {
      const product = JSON.parse(body);
      const validation = validateProduct(product, true);
      if (!validation.valid) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: validation.message }));
        return;
      }
      const updated = await productsService.updateProduct(id, product);
      if (!updated) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Product not found" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updated));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  });
}

async function deleteProduct(req, res) {
  const id = req.url.split("/").pop();
  try {
    const deleted = await productsService.deleteProduct(id);
    if (!deleted) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
      return;
    }
    res.writeHead(204);
    res.end();
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

function validateProduct(product, isUpdate = false) {
  if (!isUpdate) {
    if (!product.name || typeof product.name !== "string") {
      return {
        valid: false,
        message: "Product name is required and must be a string.",
      };
    }
    if (
      product.price === undefined ||
      typeof product.price !== "number" ||
      product.price < 0
    ) {
      return {
        valid: false,
        message: "Product price is required and must be a non-negative number.",
      };
    }
    if (
      product.quantity === undefined ||
      typeof product.quantity !== "number" ||
      product.quantity < 0
    ) {
      return {
        valid: false,
        message:
          "Product quantity is required and must be a non-negative number.",
      };
    }
  } else {
    if (product.name && typeof product.name !== "string") {
      return { valid: false, message: "Product name must be a string." };
    }
    if (
      product.price !== undefined &&
      (typeof product.price !== "number" || product.price < 0)
    ) {
      return {
        valid: false,
        message: "Product price must be a non-negative number.",
      };
    }
    if (
      product.quantity !== undefined &&
      (typeof product.quantity !== "number" || product.quantity < 0)
    ) {
      return {
        valid: false,
        message: "Product quantity must be a non-negative number.",
      };
    }
  }
  return { valid: true };
}

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
