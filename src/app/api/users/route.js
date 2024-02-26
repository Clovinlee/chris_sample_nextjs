import { NextResponse } from "next/server";
import {initDB, closeDB } from "@/db/init";
import User from "@/db/userSchema";

export async function GET(request) {
    await initDB();
    let rs = await User.find();
    await closeDB();
    return NextResponse.json({ message: "Hello World", output: rs }, { status: 200 });
}

export async function POST(request) {
    await initDB();
    let rs = await new User({ name: "John Doe", email: "jogn@g", password: "Zuckerberg" });
    await rs.save();
    await closeDB();
    return NextResponse.json({ message: "Hello World", output: rs }, { status: 200 });
}