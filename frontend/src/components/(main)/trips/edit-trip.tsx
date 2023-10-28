import React, { useEffect, useState } from "react";

// types
import { Trip } from "@/types/trip";

// components
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

interface EditTripDialogProps {
   showTripEditDialog: boolean;
   setShowTripEditDialog: (value: boolean) => void;
   tripToEdit: Trip | null;
   handleEditTrip: (id: number | undefined, payload: { name: string; members: number }) => void;
}

export default function EditTripDialog({
   showTripEditDialog,
   setShowTripEditDialog,
   tripToEdit,
   handleEditTrip,
}: EditTripDialogProps) {
   const [tripName, setTripName] = useState<string>("");
   const [tripMembers, setTripMembers] = useState<number>(0);

   useEffect(() => {
      if (tripToEdit) {
         setTripName(tripToEdit.name);
         setTripMembers(tripToEdit.members);
      }
   }, [tripToEdit]);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleEditTrip(tripToEdit?.id, { name: tripName, members: tripMembers });
   };

   return (
      <Dialog open={showTripEditDialog} onOpenChange={() => setShowTripEditDialog(false)}>
         <DialogContent className="">
            <DialogHeader>
               <DialogTitle>Edit Trip</DialogTitle>
               <DialogDescription>Make changes to your trip here. Click save when you are done.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 pt-4">
               <div className="flex w-full items-center space-x-2">
                  <Label htmlFor="trip-name" className={"whitespace-nowrap mr-5"}>
                     Trip Name
                  </Label>
                  <Input id="trip-name" value={tripName} onChange={(e) => setTripName(e.target.value)} />
               </div>
               <div className="flex w-full items-center space-x-2">
                  <Label htmlFor="trip-members" className={"whitespace-nowrap mr-6"}>
                     Members
                  </Label>
                  <Input
                     id="trip-members"
                     value={tripMembers}
                     onChange={(e) => setTripMembers(Number(e.target.value))}
                  />
                  <Button variant={"secondary"}>Add Member</Button>
               </div>
               {/*<FormField
                  // control={form.control}
                  name="username"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                           <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />*/}
               <DialogFooter className={"mt-4"}>
                  <Button variant={"primary"} type="submit">
                     Save changes
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}
