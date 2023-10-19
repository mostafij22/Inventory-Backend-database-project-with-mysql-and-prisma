import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {headers} from "next/headers";

// Category List Select
export async function GET(req,res) {
    try{
        let headerList=headers();
        let id=headerList.get('id');
        const prisma=new PrismaClient();
        const result=await prisma.customers.findMany({where:{user_id:parseInt(id)}})
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
        const result=await prisma.customers.create({data:reqBody})

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
        let cus_id = searchParams.get('cus_id');

        const prisma=new PrismaClient();
        const result=await prisma.customers.update(
            {
                where: {id: parseInt(cus_id), user_id: parseInt(id)},
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
        let cus_id = searchParams.get('cus_id');

        const prisma = new PrismaClient();
        const result = await prisma.customers.delete(
            {
                where: {
                    id: parseInt(cus_id),
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
        let cus_id=searchParams.get('cus_id');

        const prisma=new PrismaClient();
        const result=await prisma.customers.findUnique(
            {
                where:{
                    id:parseInt(cus_id),
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