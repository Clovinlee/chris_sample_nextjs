"use client";

import { Grid, Typography, TextField, Box, InputAdornment, IconButton, Stack, Paper, Button } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useEffect, useState } from "react";
import Spacer from "@/components/spacer";
import Link from "next/link";

import GitHubIcon from '@mui/icons-material/GitHub';

import {emailRules, requiredRules, lengthRules} from "@/utils/rules/index";

import { useRouter } from 'next/navigation'
import { signIn, useSession } from "next-auth/react";

// import { AuthContext } from "@/contexts/authContext";

export default function page() {
    // const { userAuth, setUserAuth } = useContext(AuthContext);

    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if(session != null && session.status == "authenticated"){
            router.replace("/")
        }
    }, [session, router]);

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    });

    const [formError, setFormError] = useState({
    emailErrorText: '',
    passwordErrorText: '',});

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    }

    const validate = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        let valid = true;

        const formRules = {'email':[
            requiredRules(formValue.email).msg,
            emailRules(formValue.email).msg,
        ],
        'password':[
            requiredRules(formValue.password).msg,
            lengthRules(formValue.password, 6).msg,
        ]};

        const formValues = Object.entries(formValue);
        const formErrors = Object.entries(formError);

        for (let indicator = 0; indicator < Object.keys(formValue).length; indicator++) {
            // 0 -> email, 1 -> name, 2 -> password, 3 -> confirmPassword
            const fName = formValues[indicator][0];

            if(!formRules.hasOwnProperty(fName) || formRules[fName].length == 0){
                continue;
            }

            const fRules = formRules[fName];
            // [possibly '', error1, error2, ]
            
            let fRulesText = fRules[0]
            for (let r of fRules){
                if(r != ''){
                    fRulesText = r;
                    break
                }
            }

            if (valid != false && !fRules.every(element => element === '')){
                valid = false;
            }
            
            const fError = formErrors[indicator][0];

            setFormError(prev => ({
                ...prev,
                [fError]: fRulesText
            }))
        }

        if(!valid){
            setIsLoading(false);
            return;   
        }

        // validation Success
        let loginResponse = await signIn("credentials",{
            redirect: false,
            email: formValue.email,
            password: formValue.password
        });

        console.log(loginResponse);

        if(loginResponse.ok){
            router.replace('/');
        }else{
            setFormError({
                ...formError,
                emailErrorText: "Invalid email or password"
            });
        }


        setIsLoading(false);


        // setFormError({
        //     ...formError,
        //     emailErrorText: "Invalid email format"
        // })

        // if(userCredential){
            // save to state
        //     const user = "" //TODO : Login (2)
        //     setIsLoading(false);
        //     router.replace('/');
        // }

        // Infinite loading if something is error.
    }

    // TODO : DEBUG MODE ONLY V
    // if(session.status == "loading"){
    //     return <h1>Please wait for a moment...</h1>
    // }

    async function githubSignIn(){
        signIn('github')
    }

    return (
        session.status != "authenticated" &&
        <main>
            <Box bgcolor="" height="100vh" display="flex" justifyContent="center" alignItems="center" sx={{ margin:{xs: 3, sm:0, }  }}>
                <Grid container justifyContent="center" alignItems="center" >
                    <Grid item xs={12} sm={6} md={4} lg={3} height="100%">
                        <Paper elevation={4} sx={{ p: 3 }}>
                            <Typography variant="h4">
                                <b>Login Form</b>
                            </Typography>
                            <Typography variant="subtitle1" fontSize="0.85rem" color="grey">
                                Enter your credential that you previously registered
                            </Typography>
                            <Stack direction='column' bgcolor="" sx={{ mt: 2 }}>
                                <Typography variant="subtitle2">Email</Typography>
                                <TextField name="email" variant="standard" placeholder="email@mail.com" type="email" helperText={formError.emailErrorText} error={formError.emailErrorText != ""} defaultValue={formValue.email} onChange={handleChange} margin="none" size="small" fullWidth={true}
                                />
                            </Stack>

                            <Spacer sy={3}/>

                            <Stack direction='column' bgcolor="">
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="subtitle2">Password</Typography>

                                    <Typography variant="subtitle2">

                                        <Link href="/register" className="text-blue-600 hover:text-blue-800" tabIndex={-1}>Forgot Password?</Link></Typography>
                                </Stack>
                                <TextField name="password" variant="standard" placeholder="********" type={showPassword ? 'text' : 'password'} error={formError.passwordErrorText != ""} helperText={formError.passwordErrorText} defaultValue={formValue.password}
                                    onChange={handleChange} margin="none" size="small" fullWidth={true}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }} />
                            </Stack>

                            <Spacer sy={3} />

                            <LoadingButton variant="contained" loading={isLoading} onClick={validate} fullWidth>Login</LoadingButton>

                            <Typography variant="subtitle2" my={1} textAlign="center">OR</Typography>
                            
                            <Button startIcon={<GitHubIcon />} variant="contained" sx={{ backgroundColor:"black",  
                            ":hover":{
                                backgroundColor: "black", color:"white",
                                }
                            }} fullWidth onClick={githubSignIn}>Sign in with Github</Button>
                            
                            <Spacer sy={4} />

                            <Typography fontSize="0.9rem">Don't have an account? <Link href="/register" className="text-blue-600 hover:text-blue-800">Register now</Link></Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </main>
    );
}


