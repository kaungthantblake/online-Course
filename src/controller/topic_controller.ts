import { Request, Response } from 'express';
import Topic from '../model/subCategory_model'; // Use named import here
import sequelize from '../Config/database';


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

    public static async CreateTopic(req: Request, res: Response) {
        console.log('Request body:', req.body);
        const { name, subcategoryId, ...dynamicFields } = req.body;
        try {
            const newTopic = await Topic.create({ name, subcategoryId });

            // Handle dynamic fields (extra columns)
            for (const key in dynamicFields) {
                const value = dynamicFields[key];
                await sequelize.query(`UPDATE topics SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id: newTopic.id },
                });
            }

            res.status(200).json({
                message: "Topic successfully created with dynamic fields!",
                newTopic
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to create Topic, please try again!",
                error
            });
        }
    }


    public static async GetTopic(req: Request, res: Response) {
        try {
            const topic = await Topic.findAll();
            if (!Topic.length) {
                res.status(500).json({ Message: "do not have any topic" })
            }
            res.status(200).json({ topic });
        } catch (error) {
            res.status(400).json({
                message: 'Cannot retrieve Topic',
                error
            });
        }
    }

    public static async GetOneTopic(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const topic = await Topic.findByPk(id);
            if (!Topic) {
                return res.status(404).json({
                    message: 'Topic not found'
                });
            }
            res.status(200).json({ topic });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong',
                error
            });
        }
    }


    public static async UpdateTopic(req: Request, res: Response) {
        const { id } = req.params;
        const { name, subcategoryId, ...dynamicFields } = req.body;

        try {
            const topic = await Topic.findByPk(id);
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
                await sequelize.query(`UPDATE topics SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id: topic.id },
                });
            }

            res.status(200).json({
                message: 'Topic successfully updated with dynamic fields!',
                topic
            });
        } catch (error) {
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

    public static async DeleteTopic(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const topic = await Topic.findByPk(id);
            if (!topic) {
                return res.status(404).json({ message: 'Topic not found' });
            }

            await topic.destroy();
            res.status(200).json({
                message: 'Topic successfully deleted!'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to delete Topic',
                error
            });
        }
    }

    public static async DeleteAllTopic(req: Request, res: Response) {
        try {
            await Topic.destroy({ where: {} });
            res.status(200).json({ message: 'All subcategories successfully deleted!' });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to delete all subcategories',
                error
            });
        }
    }

}

export default TopicController;

