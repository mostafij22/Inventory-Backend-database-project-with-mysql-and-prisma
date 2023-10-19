import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {headers} from "next/headers";


// Category List Select
export async function GET(req,res) {
    try{
        let headerList=headers();
        let id=headerList.get('id');
        const prisma=new PrismaClient();
        const result=await prisma.categories.findMany({where:{user_id:parseInt(id)}})
        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}




export async function POST(req,res) {
    try{
        let headerList=headers();
        let id=headerList.get('id')

        let reqBody=await req.json();
        reqBody.user_id=parseInt(id);

        const prisma=new PrismaClient();
        const result=await prisma.categories.create({data:reqBody})

        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}


export async function PUT(req,res) {
    try{
        let headerList=headers();
        let id=headerList.get('id')

        let reqBody=await req.json();


        let {searchParams} = new URL(req.url);
        let cat_id = searchParams.get('cat_id');

        const prisma=new PrismaClient();
        const result=await prisma.categories.update(
            {
                where: {id: parseInt(cat_id), user_id: parseInt(id)},
                data:reqBody
            }
        )

        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}







export async function DELETE(req,res) {
    try {
        let headerList = headers();
        let user_id = headerList.get('id')

        let {searchParams} = new URL(req.url);
        let cat_id = searchParams.get('cat_id');

        const prisma = new PrismaClient();
        const result = await prisma.categories.delete(
            {
                where: {
                    id: parseInt(cat_id),
                    user_id: parseInt(user_id)
                }
            }
        )
        return NextResponse.json({status: "success", data: result})

    } catch (e) {
        return NextResponse.json({status: "fail", data: e})
    }

}



//Select Category One
export async function PATCH(req,res) {
    try{
        let headerList=headers();
        let user_id=headerList.get('id')

        let {searchParams}= new URL(req.url);
        let cat_id=searchParams.get('cat_id');

        const prisma=new PrismaClient();
        const result=await prisma.categories.findUnique(
            {
                where:{
                    id:parseInt(cat_id),
                    user_id:parseInt(user_id)
                }
            }

        )
        return  NextResponse.json({status:"success",data:result})

    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}

