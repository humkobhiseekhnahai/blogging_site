import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, verify } from "hono/jwt";
import { createBlogInput, updateBloginput } from "@sharmaji_09/common";


const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET_KEY: string
        userId: string
    },
    Variables: {
        userId: String;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const check = await verify(authHeader, c.env.JWT_SECRET_KEY);
    if (check) {
        c.set("jwtPayload", check.id);
        await next();
    } else {
        c.status(403);
        return c.json({
            msg: "you are not logged in"
        });
    }
});
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const success = createBlogInput.safeParse(body)
    if (!success) {
        // c.status(400)
        return c.json({
            msg: "wrong inputs"
        })
    }
    const title = body.title;
    const content = body.content
    const authorId = c.get("jwtPayload")

    const blog = await prisma.blog.create({
        data: {
            title,
            content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const success = updateBloginput.safeParse(body)
    if (!success) {
        c.status(400)
        return c.json({
            msg: "wrong inputs"
        })
    }
    const title = body.title;
    const content = body.content

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content

        }
    })

    return c.json({
        id: blog.id
    })
})

//TODO: add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany({
        select: {
            title: true,
            content: true,
            id: true,
            author: {
                select: {
                    name: true,
                }
            }
        }
    })

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id")
    const blog = await prisma.blog.findFirst({
        where: {
            id: Number(id)
        },
        select:{
            id: true,
            authorId: true,
            title: true,
            content: true,
            published: true,
            author:{
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({
        blog 
    })
})
export default blogRouter;


