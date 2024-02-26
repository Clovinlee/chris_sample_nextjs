"use server";

import { NextResponse } from "next/server";
import { cookies } from 'next/headers'



// Save cookies
export async function POST(request) {

  return NextResponse.json({"msg":cookies().getAll()});

}

