import { Metadata } from "next";
import SavedFeed from "./SavedFeed";
import TrendsSidebar from "@/components/TrendsSidebar";

export const metadata:Metadata={
    title:"Saved"
}

export default function Page(){
    return <main className="flex w-full min-w-0 gap-5">
        <div className="w-full min-w-0 space-y-5 ">
            <div className="rounded-2xl bg-card shadow-sm p-5">
                <h1 className="text-center text-2xl font-bold">Saved by you</h1>
            </div>
            <SavedFeed/>
        </div>
        <TrendsSidebar/>
    </main>
}