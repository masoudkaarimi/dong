import React from "react";
import Link from "next/link";

// components
import SvgIcon from "@/components/svg-icon";

interface LogoProps {
   disabledLink?: boolean;
   mini?: boolean;
   width?: number | string;
   height?: number | string;
   css?: React.CSSProperties;
}

export default function Logo({ disabledLink = false, mini = false, width, height, css }: LogoProps) {
   const style: React.CSSProperties = { width, height, ...css };
   const logo = <SvgIcon src={"/images/logo.svg"} css={style} />;
   const logoMini = <SvgIcon src={"/images/logo-mini.svg"} css={style} />;
   const logoElement = <span className="text-indigo-500">{mini ? logoMini : logo}</span>;

   if (disabledLink) return logoElement;

   return <Link href="/">{logoElement}</Link>;
}
