import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@sandy99-cohort/common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
        token:string
    },Variables:{
        userId:string
    }
}>();



userRouter.post('/signup',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

   

    try{
            const body = await c.req.json();
            const { success } = signupInput.safeParse(body);
            if(!success){
                c.status(400);
                return c.json({ error: "invalid input"});
            }
            const user = await prisma.user.create({
                data:{
                    email:body.email,
                    password:body.password,
                    name:body.name
                },
            });

            const token = await sign({ id: user.id}, c.env.JWT_SECRET);

            return c.json({
                jwt: token
            })
        }catch(e){
            console.log(e);
            return c.json({
                error: "email already taken"
            });
        }
        
})

userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try {
        const body =await c.req.json();
        const { success } = signinInput.safeParse(body);
        if(!success){
            c.status(400);
            return c.json({ error: "invalid input"});
        }
        const user = await prisma.user.findUnique({
            where: {
                email:    body.email,
                password: body.password
            }
        });
        if(user){
            const token = await sign({id:user.id} ,c.env.JWT_SECRET);

            c.set('userId',token)
            // const checktoken = c.get('userId');
            // console.log(checktoken);
            return c.json({
                message:"signed in successfully",
                jwt : token
            })

        }else{
            return c.text("User does not exists");
        }
    }catch(e){
            return c.text("error logging in");
    }
});