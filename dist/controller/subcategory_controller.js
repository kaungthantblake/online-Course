"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subCategory_model_1 = __importDefault(require("../model/subCategory_model")); // Use named import here
const database_1 = __importDefault(require("../Config/database"));
class SubcategoryController {
    // public static async CreateSubCategory(req: Request, res: Response) {//original
    //     console.log('Request body:', req.body);
    //     const { name, categoryId } = req.body;
    //     try {
    //         const createName = await Subcategory.create({ name, categoryId });
    //         res.status(200).json({
    //             message: "Subcategory successfully created!",
    //             createName
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             message: "Failed to create subcategory, please try again!",
    //             error
    //         });
    //     }
    // }
    static async CreateSubCategory(req, res) {
        const { name, categoryId, ...dynamicFields } = req.body;
        try {
            const newSubcategory = await subCategory_model_1.default.create({ name, categoryId });
            // Handle dynamic fields (extra columns)
            for (const key in dynamicFields) {
                const value = dynamicFields[key];
                await database_1.default.query(`UPDATE subcategories SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id: newSubcategory.id },
                });
            }
            res.status(200).json({
                message: "Subcategory successfully created with dynamic fields!",
                newSubcategory
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Failed to create subcategory, please try again!",
                error
            });
        }
    }
    static async GetSubCategory(req, res) {
        try {
            const subcategory = await subCategory_model_1.default.findAll();
            if (!subcategory.length) {
                res.status(500).json({ Message: "category not found" });
            }
            res.status(200).json({ subcategory });
        }
        catch (error) {
            res.status(400).json({
                message: 'Cannot retrieve subcategory',
                error
            });
        }
    }
    static async GetOneSubCategory(req, res) {
        const { id } = req.params;
        try {
            const subcategory = await subCategory_model_1.default.findByPk(id);
            if (!subcategory) {
                return res.status(404).json({
                    message: 'Subcategory not found'
                });
            }
            res.status(200).json({ subcategory });
        }
        catch (error) {
            res.status(500).json({
                message: 'Something went wrong',
                error
            });
        }
    }
    // Update subcategory by ID with dynamic columns
    static async UpdateSubCategory(req, res) {
        const { id } = req.params;
        const { name, categoryId, ...dynamicFields } = req.body;
        try {
            const subcategory = await subCategory_model_1.default.findByPk(id);
            if (!subcategory) {
                return res.status(404).json({ message: 'Subcategory not found' });
            }
            // Update predefined fields
            subcategory.name = name || subcategory.name;
            subcategory.categoryId = categoryId || subcategory.categoryId;
            await subcategory.save();
            // Handle dynamic fields (extra columns)
            for (const key in dynamicFields) {
                const value = dynamicFields[key];
                await database_1.default.query(`UPDATE subcategories SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id: subcategory.id },
                });
            }
            res.status(200).json({
                message: 'Subcategory successfully updated with dynamic fields!',
                subcategory
            });
        }
        catch (error) {
            res.status(500).json({
                message: 'Failed to update subcategory',
                error
            });
        }
    }
    // public static async UpdateSubCategory(req: Request, res: Response) {
    //     const { id } = req.params;
    //     const { name, categoryId } = req.body;
    //     try {
    //         const subcategory = await Subcategory.findByPk(id);
    //         if (!subcategory) {
    //             return res.status(404).json({ message: 'Subcategory not found' });
    //         }
    //         // Update the subcategory name and categoryId
    //         subcategory.name = name;
    //         subcategory.categoryId = categoryId;
    //         await subcategory.save();
    //         res.status(200).json({
    //             message: 'Subcategory successfully updated!',
    //             subcategory
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             message: 'Failed to update subcategory',
    //             error
    //         });
    //     }
    // }
    static async DeleteSubCategory(req, res) {
        const { id } = req.params;
        try {
            const subcategory = await subCategory_model_1.default.findByPk(id);
            if (!subcategory) {
                return res.status(404).json({ message: 'Subcategory not found' });
            }
            await subcategory.destroy();
            res.status(200).json({
                message: 'Subcategory successfully deleted!'
            });
        }
        catch (error) {
            res.status(500).json({
                message: 'Failed to delete subcategory',
                error
            });
        }
    }
    static async DeleteAllSubCategory(req, res) {
        try {
            await subCategory_model_1.default.destroy({ where: {} });
            res.status(200).json({ message: 'All subcategories successfully deleted!' });
        }
        catch (error) {
            res.status(500).json({
                message: 'Failed to delete all subcategories',
                error
            });
        }
    }
}
exports.default = SubcategoryController;
//# sourceMappingURL=subcategory_controller.js.map