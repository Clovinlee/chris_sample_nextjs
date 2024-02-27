import { closeDB, initDB } from "@/db/init";
import { NextResponse } from "next/server";
import Product from "@/db/productSchema";
import mongoose from "mongoose";

export async function GET(request, {params}) {
    initDB();
    let products;

    try{
        if(params.productId == "all"){
            products = await Product.find();
            return NextResponse.json(products, { status: 200 });
        }
        products = await Product.findById(params.productId);
        if(!products){
            return NextResponse.json({error:"Product not found"}, { status: 404 });
        }

        return NextResponse.json(products, { status: 200 });
    }catch(err){
        if(err.name == "CastError"){
            return NextResponse.json({ error: "Bad format, invalid ID" }, { status: 400 });
        }else{
            return NextResponse.json({error: err}, {status: 500});
        }
    }finally{
        closeDB();
    }
}

export async function DELETE(request, {params}) {
    try{
        await initDB();
        const productID = params.productId;
        const product = await Product.findById(productID);
        if(!product){
            return NextResponse.json({error:"Product not found"}, { status: 404 });
        }
        const result = await Product.deleteOne({_id:productID});
        return NextResponse.json(product, { status: 200 });
    }catch(err){
        console.log(err);
        return NextResponse.json({error:err}, { status: 500 });
    }finally{
        await closeDB();
    }

}

export async function PUT(request, {params}) {
    try{
        await initDB();
        const body = await request.json();  
        const productID = params.productId;
        
        const product = await Product.findById(productID);
        if(!product){
            return NextResponse.json({error:"Product not found"}, { status: 404 });
        }

        product.name = body.name || product.name;
        product.stock = body.stock || product.stock;
        product.description = body.description || product.description;
        product.image = body.imageUrl || product.image;
        await product.save();

        return NextResponse.json(product, { status: 200 });
    }catch(err){
        console.log(err);
        return NextResponse.json({error:err}, { status: 500 });
    }finally{
        await closeDB();
    }
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}