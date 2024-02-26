"use server";

import { NextResponse } from "next/server";
import { cookies } from 'next/headers'



// Save cookies
export async function POST(request) {
  // console.log(req)
  // .pathname -> '/api/cookies',
  // .searchParams -> URLSearchParams { 'aa' => '1', 'bb' => '2', 'cc' => '3' },
  // .cookies -> ...

  const body = await request.json();

  for (let arr of Object.entries(body)){
    if(arr[1] == null || arr[1] == ""){
      cookies().delete(arr[0])
    }else{
      cookies().set(arr[0], arr[1], {secure: true})
    }
  }

  return NextResponse.json({status: 200});
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