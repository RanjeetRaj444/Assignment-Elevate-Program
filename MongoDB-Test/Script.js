//------ employees collection --------

// {
//   _id: ObjectId,
//   name: "Sarah Johnson",
//   email: "sarah@company.com",
//   age: 32,
//   location: "Chicago",
//   technologies: ["React", "Node.js", "PostgreSQL"],
//   salary: 85000,
//   team: "Frontend",
//   hireDate: ISODate("2021-03-10"),
//   status: "active",
//   assignments: [
//     { project: "E-commerce Platform", position: "Senior Developer", startDate: ISODate("2021-04-01") },
//     { project: "Mobile App", position: "Tech Lead", startDate: ISODate("2022-06-15") }
//   ]
// }

// sales collection
// {
//   _id: ObjectId,
//   saleId: "S001",
//   clientId: ObjectId,
//   products: [
//     { sku: "SKU001", name: "Smartphone", price: 800, quantity: 1 },
//     { sku: "SKU002", name: "Case", price: 30, quantity: 3 }
//   ],
//   total: 890,
//   saleDate: ISODate("2024-02-20"),
//   status: "completed",
//   customerInfo: {
//     address: "456 Oak Ave",
//     city: "Denver",
//     state: "CO",
//     zip: "80202"
//   }
// }

// inventory collection
// {
//   _id: ObjectId,
//   sku: "SKU001",
//   name: "Smartphone",
//   category: "Mobile Devices",
//   price: 800,
//   stock: 75,
//   keywords: ["phone", "mobile", "communication"],
//   details: {
//     brand: "TechBrand",
//     model: "Pro Max",
//     weight: "180g"
//   },
//   feedback: [
//     { customerId: ObjectId, rating: 4, review: "Excellent device!" },
//     { customerId: ObjectId, rating: 5, review: "Highly recommended" }
//   ]
// }

//Q1: Find all employees in the "Backend" team.

db.employees.find({ team: "Backend" });

//Q2: Find employees with salary greater than 70000.

db.employees.find({ salary: { $gt: 70000 } });

//Q3: Update the salary of employee with email "sarah@company.com" to 90000.

db.employees.updateOne(
  { email: "sarah@company.com" },
  { $set: { salary: 90000 } }
);

//Q4: Find sales with status "pending" or "completed".

db.sales.find({ status: { $in: ["completed", "pending"] } });

//Q5: Find employees who have exactly 2 technologies in their skill set.

db.employees.find({ technologies: { $size: 2 } });

//Q6: Find employees who know both "React" and "Node.js".

db.employees.find({ technologies: { $all: ["React", "Node.js"] } });

//Q7: Add a new technology "GraphQL" to employee with email "sarah@company.com".

db.employees.updateOne(
  { email: "sarah@company.com" },
  { $push: { technologies: "GraphQL" } }
);
