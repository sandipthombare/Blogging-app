import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";

import { Hono }  from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput} from "@sandy99-cohort/common";
import { string } from "zod";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL:string,
        JWT_SECRET: string
    },Variables: {
        userId: string
    }
}>();

blogRouter.use("/*", async(c,next) => {
   try{
     const authHeader =  c.req.header('Authorization') || "";

    const authToken = await verify(authHeader, c.env.JWT_SECRET);

    if(authToken){
        console.log("auth successful")
        c.set("userId",authToken.id);
       await next(); 
    }else{
        return c.json({
            message:"Authentication failed login again"
        })
    }
    }catch(e){
        console.log(e)
        return c.text("Authentication error");
    }
});
 

blogRouter.post('/', async (c) => {
    try{          
        const userId = c.get('userId');
        const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const { success } = createBlogInput.safeParse(body);

        if(!success){
            c.status(401);
            return c.json({error: "invalid input"});
        }
        const Blog = await prisma.blog.create({
            data: {
                    title : body.title,
                    content : body.content,
                    authorId : Number(userId)
                }
        });
        if(Blog){
            return c.json({
                message:"Blog created successfully",
                id: Blog.id
            })
        }else {
            return c.text("Invalid inputs");
        }
        
    }catch(e){
        console.log(e);
        return c.text("Error creating blog")
    }

})

blogRouter.put('/:id', async (c) => {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({ error: "invalid input" });
    }
        await prisma.blog.update({
            where: {
                id: body.id,
                authorId: Number(userId)
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        return c.text('updated post');

})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs =await prisma.blog.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    console.log("blogs are " + blogs);

    return c.json({blogs});

});

blogRouter.get('/:id', async (c) => {
        const id = c.req.param('id');
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL
        }).$extends(withAccelerate());

        const blog = await prisma.blog.findFirst({
            where: {
                id:Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select: {
                        name:true
                    }
                }
            }
        });

        return c.json({blog});
})


