import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './src/middleware/authMiddleware.js';
import AuthRoute from './src/routes/auth.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use('/auth', AuthRoute)


//Erorr handler middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Rental app listening at http://localhost:${port}`);
    }
)