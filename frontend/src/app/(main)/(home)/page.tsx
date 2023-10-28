import { PlusIcon } from "lucide-react";

// components
import Heading from "@/components/heading";
import TripsList from "@/components/(main)/trips/trips-list";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function HomePage() {
   return (
      <>
         <Heading as={"h1"} className="text-2xl text-center my-5">
            Dong Application
         </Heading>
         <Tabs defaultValue="trips" className="w-full">
            <TabsList className={"nav-tabs"}>
               <TabsTrigger value="trips" className={"tab-item"}>
                  Trips
               </TabsTrigger>
               <TabsTrigger value="members" className={"tab-item"}>
                  Members
               </TabsTrigger>
            </TabsList>

            <TabsContent value="trips">
               <Card className={"px-5"}>
                  <CardHeader className={"px-0 py-3 border-b"}>
                     <CardTitle className={"flex items-center justify-between text-lg font-medium"}>
                        Trips
                        <Button variant={"primary"} size={"sm"}>
                           <PlusIcon className="mr-1 h-4 w-4" /> Add New
                        </Button>
                     </CardTitle>
                  </CardHeader>
                  <CardContent className={"px-0 py-3"}>
                     <TripsList />
                  </CardContent>
               </Card>
            </TabsContent>
            <TabsContent value="members">
               <Card className={"px-5"}>
                  <CardHeader className={"px-0 py-3 border-b"}>
                     <CardTitle className={"flex items-center justify-between text-lg font-medium"}>
                        Members
                        <Button variant={"primary"} size={"sm"}>
                           <PlusIcon className="mr-1 h-4 w-4" /> Add New
                        </Button>
                     </CardTitle>
                  </CardHeader>
                  <CardContent className={"px-0 py-3"}>
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </>
   );
}
