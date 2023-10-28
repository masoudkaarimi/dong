import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "lucide-react";

interface BreadcrumbProps {
   items: {
      title?: string;
      link?: string;
   }[];
}


export function Breadcrumb({ items }: BreadcrumbProps) {
   return (
      <>
         {/*pb-2 border-b border-slate-200*/}
         <ol className="breadcrumb">
            <li className="breadcrumb-item">
               <Link
                  href="/"
                  className="breadcrumb-link"
               >
                  <HomeIcon className="w-3.5 h-3.5" />
                  Home
               </Link>
            </li>
            {items.map((item, index) => {
               const { title, link = null } = item;
               return link ? (
                  <li key={index} className="breadcrumb-item">
                     <ChevronRightIcon className="w-3 text-slate-600" />
                     <Link
                        href={link}
                        className="breadcrumb-link"
                     >
                        {title}
                     </Link>
                  </li>
               ) : (
                  <li key={index} className="breadcrumb-item">
                     <ChevronRightIcon className="w-3 text-slate-600" />
                     <span className="breadcrumb-link disabled">{title}</span>
                  </li>
               );
            })}
         </ol>
      </>
   );
}
