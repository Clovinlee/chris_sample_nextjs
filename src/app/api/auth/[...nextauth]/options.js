import { Account, User as AuthUser } from "next-auth"; 
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { closeDB, initDB } from "@/db/init";
import User from "@/db/userSchema";
import bcrypt from 'bcrypt';

const options = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials:{
                email: {
                    label: "Email",
                    type:"email"
                },
                password: {
                    label: "Password",
                    type:"password"
                },
            },
            async authorize(credentials){
                await initDB();
                const user = await User.findOne({email: credentials.email});
                if(user){
                    const isPassword = await bcrypt.compare(credentials.password, user.password);
                    if(isPassword){
                        closeDB();
                        return user;
                    }
                }
                closeDB();
                return null;
            }
        })
    ],
    callbacks: {
        async signIn({user, account}){
            if(account.provider == "credentials"){
                return true;
            }
            if(account.provider == "github"){
                await initDB();
                console.log("GITHUB INIT LOGIN")
                try {
                    const existUser = await User.findOne({email: user.email});
                    // insert data to DB
                    if(!existUser){
                        console.log("Exist User :",user)
                        const newUser = new User({
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        });

                        await newUser.save();
                    }

                    return true;
                } catch (error) {
                    console.log("Error login from github : ",error)
                    return false;
                }
            }

            return true;
        },

        jwt: async({user,token, account}) => {
            // Token user only called once on login success
            // it return full user object
            // {
            // _id: new ObjectId('65d6be731f015bb9d433ef32'),
            // name: 'alan',
            // email: 'a@g.co',
            // password: '$2b$10$7/HWWEJfG/Nxh2ICaNcJMOLKV75pApmT4ooNIGIDJVpTXN3pdWFV6',
            // role: 'user',
            // __v: 0
            // }

            // account return only once at first sign in
            // account : {
            // providerAccountId: '65d6b75b1f015bb9d433ef2a',
            // type: 'credentials',
            // provider: 'credentials'
            // }
            
            // the rest run, it return user token
            //  {
            //     name: 'alan',
            //     email: 'a@g.co',
            //     picture: undefined,
            //     sub: '65d6be731f015bb9d433ef32'
            //     # or whatever added to the token
            //   }

            if(user){
                token.uid = user.id
                token.role = user.role;
            }

            return token;
        },

        session: async({session, user, token}) => {
            // token is taken from jwt callback above
            // user always return undefined..

            if(session){
                session.user.role = token.role;
            }
          
            return session;
        },
    },
    pages:{
        signIn: '/login',
        signUp: '/register',
        error: '/login',
        verifyRequest: '/verify',
        newUser: '/',  
    },
    session: {
        strategy: "jwt",
    },
    strategy: "jwt",
    secret: process.env.NEXTAUTH_SECRET,
    database: process.env.DATABASE_URL,
}

export default  options;