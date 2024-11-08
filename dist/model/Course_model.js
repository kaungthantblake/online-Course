"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../Config/database")); // Ensure this path is correct
class Course extends sequelize_1.Model {
}
Course.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically incrementing id field
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false, // Required field
    },
    subtitle: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true, // Optional field
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true, // Optional field
    },
    vid_link: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    subcategory_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true, // Foreign key can be null if no subcategory
        references: {
            model: 'subcategory', // Foreign key to subcategory table
            key: 'id'
        },
        onDelete: 'SET NULL', // Behavior if subcategory is deleted
        onUpdate: 'CASCADE', // Behavior if subcategory id is updated
    }
}, {
    sequelize: database_1.default,
    tableName: 'courses',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
exports.default = Course;
// import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Auth from '../model/auth_model'; // Ensure the correct path
// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';
// const SALT_ROUNDS = 10;
// class AuthController {
//     // Sign up a new user
//     public static async signup(req: Request, res: Response) {
//         const { username, email, password, admin } = req.body;
//         const profileImage = req.file?.buffer;  // Get uploaded file's binary data
//         try {
//             const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//             const newUser = await Auth.create({
//                 username,
//                 email,
//                 password: hashedPassword,
//                 admin: admin || false,
//                 profile: profileImage,  // Save the profile as binary data
//             });
//             res.status(201).json({
//                 message: 'User created successfully',
//                 user: newUser
//             });
//         } catch (error) {
//             res.status(500).json({ message: 'Error creating user', error });
//         }
//     }
//     // public static async signup(req: Request, res: Response) {
//     //     const { username, email, password, admin, profile } = req.body;
//     //     try {
//     //         const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//     //         const newUser = await Auth.create({
//     //             username,
//     //             email,
//     //             password: hashedPassword,
//     //             admin: admin || false,
//     //             profile
//     //         });
//     //         res.status(201).json({
//     //             message: 'User created successfully',
//     //             user: newUser
//     //         });
//     //     } catch (error) {
//     //         res.status(500).json({ message: 'Error creating user', error });
//     //     }
//     // }
//     // Login an existing user
// public static async login(req: Request, res: Response) {
//     const { email, password } = req.body;
//     try {
//         const user = await Auth.findOne({ where: { email } });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ id: user.id, admin: user.admin }, JWT_SECRET, { expiresIn: '1h' });
//         res.json({
//             user,
//             message: 'Login successful',
//             token
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in', error });
//     }
// }
//     // Get current user's profile
//     public static async profile(req: Request, res: Response) {
//         try {
//             const user = await Auth.findAll();
//             if (!user.length) {
//                 return res.status(404).json({ message: 'User not found' });
//             }
//             res.json({ user });
//         } catch (error) {
//             res.status(500).json({ message: 'Error fetching profile', error });
//         }
//     }
//     // Get a single user by ID
//     public static async getUserById(req: Request, res: Response) {
//         const { id } = req.params;
//         try {
//             const user = await Auth.findByPk(id);
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }
//             // Convert profile image to Base64 if exists
//             const profileImageBase64 = user.profile ? user.profile.toString('base64') : null;
//             res.json({
//                 message: "Success fetching user",
//                 user: {
//                     ...user.toJSON(),
//                     profile: profileImageBase64 ? `data:image/jpeg;base64,${profileImageBase64}` : null
//                 }
//             });
//         } catch (error) {
//             res.status(500).json({ message: 'Error fetching user', error });
//         }
//     }
// //     public static async getUserById(req: Request, res: Response) {
// //     const { id } = req.params;
// //     try {
// //         const user = await Auth.findByPk(id);
// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }
// //         // Convert profile image to Base64 if exists
// //         const profileImageBase64 = user.profile ? user.profile.toString('base64') : null;
// //         res.json({
// //             message: "Success fetching user",
// //             user: {
// //                 ...user.toJSON(),
// //                 profile: profileImageBase64 ? `data:image/jpeg;base64,${profileImageBase64}` : null
// //             }
// //         });
// //     } catch (error) {
// //         res.status(500).json({ message: 'Error fetching user', error });
// //     }
// // }
//     // Update a user's details
//     public static async updateUser(req: Request, res: Response) {
//         const { id } = req.params;
//         const { username, email, password, admin, profile } = req.body;
//         try {
//             const user = await Auth.findByPk(id);
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }
//             const hashedPassword = password ? await bcrypt.hash(password, SALT_ROUNDS) : user.password;
//             user.username = username || user.username;
//             user.email = email || user.email;
//             user.password = hashedPassword;
//             user.admin = admin !== undefined ? admin : user.admin;
//             user.profile = profile || user.profile;
//             await user.save();
//             res.json({
//                 message: 'User updated successfully',
//                 user
//             });
//         } catch (error) {
//             res.status(500).json({ message: 'Error updating user', error });
//         }
//     }
//     // Delete a user by ID
//     public static async deleteUser(req: Request, res: Response) {
//         const { id } = req.params;
//         try {
//             const user = await Auth.findByPk(id);
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }
//             await user.destroy();
//             res.json({ message: 'User deleted successfully' });
//         } catch (error) {
//             res.status(500).json({ message: 'Error deleting user', error });
//         }
//     }
// }
// export default AuthController;
// import { Request, Response } from 'express';
// import Category from '../model/category_model';
// class CategoryController {
//     // Create a new category
//     public static async createCategory(req: Request, res: Response) {
//         const { name } = req.body;
//         try {
//             const createName = await Category.create({ name });
//             res.status(200).json({
//                 message: "Category successfully created!",
//                 createName
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: "Failed to create category, please try again!",
//                 error
//             });
//         }
//     }
//     // Get all categories
//     public static async GetCategory(req: Request, res: Response) {
//         try {
//             const categories = await Category.findAll();
//             if (!categories.length) {
//                 return res.status(404).json({
//                     message: 'No categories found'
//                 });
//             }
//             res.status(200).json({ categories });
//         } catch (error) {
//             res.status(400).json({
//                 message: 'Cannot retrieve categories',
//                 error
//             });
//         }
//     }
//     // Get one category by ID
//     public static async GetOneCategory(req: Request, res: Response) {
//         const { id } = req.params;
//         try {
//             const category = await Category.findByPk(id);
//             if (!category) {
//                 return res.status(404).json({
//                     message: 'Category not found'
//                 });
//             }
//             res.status(200).json({ category });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Something went wrong',
//                 error
//             });
//         }
//     }
//     // Update category by ID
//     public static async updateCategory(req: Request, res: Response) {
//         const { id } = req.params;
//         const { name } = req.body;
//         try {
//             const category = await Category.findByPk(id);
//             if (!category) {
//                 return res.status(404).json({ message: 'Category not found' });
//             }
//             // Update the category name
//             category.name = name;
//             await category.save();
//             res.status(200).json({
//                 message: 'Category successfully updated!',
//                 category
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to update category',
//                 error
//             });
//         }
//     }
//     // Delete category by ID
//     public static async deleteCategory(req: Request, res: Response) {
//         const { id } = req.params;
//         try {
//             const category = await Category.findByPk(id);
//             if (!category) {
//                 return res.status(404).json({ message: 'Category not found' });
//             }
//             await category.destroy();
//             res.status(200).json({
//                 message: 'Category successfully deleted!'
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to delete category',
//                 error
//             });
//         }
//     }
//     // Delete all categories
//     public static async DeleteAllCategory(req: Request, res: Response) {
//         try {
//             await Category.destroy({ where: {}, truncate: true });
//             res.status(200).json({
//                 message: 'All categories successfully deleted!'
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to delete all categories',
//                 error
//             });
//         }
//     }
// }
// export default CategoryController;
// import { Request, Response } from 'express';
// import Course from '../model/Course_model';
// class CourseController {
//     // Create a new course
//     public static async createCourse(req: Request, res: Response) {
//         const { title, subtitle, description, vid_link, subcategory_id } = req.body;
//         try {
//             const course = await Course.create({ title, subtitle, description, vid_link,subcategory_id });
//             res.status(201).json({
//                 message: "Course successfully created!",
//                 course
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: "Failed to create course, please try again!",
//                 error
//             });
//         }
//     }
//     // Get all courses
//     public static async getCourses(req: Request, res: Response) {
//         try {
//             const courses = await Course.findAll();
//             if (!courses.length) {
//                 return res.status(404).json({
//                     message: 'No courses found'
//                 });
//             }
//             res.status(200).json({ courses });
//         } catch (error) {
//             res.status(400).json({
//                 message: 'Cannot retrieve courses',
//                 error
//             });
//         }
//     }
//     // Get one course by ID
//     public static async getOneCourse(req: Request, res: Response) {
//         const { id } = req.params;
//         try {
//             const course = await Course.findByPk(id);
//             if (!course) {
//                 return res.status(404).json({
//                     message: 'Course not found'
//                 });
//             }
//             res.status(200).json({ course });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Something went wrong',
//                 error
//             });
//         }
//     }
//     // Update course by ID
//     public static async updateCourse(req: Request, res: Response) {
//         const { id } = req.params;
//         const { title, subtitle, description, vid_link, subcategory_id } = req.body;
//         try {
//             const course = await Course.findByPk(id);
//             if (!course) {
//                 return res.status(404).json({ message: 'Course not found' });
//             }
//             // Update course details
//             course.title = title;
//             course.subtitle = subtitle;
//             course.description = description;
//             course.subcategory_id = subcategory_id;
//             course.vid_link =  vid_link;
//             await course.save();
//             res.status(200).json({
//                 message: 'Course successfully updated!',
//                 course
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to update course',
//                 error
//             });
//         }
//     }
//     // Delete course by ID
//     public static async deleteCourse(req: Request, res: Response) {
//         const { id } = req.params;
//         try {
//             const course = await Course.findByPk(id);
//             if (!course) {
//                 return res.status(404).json({ message: 'Course not found' });
//             }
//             await course.destroy();
//             res.status(200).json({
//                 message: 'Course successfully deleted!'
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to delete course',
//                 error
//             });
//         }
//     }
//     // Delete all courses
//     public static async deleteAllCourses(req: Request, res: Response) {
//         try {
//             await Course.destroy({ where: {}, truncate: true });
//             res.status(200).json({
//                 message: 'All courses successfully deleted!'
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to delete all courses',
//                 error
//             });
//         }
//     }
// }
// export default CourseController;
// import { Request, Response } from 'express';
// import  Subcategory  from '../model/subCategory_model'; // Use named import here
// class SubcategoryController {
//     public static async CreateSubCategory(req: Request, res: Response) {
//         console.log('Request body:', req.body);
//         const { name, categoryId } = req.body;
//         try {
//             const createName = await Subcategory.create({ name, categoryId });
//             res.status(200).json({
//                 message: "Subcategory successfully created!",
//                 createName
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: "Failed to create subcategory, please try again!",
//                 error
//             });
//         }
//     }
//     public static async GetSubCategory(req: Request, res: Response) {
//         try {
//             const subcategory = await Subcategory.findAll();
//             if(!subcategory.length){
//                 res.status(500).json({Message:"category not found"})
//             }
//             res.status(200).json({ subcategory });
//         } catch (error) {
//             res.status(400).json({
//                 message: 'Cannot retrieve subcategory',
//                 error
//             });
//         }
//     }
//     public static async GetOneSubCategory(req: Request, res: Response) {
//         const { id } = req.params;
//         try {
//             const subcategory = await Subcategory.findByPk(id);
//             if (!subcategory) {
//                 return res.status(404).json({
//                     message: 'Subcategory not found'
//                 });
//             }
//             res.status(200).json({ subcategory });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Something went wrong',
//                 error
//             });
//         }
//     }
//     public static async UpdateSubCategory(req: Request, res: Response) {
//         const { id } = req.params;
//         const { name, categoryId } = req.body;
//         try {
//             const subcategory = await Subcategory.findByPk(id);
//             if (!subcategory) {
//                 return res.status(404).json({ message: 'Subcategory not found' });
//             }
//             // Update the subcategory name and categoryId
//             subcategory.name = name;
//             subcategory.categoryId = categoryId;
//             await subcategory.save();
//             res.status(200).json({
//                 message: 'Subcategory successfully updated!',
//                 subcategory
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to update subcategory',
//                 error
//             });
//         }
//     }
//     public static async DeleteSubCategory(req: Request, res: Response) {
//         const { id } = req.params;
//         try {
//             const subcategory = await Subcategory.findByPk(id);
//             if (!subcategory) {
//                 return res.status(404).json({ message: 'Subcategory not found' });
//             }
//             await subcategory.destroy();
//             res.status(200).json({
//                 message: 'Subcategory successfully deleted!'
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to delete subcategory',
//                 error
//             });
//         }
//     }
//     public static async DeleteAllSubCategory(req: Request, res: Response) {
//         try {
//             await Subcategory.destroy({ where: {} });
//             res.status(200).json({ message: 'All subcategories successfully deleted!' });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to delete all subcategories',
//                 error
//             });
//         }
//     }
// }
// export default SubcategoryController;
// import { Request, Response } from 'express';
// import Topic from '../model/subCategory_model'; // Use named import here
// class TopicController {
//     public static async CreateTopic(req: Request, res: Response) {
//         console.log('Request body:', req.body);
//         const { name, subcategoryId } = req.body;
//         try {
//             const createName = await Topic.create({ name, subcategoryId });
//             res.status(200).json({
//                 message: "Topic successfully created!",
//                 createName
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: "Failed to create Topic, please try again!",
//                 error
//             });
//         }
//     }
//     public static async GetTopic(req: Request, res: Response) {
//         try {
//             const topic = await Topic.findAll();
//             if (!Topic.length) {
//                 res.status(500).json({ Message: "do not have any topic" })
//             }
//             res.status(200).json({ topic });
//         } catch (error) {
//             res.status(400).json({
//                 message: 'Cannot retrieve Topic',
//                 error
//             });
//         }
//     }
//     public static async GetOneTopic(req: Request, res: Response) {
//         const { id } = req.params;
//         try {
//             const topic = await Topic.findByPk(id);
//             if (!Topic) {
//                 return res.status(404).json({
//                     message: 'Topic not found'
//                 });
//             }
//             res.status(200).json({ topic });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Something went wrong',
//                 error
//             });
//         }
//     }
//     public static async UpdateTopic(req: Request, res: Response) {
//         const { id } = req.params;
//         const { name, subcategoryId } = req.body;
//         try {
//             const topic = await Topic.findByPk(id);
//             if (!topic) {
//                 return res.status(404).json({ message: 'Topic not found' });
//             }
//             // Update the Topic name and categoryId
//             topic.name = name;
//             topic.subCategory = subcategoryId;
//             await topic.save();
//             res.status(200).json({
//                 message: 'Topic successfully updated!',
//                 topic
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to update Topic',
//                 error
//             });
//         }
//     }
//     public static async DeleteTopic(req: Request, res: Response) {
//         const { id } = req.params;
//         try {
//             const topic = await Topic.findByPk(id);
//             if (!topic) {
//                 return res.status(404).json({ message: 'Topic not found' });
//             }
//             await topic.destroy();
//             res.status(200).json({
//                 message: 'Topic successfully deleted!'
//             });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to delete Topic',
//                 error
//             });
//         }
//     }
//     public static async DeleteAllTopic(req: Request, res: Response) {
//         try {
//             await Topic.destroy({ where: {} });
//             res.status(200).json({ message: 'All subcategories successfully deleted!' });
//         } catch (error) {
//             res.status(500).json({
//                 message: 'Failed to delete all subcategories',
//                 error
//             });
//         }
//     }
// }
// export default TopicController
//# sourceMappingURL=Course_model.js.map