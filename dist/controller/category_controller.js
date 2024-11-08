"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = __importDefault(require("../model/category_model"));
const database_1 = __importDefault(require("../Config/database"));
class CategoryController {
    // Create a new category
    static async createCategory(req, res) {
        const { name, ...dynamicFields } = req.body;
        try {
            // Create the category with predefined fields
            const newCategory = await category_model_1.default.create({ name });
            // Handle dynamic fields (extra columns)
            for (const key in dynamicFields) {
                const value = dynamicFields[key];
                await database_1.default.query(`UPDATE categories SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id: newCategory.id },
                });
            }
            res.status(200).json({
                message: "Category successfully created with dynamic fields!",
                newCategory
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Failed to create category, please try again!",
                error
            });
        }
    }
    // public static async createCategory(req: Request, res: Response) {//original
    //     const { name } = req.body;
    //     try {
    //         const createName = await Category.create({ name });
    //         res.status(200).json({
    //             message: "Category successfully created!",
    //             createName
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             message: "Failed to create category, please try again!",
    //             error
    //         });
    //     }
    // }
    // Get all categories
    static async GetCategory(req, res) {
        try {
            const categories = await category_model_1.default.findAll();
            if (!categories.length) {
                return res.status(404).json({
                    message: 'No categories found'
                });
            }
            res.status(200).json({ categories });
        }
        catch (error) {
            res.status(400).json({
                message: 'Cannot retrieve categories',
                error
            });
        }
    }
    // Get one category by ID
    static async GetOneCategory(req, res) {
        const { id } = req.params;
        try {
            const category = await category_model_1.default.findByPk(id);
            if (!category) {
                return res.status(404).json({
                    message: 'Category not found'
                });
            }
            res.status(200).json({ category });
        }
        catch (error) {
            res.status(500).json({
                message: 'Something went wrong',
                error
            });
        }
    }
    // Update category by ID
    // public static async updateCategory(req: Request, res: Response) {//original
    //     const { id } = req.params;
    //     const { name } = req.body;
    //     try {
    //         const category = await Category.findByPk(id);
    //         if (!category) {
    //             return res.status(404).json({ message: 'Category not found' });
    //         }
    //         // Update the category name
    //         category.name = name;
    //         await category.save();
    //         res.status(200).json({
    //             message: 'Category successfully updated!',
    //             category
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             message: 'Failed to update category',
    //             error
    //         });
    //     }
    // }
    static async updateCategory(req, res) {
        const { id } = req.params;
        const { name, ...dynamicFields } = req.body;
        try {
            const category = await category_model_1.default.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            // Update the category name
            category.name = name || category.name;
            await category.save();
            // Handle dynamic fields (extra columns)
            for (const key in dynamicFields) {
                const value = dynamicFields[key];
                await database_1.default.query(`UPDATE categories SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id: category.id },
                });
            }
            res.status(200).json({
                message: 'Category successfully updated with dynamic fields!',
                category
            });
        }
        catch (error) {
            res.status(500).json({
                message: 'Failed to update category',
                error
            });
        }
    }
    // Delete category by ID
    static async deleteCategory(req, res) {
        const { id } = req.params;
        try {
            const category = await category_model_1.default.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            await category.destroy();
            res.status(200).json({
                message: 'Category successfully deleted!'
            });
        }
        catch (error) {
            res.status(500).json({
                message: 'Failed to delete category',
                error
            });
        }
    }
    // Delete all categories
    static async DeleteAllCategory(req, res) {
        try {
            await category_model_1.default.destroy({ where: {}, truncate: true });
            res.status(200).json({
                message: 'All categories successfully deleted!'
            });
        }
        catch (error) {
            res.status(500).json({
                message: 'Failed to delete all categories',
                error
            });
        }
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category_controller.js.map