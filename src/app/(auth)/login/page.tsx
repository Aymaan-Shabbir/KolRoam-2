import { Metadata } from "next";
import LoginForm from "./LoginForm";
import Link from "next/link";
import SignUpForm from "../signup/SignUpForm";
import GoogleSignInButton from "./google/GoogleSignInButton";

export const metadata:Metadata = {
    title:"Login"
}

export default function Page(){
    return <main className="flex h-screen items-center justify-center p-2">
        <div className="flex h-full max-h[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
            <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
            <div className="space-y-1 text-center">
            <h1 className="text-center text-3xl font-bold">Log In</h1>

            <p className="text-muted-foreground text-center">Strengthening Bonds, <span className="italic">One message</span> at a Time.</p>
            </div>
            <div className="space-y-5">
            <GoogleSignInButton/>
            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-muted"/>
                <span>OR</span>
                <div className="h-px flex-1 bg-muted"/>
            </div>
           
        </div>
            <div className="space-y-5">
                <LoginForm/>
                <Link href="/signup" className="block text-center hover:underline">Don&apos;t have an account? Sign Up</Link>
            </div>
            </div>
            <iframe
        src="https://lottie.host/embed/74933af4-e242-44d0-981d-eb706a84a11c/aFH5Wps8YP.json"
        className="w-1/2 hidden md:block object-cover"
       
        title="SignUp Animation"
        ></iframe>
        </div>
        

    </main>
}