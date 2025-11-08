import Category from "../models/category.models.js";
import User from "../models/user.models.js";

export const createCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not Found", success: false });
    }

    const { categoryName, categoryDesc, color } = req.body;
    if (!categoryName) {
      return res.status(201).json({ message: "Enter Category Name" });
    }

    const newCategory = new Category({
      categoryName,
      categoryDesc,
      color,
      userId,
    });

    await newCategory.save();

    res.status(201).json({
      message: "Task created successfully",
      success: true,
      newCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not Found", success: false });
    }
    
    const categories = await Category.find({userId});
    console.log(categories);
    
    if (categories.length === 0) {
      return res
        .status(404)
        .json({ message: "No categories Found", success: false });
    }

    return res
      .status(200)
      .json({ message: "All categories fetched successfully", categories });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (category.user != userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({
      message: "Category Deleted Successfully",
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
export const updateCategory = async (req, res) => {};
