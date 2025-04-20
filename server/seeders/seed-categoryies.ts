import CategoryModel from "../models/category.model";

const initialCategories = [
  { categoryName: "Next.js", active: true },
  { categoryName: "React", active: true},
  { categoryName: "Node.js", active: true },
  { categoryName: "Java", active: true },
  { categoryName: "C#" },
];

export const seedCategories = async () => {
  try {
    const count = await CategoryModel.countDocuments();
    
    if (count === 0) {
      await CategoryModel.insertMany(initialCategories);
      console.log("Initial categories seeded successfully!");
    } else {
      console.log("Categories already exist, skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};