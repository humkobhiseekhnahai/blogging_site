import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@sharmaji_09/common";

const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL : string,
        JWT_SECRET_KEY: string
    }
}>;

userRouter.post('/signup', async(c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body =  await c.req.json()
    const success = signupInput.safeParse(body)
    if(success){
        const username = body.username;
        const password = body.password;
        const name = body.name;
    
       try {
        const user = await prisma.user.create({
            data: {
                username,
                password,
                name
            }
            });
            const token = await sign({
                id: user.id
            }, c.env.JWT_SECRET_KEY)
            return c.json({
                message: 'User created successfully',
                token: token
            })
        
       } catch (error) {
        console.log("error signing up")
        console.log(error)
        return c.json({
            msg: "error on catch block"
        })
       }
    }else{
        c.status(400)
        return c.json({
            msg: "wrong inputs"
        })
    }
   
})


userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body =  await c.req.json()
    const success = signinInput.safeParse(body)
    if(success){
        const username = body.username;
    const password = body.password;
    

   try {
    const user = await prisma.user.findFirst({
        where: {
            username,
            password
        }
        });
        if (!user) {
            c.status(403);
            return c.json({
                msg:"unauthorized"
            })
        }
        const token = await sign({
            id: user.id
        }, c.env.JWT_SECRET_KEY)
        return c.json({
            message: 'User signed successfully',
            token: token
        })
    
   } catch (error) {
    console.log("error signing up")
    console.log(error)
    return c.json({
        msg: "error on catch block"
    })
   }
    }else{
        c.status(400)
        return c.json({
            msg: "wrong inputs"
        })
    }
    
})

export default userRouter;
