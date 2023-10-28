import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

// utils
import { cn } from "@/lib/utils";

// components
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

type Route = {
   label: string;
   href: string;
};

interface SidebarProps {
   routes: Route[];
}

export default function Sidebar({ routes }: SidebarProps) {
   const [isMounted, setIsMounted] = useState(false);
   const pathname = usePathname();

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) {
      return null;
   }

   return (
      <Sheet>
         <SheetTrigger>
            <Button asChild={true} variant={"ghost"} size={"icon"} className="text-slate-700 sm:hidden">
               <MenuIcon className="h-7 w-7" />
            </Button>
         </SheetTrigger>
         <SheetContent side="left" className="p-0">
            <div className="flex flex-col space-y-4 py-4 h-full bg-[#111827] text-white">
               <div className="px-3 py-2 flex-1">
                  <div className={"pl-3 pb-4 mb-5 border-b border-b-slate-800"}>
                     <Logo width={150} height={60} css={{ background: "white" }} />
                  </div>
                  {routes.map((route) => (
                     <Link key={route.href} href={route.href}>
                        <SheetClose
                           className={cn(
                              `text-sm group flex p-3 my-1 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/5 rounded-lg transition-all`,
                              pathname === route.href ? "text-white bg-white/5" : "text-zinc-400",
                           )}
                        >
                           <div className="flex items-center flex-1">{route.label}</div>
                        </SheetClose>
                     </Link>
                  ))}
               </div>
            </div>
         </SheetContent>
      </Sheet>
   );
}
