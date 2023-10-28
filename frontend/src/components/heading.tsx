import React from "react";

interface HeadingProps {
   as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
   className?: string | null;
   children: React.ReactNode;
}

export default function Heading({ as = "h1", className, children }: HeadingProps) {
   const TagName = as as keyof JSX.IntrinsicElements;
   return (
      <TagName className={`pb-2 font-semibold text-slate-800 border-b ${as} ${className ? className : ""}`.trim()}>
         {children}
      </TagName>
   );
}
