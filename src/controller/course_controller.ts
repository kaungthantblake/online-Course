import { Request, Response } from 'express';
import Course from '../model/Course_model';
import sequelize from '../Config/database';

class CourseController {

    // Create a new course

    // public static async createCourse(req: Request, res: Response) {//original
    //     const { title, subtitle, description, vid_link, subcategory_id } = req.body;
    //     try {
    //         const course = await Course.create({ title, subtitle, description, vid_link,subcategory_id });
    //         res.status(201).json({
    //             message: "Course successfully created!",
    //             course
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             message: "Failed to create course, please try again!",
    //             error
    //         });
    //     }
    // }

    public static async createCourse(req: Request, res: Response) {
        const { title, subtitle, description, vid_link, subcategory_id, ...dynamicFields } = req.body;

        try {
            // Create the course with predefined fields
            const newCourse = await Course.create({ title, subtitle, description, vid_link, subcategory_id });

            // Handle dynamic fields (extra columns)
            for (const key in dynamicFields) {
                const value = dynamicFields[key];
                await sequelize.query(`UPDATE courses SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id: newCourse.id },
                });
            }

            res.status(201).json({
                message: "Course successfully created with dynamic fields!",
                newCourse
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to create course, please try again!",
                error
            });
        }
    }



    // Get all courses
    public static async getCourses(req: Request, res: Response) {
        try {
            const courses = await Course.findAll();
            if (!courses.length) {
                return res.status(404).json({
                    message: 'No courses found'
                });
            }
            res.status(200).json({ courses });
        } catch (error) {
            res.status(400).json({
                message: 'Cannot retrieve courses',
                error
            });
        }
    }

    // Get one course by ID
    public static async getOneCourse(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const course = await Course.findByPk(id);
            if (!course) {
                return res.status(404).json({
                    message: 'Course not found'
                });
            }
            res.status(200).json({ course });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong',
                error
            });
        }
    }

    // Update course by ID
    // public static async updateCourse(req: Request, res: Response) {//original
    //     const { id } = req.params;
    //     const { title, subtitle, description, vid_link, subcategory_id } = req.body;

    //     try {
    //         const course = await Course.findByPk(id);
    //         if (!course) {
    //             return res.status(404).json({ message: 'Course not found' });
    //         }

    //         // Update course details
    //         course.title = title;
    //         course.subtitle = subtitle;
    //         course.description = description;
    //         course.subcategory_id = subcategory_id;
    //         course.vid_link =  vid_link;

    //         await course.save();

    //         res.status(200).json({
    //             message: 'Course successfully updated!',
    //             course
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             message: 'Failed to update course',
    //             error
    //         });
    //     }
    // }

    // Update course by ID with dynamic columns
    public static async updateCourse(req: Request, res: Response) {
    const { id } = req.params;
    const { title, subtitle, description, vid_link, subcategory_id, ...dynamicFields } = req.body;

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Update course details with predefined fields
        course.title = title || course.title;
        course.subtitle = subtitle || course.subtitle;
        course.description = description || course.description;
        course.subcategory_id = subcategory_id || course.subcategory_id;
        course.vid_link = vid_link || course.vid_link;

        await course.save();

        // Handle dynamic fields (extra columns)
        for (const key in dynamicFields) {
            const value = dynamicFields[key];
            await sequelize.query(`UPDATE courses SET ${key} = :value WHERE id = :id`, {
                replacements: { value, id: course.id },
            });
        }

        res.status(200).json({
            message: 'Course successfully updated with dynamic fields!',
            course
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update course',
            error
        });
    }
}


    // Delete course by ID
    public static async deleteCourse(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const course = await Course.findByPk(id);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

            await course.destroy();
            res.status(200).json({
                message: 'Course successfully deleted!'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to delete course',
                error
            });
        }
    }

    // Delete all courses
    public static async deleteAllCourses(req: Request, res: Response) {
        try {
            await Course.destroy({ where: {}, truncate: true });
            res.status(200).json({
                message: 'All courses successfully deleted!'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to delete all courses',
                error
            });
        }
    }
}

export default CourseController;
