import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
    if (!credentials?.username || !credentials?.password) {
        throw new Error("CREDENTIALS_MISSING");
    }
    
    try {
        await connectToDb();
    } catch (error) {
        console.error("Database connection failed:", error);
        throw new Error("DATABASE_ERROR");
    }

    try {
        const user = await User.findOne({username: credentials.username});
        if(!user){
            throw new Error("INVALID_USERNAME");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if(!isPasswordCorrect){
            throw new Error("INVALID_PASSWORD");
        }

        return user;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export const { handlers: {GET, POST} ,
auth, signIn, signOut 
} = NextAuth({
    ...authConfig,
    providers: [
         GitHub({ clientId: process.env.GITHUB_ID,
                  clientSecret: process.env.GITHUB_SECRET }),
         CredentialsProvider({ async authorize(credentials) {
            try {
                const user = await login(credentials);
                // Return user object in the format NextAuth expects
                return {
                    id: user._id.toString(),
                    username: user.username,
                    name: user.name || user.username,
                    email: user.email,
                    image: user.img,
                    isAdmin: user.isAdmin
                };
            } catch (error) {
                console.error("Authorization error:", error.message);
                // Propagate specific error types
                throw new Error(error.message);
            }
         },
        }),           
                ],
                callbacks: {
                    async signIn({user, account, profile}) {
                        console.log( user, account, profile );
                        if (account.provider === "github") {
                            if (!profile?.email) {
                                console.error("No email provided from GitHub");
                                return false;
                            }

                            try {
                                await connectToDb();
                            } catch (error) {
                                console.error("Database connection failed:", error);
                                return false;
                            }

                            try {
                                const existingUser = await User.findOne({email: profile.email});
                                if(!existingUser){
                                    // Generate a unique username if GitHub login exists
                                    let uniqueUsername = profile.login;
                                    let counter = 1;
                                    while (await User.findOne({username: uniqueUsername})) {
                                        uniqueUsername = `${profile.login}${counter}`;
                                        counter++;
                                    }

                                    const newUser = new User({
                                        username: uniqueUsername,
                                        name: profile.name || profile.login,
                                        email: profile.email,
                                        img: profile.avatar_url,
                                    });
                                    await newUser.save();
                                    return true;
                                }
                                return true;
                            } catch(err) {
                                console.error("GitHub authentication error:", err);
                                return false;
                            }
                        }
                        return true;
                    },
                ...authConfig.callbacks,
                },
            });