"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subCategory_model_1 = __importDefault(require("../model/subCategory_model")); // Use named import here
const database_1 = __importDefault(require("../Config/database"));
class TopicController {
    // public static async CreateTopic(req: Request, res: Response) {
    //     console.log('Request body:', req.body);
    //     const { name, subcategoryId } = req.body;
    //     try {
    //         const createName = await Topic.create({ name, subcategoryId });
    //         res.status(200).json({
    //             message: "Topic successfully created!",
    //             createName
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             message: "Failed to create Topic, please try again!",
    //             error
    //         });
    //     }
    // }
    static async CreateTopic(req, res) {
        console.log('Request body:', req.body);
        const { name, subcategoryId, ...dynamicFields } = req.body;
        try {
            const newTopic = await subCategory_model_1.default.create({ name, subcategoryId });
            // Handle dynamic fields (extra columns)
            for (const key in dynamicFields) {
                const value = dynamicFields[key];
                await database_1.default.query(`UPDATE topics SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id: newTopic.id },
                });
            }
            res.status(200).json({
                message: "Topic successfully created with dynamic fields!",
                newTopic
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Failed to create Topic, please try again!",
                error
            });
        }
    }
    static async GetTopic(req, res) {
        try {
            const topic = await subCategory_model_1.default.findAll();
            if (!subCategory_model_1.default.length) {
                res.status(500).json({ Message: "do not have any topic" });
            }
            res.status(200).json({ topic });
        }
        catch (error) {
            res.status(400).json({
                message: 'Cannot retrieve Topic',
                error
            });
        }
    }
    static async GetOneTopic(req, res) {
        const { id } = req.params;
        try {
            const topic = await subCategory_model_1.default.findByPk(id);
            if (!subCategory_model_1.default) {
                return res.status(404).json({
                    message: 'Topic not found'
                });
            }
            res.status(200).json({ topic });
        }
        catch (error) {
            res.status(500).json({
                message: 'Something went wrong',
                error
            });
        }
    }
    static async UpdateTopic(req, res) {
        const { id } = req.params;
        const { name, subcategoryId, ...dynamicFields } = req.body;
        try {
            const topic = await subCategory_model_1.default.findByPk(id);
            if (!topic) {
                return res.status(404).json({ message: 'Topic not found' });
            }
            // Update predefined fields
            topic.name = name || topic.name;
            topic.subCategory = subcategoryId || topic.subCategory;
            await topic.save();
            // Handle dynamic fields (extra columns)
            for (const key in dynamicFields) {
                const value = dynamicFields[key];
                await database_1.default.query(`UPDATE topics SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id: topic.id },
                });
            }
            res.status(200).json({
                message: 'Topic successfully updated with dynamic fields!',
                topic
            });
        }
        catch (error) {
            res.status(500).json({
                message: 'Failed to update Topic',
                error
            });
        }
    }
    // public static async UpdateTopic(req: Request, res: Response) {
    //     const { id } = req.params;
    //     const { name, subcategoryId } = req.body;
    //     try {
    //         const topic = await Topic.findByPk(id);
    //         if (!topic) {
    //             return res.status(404).json({ message: 'Topic not found' });
    //         }
    //         // Update the Topic name and categoryId
    //         topic.name = name;
    //         topic.subCategory = subcategoryId;
    //         await topic.save();
    //         res.status(200).json({
    //             message: 'Topic successfully updated!',
    //             topic
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             message: 'Failed to update Topic',
    //             error
    //         });
    //     }
    // }
    static async DeleteTopic(req, res) {
        const { id } = req.params;
        try {
            const topic = await subCategory_model_1.default.findByPk(id);
            if (!topic) {
                return res.status(404).json({ message: 'Topic not found' });
            }
            await topic.destroy();
            res.status(200).json({
                message: 'Topic successfully deleted!'
            });
        }
        catch (error) {
            res.status(500).json({
                message: 'Failed to delete Topic',
                error
            });
        }
    }
    static async DeleteAllTopic(req, res) {
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
exports.default = TopicController;
//# sourceMappingURL=topic_controller.js.map