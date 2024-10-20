import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";
import Image from "next/image";
import KolLogo from "@/assets/kskcjc01.svg"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex  w-full max-w-7xl items-center justify-center gap-2 px-2 ">

        
<Link href="/" className="text-2xl font-bold text-primary">
  
    <Image src={KolLogo} alt="KolRoam Logo" width={90} height={100} className="filter invert-0 dark:invert"/>
  
</Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}