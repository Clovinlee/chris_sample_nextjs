'use client'

import {Typography, Box, Button, Stack } from "@mui/material";

import { useRouter } from 'next/navigation';
import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Spacer from "@/components/spacer";
import { signOut } from "next-auth/react";


export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession()
  // session STATUS
  // undefined = fetching
  // null = not found
  // not null = fetched

  useEffect(() => {
    if(session == null && status == "unauthenticated"){
      router.replace("/login")
    }
  }, [status, router]);

  const [isLoadingSignout, setIsLoadingSignout] = useState(false);

  async function handleSignout(){
    setIsLoadingSignout(true);
    await signOut({redirect: false});
    router.replace("/login");
    setIsLoadingSignout(true);
  }

  if(status == "loading"){
    return <h1>Please wait for a moment...</h1>
}

  return (
    status == "authenticated" &&
    <main>
        <Typography variant="h3">Welcome</Typography>
        <Typography variant="subtitle1">{status == "authenticated" ? JSON.stringify(session.user) : "Getting name..."}</Typography>
        <Spacer sy={3}></Spacer>
        <Typography variant="subtitle2">Hello2</Typography>
        <LoadingButton loading={isLoadingSignout} onClick={handleSignout} color="error" variant="contained">Logout</LoadingButton>
    </main>
  );
}

