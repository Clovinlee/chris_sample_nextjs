"use server";

import { NextResponse } from "next/server";
import {initDB, closeDB } from "@/db/init";
import User from "@/db/userSchema";
import bcrypt from 'bcrypt';

// Save cookies
export async function POST(request) {
 
    const body = await request.json();

    await initDB();
    let emailExist = await User.findOne({ email: body.email });

    if(emailExist){
        return NextResponse.json({ error: "email-used" }, { status: 409 });
    }

    let userNew;
    try {

        const hashedPassword = await bcrypt.hash(body.password, 10);
        userNew = await User({ name: body.name, email: body.email, password: hashedPassword });

        await userNew.save();

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }

    await closeDB();

    return NextResponse.json({ message: "User created successfully", user: userNew}, { status: 200 });
  }

  // Initialize an empty object to store key-value pairs
  // const formDataObject = {};
  // for (const key of body.keys()) {
  //   // Get the value associated with the current key
  //   const value = body.get(key);

  //   // Store the key-value pair in the formDataObject
  //   formDataObject[key] = value;
  // }

  // for (const key of body.keys()){ |or| const value of body.values() works
  //   console.log(key)
  // }

  // Return the object containing all key-value pairs
  // return NextResponse.json(formDataObject);