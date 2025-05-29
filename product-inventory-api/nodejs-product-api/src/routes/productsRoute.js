const productsController = require("../controllers/productsController");

function productsRoute(req, res) {
  const urlParts = req.url.split("?")[0].split("/");
  const method = req.method;
  // /products or /products/:id
  if (urlParts[1] === "products") {
    // GET /products or GET /products?query
    if (method === "GET" && urlParts.length === 2) {
      productsController.getAllProducts(req, res);
    }
    // POST /products
    else if (method === "POST" && urlParts.length === 2) {
      productsController.addProduct(req, res);
    }
    // PUT /products/:id
    else if (method === "PUT" && urlParts.length === 3) {
      productsController.updateProduct(req, res);
    }
    // DELETE /products/:id
    else if (method === "DELETE" && urlParts.length === 3) {
      productsController.deleteProduct(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
}

module.exports = productsRoute;
