import React from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
   return (
      <>
         {/*<CrispProvider />*/}
         {/*<ToasterProvider />*/}
         {/*<ModalProvider />*/}
         {children}
      </>
   );
}
