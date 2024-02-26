"use client"

import { useRouter } from 'next/navigation';
import { Button, Stack, Box, Typography } from '@mui/material';


function page() {
    const router = useRouter();

    function redirectTo(){
        console.log("Redirecting...");
        router.push('/login');
    }

    async function sendRequest(){
        console.log("Sending Request...")
        const res = await fetch('/api/cookies', {
            method: 'POST',
            body: JSON.stringify({ uid: userAuth.uid }),
            // headers
            headers:{
                'Content-Type': 'application/json'
                // 'Content-Type': 'text/plain '
            }
        })
    }

    async function checkCookies(){
        const res = await fetch('/api/getCookies', {
            method: 'POST',
            // headers
            headers:{
                'Content-Type': 'application/json'
                // 'Content-Type': 'text/plain '
            }
        })

        const data = await res.json()
        console.log("Check Cookies")
        console.log(res)  
        console.log("==========")
        console.log(data)
    }



    return (
        <main>

            <Stack height="100vh" justifyContent="center" alignItems="center">
                <Stack spacing={2}> 
                    <Typography variant='h4' fontWeight="bold">
                        Current User : 
                    </Typography>
                    <Typography variant='subtitle2' maxWidth="100px">
                        No User
                    </Typography>
                </Stack>
                <br></br>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" color="primary" onClick={redirectTo}>Login</Button>
                    <Button variant="contained" color="secondary" onClick={sendRequest}>Send Request</Button>
                    <Button variant="contained" color="success" onClick={checkCookies}>Check Cookies</Button>
                </Stack>
            </Stack>
            

        </main>
    );
}

export default page;
