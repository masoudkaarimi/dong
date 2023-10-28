// components
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteTripDialogProps {
   showTripDeleteDialog: boolean;
   setShowTripDeleteDialog: (value: boolean) => void;
   tripIdToDelete: number | null;
   handleDeleteTrip: (id: number) => void;
}

export default function DeleteTripDialog({
   showTripDeleteDialog,
   setShowTripDeleteDialog,
   tripIdToDelete,
   handleDeleteTrip,
}: DeleteTripDialogProps) {
   return (
      <AlertDialog open={showTripDeleteDialog} onOpenChange={() => setShowTripDeleteDialog(false)}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be canceled. This will delete your trip forever and remove your data from our
                  servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel onClick={() => setShowTripDeleteDialog(false)}>Cancel</AlertDialogCancel>
               <AlertDialogAction
                  className={"bg-red-500 text-white hover:bg-red-500/90"}
                  onClick={() => {
                     if (tripIdToDelete !== null) {
                        handleDeleteTrip(tripIdToDelete);
                     }
                  }}
               >
                  Remove Now
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
