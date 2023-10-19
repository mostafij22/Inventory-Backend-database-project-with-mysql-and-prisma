import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {headers} from "next/headers";


export async function POST(req,res) {
    try{
        let headerList=headers();
        let email=headerList.get('email');
        let id=headerList.get('id')
        return  NextResponse.json({status:"success",data:id})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}
