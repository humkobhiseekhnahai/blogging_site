import { Hono } from 'hono'
import userRouter from './routes/user';
import blogRouter from './routes/blog';

const app = new Hono();

app.route("/user", userRouter);
app.route("/blog", blogRouter);

export default app;
