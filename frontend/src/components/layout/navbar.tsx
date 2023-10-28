import Link from "next/link";
import { usePathname } from "next/navigation";

// utils
import { cn } from "@/lib/utils";

type Route = {
   label: string;
   href: string;
};

interface NavbarProps {
   routes: Route[];
}

export default function Navbar({ routes }: NavbarProps) {
   const pathname = usePathname();

   return (
      <nav className="mx-auto hidden sm:flex">
         <ul className="flex items-center gap-1">
            {routes.map((route) => (
               <li key={route.href}>
                  <Link
                     href={route.href}
                     className={cn(
                        "text-sm font-medium px-3 py-2 rounded hover:bg-slate-50 transition-all",
                        pathname === route.href ? "font-bold bg-indigo-50 text-indigo-500" : "text-slate-700",
                     )}
                  >
                     {route.label}
                  </Link>
               </li>
            ))}
         </ul>
      </nav>
   );
}
