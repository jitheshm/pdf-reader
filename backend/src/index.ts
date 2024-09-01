import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'path'
import userRouter from './routes/user';
import dbConnect from './config/dbConnect';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// const userBuildPath = path.join(__dirname, '../../frontend/dist');

app.use(express.json());
app.use(cors())
app.use(cookieParser());
// app.use('/', express.static(userBuildPath));
dbConnect()

app.use('/api/user', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ error: err.message });

});

// app.get("/*", function (req, res) {

//   res.sendFile(
//     path.join(__dirname, "../../frontend/dist/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
