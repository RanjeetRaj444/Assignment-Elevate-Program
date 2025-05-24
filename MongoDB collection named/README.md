# MongoDB Product Management Example

## Collection: `products`

Each document in the `products` collection contains the following fields:

- `name` (String): Name of the product
- `category` (String): Product category (e.g., gadget, accessory)
- `price` (Number): Price of the product
- `tags` (Array of Strings): Descriptive tags like "smartphone", "laptop", etc.
- `stock` (Number): Number of items in stock
- `details` (Object): Nested object containing product details such as `warranty`, `color`, etc.

---

## Sample Data Insertion

```js
db.products.insertMany([
  {
    name: "Alpha Smartphone",
    category: "gadget",
    price: 1500,
    tags: ["smartphone", "android", "touchscreen"],
    stock: 10,
    details: { warranty: true, color: "black" },
  },
  {
    name: "Beta Laptop",
    category: "gadget",
    price: 1800,
    tags: ["laptop", "electronics", "work"],
    stock: 7,
    details: { warranty: false, color: "silver" },
  },
  {
    name: "Gamma Headphones",
    category: "accessory",
    price: 300,
    tags: ["audio", "headphones"],
    stock: 15,
    details: { warranty: true, color: "blue" },
  },
  {
    name: "Aero Tablet",
    category: "gadget",
    price: 1200,
    tags: ["tablet", "android", "touchscreen"],
    stock: 5,
    details: { warranty: true, color: "white" },
  },
  {
    name: "Omega Charger",
    category: "accessory",
    price: 100,
    tags: ["charger", "usb"],
    stock: 0,
    details: { warranty: false, color: "white" },
  },
]);
```

---

## Queries

### 1. Find products with price between 500 and 2000

```js
db.products.find({ price: { $gte: 500, $lte: 2000 } });
```

---

### 2. Find products tagged as "smartphone" or "laptop"

```js
db.products.find({
  tags: { $in: ["smartphone", "laptop"] },
});
```

---

### 3. Decrease stock by 5 for all gadgets

```js
db.products.updateMany({ category: "gadget" }, { $inc: { stock: -5 } });
```

---

### 4. Delete products where stock is 0

```js
db.products.deleteMany({ stock: { $lte: 0 } });
```

---

### 5. Find products whose names start with “A”

```js
db.products.find({
  name: { $regex: /^A/, $options: "i" },
});
```

---

### 🎁 Bonus: Find products with warranty = true in details

```js
db.products.find({
  "details.warranty": true,
});
```

---
