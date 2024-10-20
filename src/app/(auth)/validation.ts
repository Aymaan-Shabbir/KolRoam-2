"use server"
import { cookies,headers } from "next/headers";
import{redirect} from "next/navigation";
import { lucia, validateRequest } from "@/auth"

export async function logout(){
    const{session} = await validateRequest();

    if(!session){
        throw new Error("unauthorised")
    }

    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return redirect("/login");
}
