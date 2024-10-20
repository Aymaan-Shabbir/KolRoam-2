import { Metadata } from "next"
import Image from "next/image"
import signUpImage from "@/assets/signup_image.gif"
import Link from "next/link";
import SignUpForm from "./SignUpForm";
import GoogleSignInButton from "../login/google/GoogleSignInButton";



export const metadata:Metadata={
    title:"Sign Up"
}

export default function Page(){
    return(
    <main className="flex h-screen items-center justify-center ">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-3 md:w-1/2">
        <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold mt-2">Sign Up</h1>
            <p className="text-muted-foreground">Bridge the Gap, <span className="italic">One message</span> at a Time.</p>
        </div>
        <div className="space-y-5">
           
            <SignUpForm/>
            <Link href="/login" className="block text-center hover:underline">
            Already have an account? Log in
            </Link>
        </div>
        </div>
        <iframe
        src="https://lottie.host/embed/d67247d6-14ab-410a-be8a-98b0b3193ea7/sdHeNTWE19.json"
        className="w-1/2 hidden md:block object-cover"
       
        title="SignUp Animation"
        ></iframe>

        </div>
    </main>
    );
}