"use client";

// components
import Logo from "@/components/logo";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

const routes = [
   {
      label: "Home",
      href: "/",
   },
   {
      label: "About",
      href: "/about",
   },
   {
      label: "Contact",
      href: "/contact",
   },
];

export default function Header() {
   return (
      <header className="fixed left-3 right-3 sm:container sm:max-w-2xl">
         <div className="flex items-center justify-between rounded-md bg-white py-1 px-3 shadow-xl shadow-black/5">
            <Logo width={120} height={50} />
            <Navbar routes={routes} />
            <Sidebar routes={routes} />
         </div>
      </header>
   );
}
