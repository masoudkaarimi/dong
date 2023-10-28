import React from "react";

interface SvgIconProps {
   name?: string;
   src?: string;
   css?: React.CSSProperties;
}

export default function SvgIcon({ name, src, css }: SvgIconProps) {
   const source = src || (name ? `/icons/${name}.svg` : "");

   if (!source) {
      console.warn("Neither 'src' nor 'name' was provided to SvgIcon. It won't display any icon.");
   }

   return (
      <div
         style={{
            width: 24,
            height: 24,
            display: "flex",
            color: "currentColor",
            backgroundColor: "currentColor",
            mask: `url(${source}) no-repeat center / contain`,
            WebkitMask: `url(${source}) no-repeat center / contain`,
            ...css,
         }}
      />
   );
}
