"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const category_route_1 = __importDefault(require("./routes/category_route"));
const Subcategory_route_1 = __importDefault(require("./routes/Subcategory_route"));
const topic_route_1 = __importDefault(require("./routes/topic_route"));
const auth_routes_1 = __importDefault(require("./routes/auth_routes"));
const user_route_1 = __importDefault(require("./routes/user_route"));
const authEditor_route_1 = __importDefault(require("./routes/authEditor_route"));
const course_route_1 = __importDefault(require("./routes/course_route"));
const port = 3000;
const allowedOrigins = [
    'http://localhost:8000',
    'http://localhost:4200',
    'http://127.0.0.1:8000',
    'http://10.0.2.2:8000',
];
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(body_parser_1.default.json());
app.use('/api/Category', category_route_1.default);
app.use('/api/topic', topic_route_1.default);
app.use('/api', Subcategory_route_1.default);
app.use('/admin/', authEditor_route_1.default);
app.use('/api/adminAuth/', auth_routes_1.default);
app.use('/api/user/', user_route_1.default);
app.use('/api/courses/', course_route_1.default);
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
app.listen(port, () => { });
console.log(`Express server started on port 3000 ${port}`);
//# sourceMappingURL=index.js.map