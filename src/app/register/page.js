'use client';

import { Grid, Typography, TextField, Box, Modal, InputAdornment, IconButton, Stack, Paper, LinearProgress } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useState, useEffect } from "react";
import Spacer from "@/components/spacer";
import { VisibilityOff, Visibility } from '@mui/icons-material';
import Link from "next/link";
import { redirect } from 'next/navigation';

import {emailRules, requiredRules, lengthRules, confirmRules} from "@/utils/rules/index";
import { register } from "@/controllers/authController";
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";

export default function page() {

    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if(session != null && session.status == "authenticated"){
            router.replace("/")
        }
    }, [session, router]);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const [formValue, setFormValue] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    });

    const [formError, setFormError] = useState({emailErrorText: '',
    nameErrorText: '',
    passwordErrorText: '',
    confirmPasswordErrorText: '',});

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

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
        'name':[
            requiredRules(formValue.name).msg,
        ],
        'password':[
            requiredRules(formValue.password).msg,
            lengthRules(formValue.password, 6).msg,
        ],
        'confirmPassword':[
            confirmRules(formValue.password, formValue.confirmPassword,"password").msg,
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
        let registerResponse = await register(formValue, setFormError);

        if(registerResponse){
            //supposedly save to state
            // const user = "" // TODO : Register (2)
            redirectPopup();

        }
        setIsLoading(false);
    }

    function redirectPopup(){
        setModalShow(true);
        setCountdown(3);

        const countInterval = setInterval(() => {
            setCountdown(prev => {
                const updatedCount = prev - 1;
                if (updatedCount === -1) { // -1 to show the 0 in the UI
                    clearInterval(countInterval);
                    setModalShow(false);
                    redirect('/');
                }
                return updatedCount;
            });
        }, 1000)

    }

    if(session.status == "loading"){
        return <h1>Please wait for a moment...</h1>
    }

    return (
        session.status != "authenticated" && <main>
            <Modal
            open={modalShow}
            onClose={() => {}} // Disable close on outside click!
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={modalStyle}>
                <Stack direction="column" justifyContent="center" alignItems="center">
                    <Typography id="modal-modal-title" variant="h6">
                        Register Successful
                    </Typography>
                    <Typography id="modal-modal-description" variant="subtitle2">
                        Redirecting you to home page in {countdown} seconds...
                    </Typography>
                    <Spacer sy={1} />
                    <Box width="100%">
                        <LinearProgress color="primary" variant="indeterminate" sx={{ height:5, borderRadius:25 }}/>
                    </Box>
                </Stack>
            </Box>
            </Modal>
            <Box bgcolor="" height="100vh" display="flex" justifyContent="center" alignItems="center" sx={{ margin:{xs: 3, sm:0, }  }}>
                <Grid container justifyContent="center" alignItems="center" >
                    <Grid item xs={12} sm={6} md={4} lg={3} height="100%">
                        <Paper elevation={4} sx={{ p: 3 }}>
                            <Typography variant="h4">
                                <b>Register Form</b>
                            </Typography>
                            <Typography variant="subtitle1" fontSize="0.85rem" color="grey">
                                Enter your credential to be registered
                            </Typography>

                            <Stack direction='column' bgcolor="" sx={{ mt: 2 }}>
                                <Typography variant="subtitle2">Email</Typography>
                                <TextField name="email" variant="standard" placeholder="email@mail.com" type="email" helperText={formError.emailErrorText} error={formError.emailErrorText != ""} defaultValue={formValue.email} onChange={handleChange} margin="none" size="small" fullWidth={true}
                                />
                            </Stack>

                            <Spacer sy={2} />

                            <Stack direction='column' bgcolor="">
                                <Typography variant="subtitle2">Full Name</Typography>
                                <TextField name="name" variant="standard" placeholder="John Smith" type="text" helperText={formError.nameErrorText} error={formError.nameErrorText != ""} defaultValue={formValue.name} onChange={handleChange} margin="none" size="small" fullWidth={true}
                                />
                            </Stack>

                            <Spacer sy={2} />

                            <Stack direction='column' bgcolor="">
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="subtitle2">Password</Typography>
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
                                                    tabIndex={-1}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }} />
                            </Stack>

                            <Spacer sy={2} />

                            <Stack direction='column' bgcolor="">
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="subtitle2">Confirm Password</Typography>
                                </Stack>
                                <TextField name="confirmPassword" variant="standard" placeholder="********" type={showConfirmPassword ? 'text' : 'password'} error={formError.confirmPasswordErrorText != ""} helperText={formError.confirmPasswordErrorText} defaultValue={formValue.confirmPassword}
                                    onChange={handleChange} margin="none" size="small" fullWidth={true}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                    tabIndex={-1}
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }} />
                            </Stack>

                            <Spacer sy={3} />

                            <LoadingButton variant="contained" loading={isLoading} onClick={validate} fullWidth>Register</LoadingButton>

                            <Spacer sy={4} />

                            <Typography fontSize="0.9rem">Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-800">Sign in</Link></Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </main>
    );
}


