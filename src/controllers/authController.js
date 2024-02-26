const endpointRegister = '/api/register';
const endpointLogin = '/api/login';

async function register(formData, setFormError){
    let userCredential;
    const response = await fetch(endpointRegister, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    let responseJson = await response.json();

    if(response.ok){
        userCredential = responseJson.user;
    }else{
        userCredential = false;
        const error = responseJson.error;
        setFormError(prev => ({
            ...prev,
            ["emailErrorText"]: error === "email-used" ? "Email is already in use" : "Error registering user, please contact admin"
        }))
    }

    return userCredential;
}

// async function login(formData, setFormError = ""){
//     let userCredential;
//     const response = await fetch(endpointRegister, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//     });

//     let responseJson = response.json();

//     return responseJson;
// }

export { register };