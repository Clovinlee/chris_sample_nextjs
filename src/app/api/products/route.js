import { NextResponse } from "next/server";
import {initDB, closeDB } from "@/db/init";
import Product from "@/db/productSchema";

export async function POST(request) {
    try{
        await initDB();
        const body = await request.json();

        const product = new Product({name: body.name, stock: body.stock, description: body.description, image: body.imageUrl});
        
        await product.save();
        return NextResponse.json(product, { status: 200 });
    }catch(err){
        console.log(err);
        return NextResponse.json({error:err}, { status: 500 });
    }finally{
        await closeDB();
    }
}