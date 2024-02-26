import { closeDB, initDB } from "@/db/init";
import { NextResponse } from "next/server";
import Product from "@/db/productSchema";

export async function GET(request, {params}) {
    initDB();
    
    try {
        let products;
        if (params.productId === "all") {
            products = await Product.find();
        } else {
            products = await Product.find({ _id: params.productId });
        }
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        if(error.name == "CastError"){
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }
        return NextResponse.json({  error: error }, { status: 500 });
    } finally{
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

        product.name = body.name;
        product.stock = body.stock;
        product.description = body.description;
        product.image = body.imageUrl;
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