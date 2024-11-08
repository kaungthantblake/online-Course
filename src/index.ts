import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import categoryRoutes from './routes/category_route'; 
import subcategoryRoutes from './routes/Subcategory_route';
import topic from './routes/topic_route'; 
import authRoute from "./routes/auth_routes";
import userRoute from './routes/user_route';
import ColumnsRoutes from './routes/authEditor_route';
import CourseRoute from "./routes/course_route";


const port = 3000;
const allowedOrigins = [
    'http://localhost:8000',
    'http://localhost:4200',
    'http://127.0.0.1:8000',
    'http://10.0.2.2:8000',
];
const app = express();
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'   

}));
app.use(bodyParser.json());
app.use('/api/Category', categoryRoutes);
app.use('/api/topic', topic);
app.use('/api', subcategoryRoutes );
app.use('/admin/', ColumnsRoutes);
app.use('/api/adminAuth/', authRoute)
app.use('/api/user/', userRoute);
app.use('/api/courses/', CourseRoute)
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
    });  
app.listen(port, () => { });

console.log( `Express server started on port 3000 ${port}`);