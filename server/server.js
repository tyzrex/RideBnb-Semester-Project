import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import AuthRoute from './src/routes/auth.js';
import PostRoute from './src/routes/post.js';

const app = express();
const port = 5000;

app.use(cors(
    {
        origin: ["http://localhost:5173"],
        credentials: true,
    }
));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

app.use('/auth', AuthRoute)
app.use('/post', PostRoute)


app.listen(port, () => {
    console.log(`Rental app listening at http://localhost:${port}`);
    }
)