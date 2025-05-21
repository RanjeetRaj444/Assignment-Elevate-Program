export const users = [
  {
    id: 1,
    name: {
      first: "John",
      last: "Doe",
    },
    email: "john.doe@example.com",
    location: {
      city: "New York",
      country: "USA",
    },
    tags: ["developer", "react", "javascript"],
  },
  {
    id: 2,
    name: {
      first: "Jane",
      last: "Smith",
    },
    email: "jane.smith@example.com",
    location: {
      city: "San Francisco",
      country: "USA",
    },
    tags: ["designer", "ui", "ux"],
  },
  {
    id: 3,
    name: {
      first: "Robert",
      last: "Johnson",
    },
    email: "robert.j@example.com",
    location: {
      city: "London",
      country: "UK",
    },
    tags: ["manager", "agile", "scrum"],
  },
  {
    id: 4,
    name: {
      first: "Emily",
      last: "Davis",
    },
    email: "emily.davis@example.com",
    location: {
      city: "Toronto",
      country: "Canada",
    },
    tags: ["marketing", "content", "seo"],
  },
  {
    id: 5,
    name: {
      first: "Michael",
      last: "Brown",
    },
    email: "michael.b@example.com",
    location: {
      city: "Berlin",
      country: "Germany",
    },
    tags: ["developer", "python", "data"],
  },
  {
    id: 6,
    name: {
      first: "Sarah",
      last: "Wilson",
    },
    email: "sarah.w@example.com",
    location: {
      city: "Sydney",
      country: "Australia",
    },
    tags: ["product", "management", "strategy"],
  },
  {
    id: 7,
    name: {
      first: "David",
      last: "Taylor",
    },
    email: "david.t@example.com",
    location: {
      city: "Paris",
      country: "France",
    },
    tags: ["developer", "mobile", "ios"],
  },
  {
    id: 8,
    name: {
      first: "Laura",
      last: "Clark",
    },
    email: "laura.c@example.com",
    location: {
      city: "Tokyo",
      country: "Japan",
    },
    tags: ["designer", "motion", "animation"],
  },
  {
    id: 9,
    name: {
      first: "James",
      last: "Miller",
    },
    email: "james.m@example.com",
    location: {
      city: "Barcelona",
      country: "Spain",
    },
    tags: ["architect", "backend", "infrastructure"],
  },
  {
    id: 10,
    name: {
      first: "Jennifer",
      last: "Lee",
    },
    email: "jennifer.l@example.com",
    location: {
      city: "Singapore",
      country: "Singapore",
    },
    tags: ["qa", "testing", "automation"],
  },
];

// Sample products data with nested properties
export const products = [
  {
    id: 1,
    name: "MacBook Pro",
    price: 1999.99,
    category: {
      main: "Electronics",
      sub: "Laptops",
    },
    specs: {
      processor: "M2 Pro",
      memory: "16GB",
      storage: "512GB SSD",
    },
    inStock: true,
    tags: ["Apple", "laptop", "premium"],
  },
  {
    id: 2,
    name: "iPhone 14 Pro",
    price: 999.99,
    category: {
      main: "Electronics",
      sub: "Smartphones",
    },
    specs: {
      processor: "A16 Bionic",
      memory: "6GB",
      storage: "256GB",
    },
    inStock: true,
    tags: ["Apple", "smartphone", "premium"],
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249.99,
    category: {
      main: "Electronics",
      sub: "Audio",
    },
    specs: {
      type: "Wireless Earbuds",
      battery: "6 hours",
      features: "Noise Cancellation",
    },
    inStock: false,
    tags: ["Apple", "audio", "wireless"],
  },
  {
    id: 4,
    name: "iPad Air",
    price: 599.99,
    category: {
      main: "Electronics",
      sub: "Tablets",
    },
    specs: {
      processor: "M1",
      memory: "8GB",
      storage: "64GB",
    },
    inStock: true,
    tags: ["Apple", "tablet", "mid-range"],
  },
  {
    id: 5,
    name: "Apple Watch Series 8",
    price: 399.99,
    category: {
      main: "Electronics",
      sub: "Wearables",
    },
    specs: {
      display: "Always-On Retina",
      sensors: "Heart Rate, ECG, O2",
      battery: "18 hours",
    },
    inStock: true,
    tags: ["Apple", "smartwatch", "health"],
  },
];
