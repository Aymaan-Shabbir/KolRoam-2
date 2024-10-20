
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "../(main)/SessionProvider";
import Navbar from "../(main)/Navbar";
import MenuBar from "../(main)/MenuBar";



export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar/>
        <div className="max-w-7xl mx-auto p-5 flex w-full grow gap-5">
          <MenuBar className="sticky top-[6rem] h-fit hidden sm:block flex-none space-y-3 rounded-xl bg-card px-3 py-5 lg:px-5 shadow-sm xl:w-80"/>
          {children}</div>
          <MenuBar className="sticky bottom-0 w-full flex justify-center gap-3 border-t bg-card p-3 sm:hidden"/>
        </div>
    </SessionProvider>
  );
}
