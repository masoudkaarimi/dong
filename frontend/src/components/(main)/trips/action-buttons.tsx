import { useRouter } from "next/navigation";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";

// types
import { Trip } from "@/types/trip";

// components
import { ActionButton } from "@/components/ui/data-table";

interface ActionButtonsProps {
   trip: Trip;
   setShowTripDeleteDialog: (value: boolean) => void;
   setTripIdToDelete: (value: number | null) => void;
   setShowTripEditDialog: (value: boolean) => void;
   setTripToEdit: (value: Trip | null) => void;
}

export default function ActionButtons({
   trip,
   setShowTripDeleteDialog,
   setTripIdToDelete,
   setShowTripEditDialog,
   setTripToEdit,
}: ActionButtonsProps) {
   const router = useRouter();

   const actions = [
      {
         icon: <Trash2Icon className="h-3.5 w-3.5" />,
         color: "hover:text-red-500",
         onClick: () => {
            setTripIdToDelete(trip.id);
            setShowTripDeleteDialog(true);
         },
      },
      {
         icon: <PencilIcon className="h-3.5 w-3.5" />,
         color: "hover:text-indigo-600",
         onClick: () => {
            setTripToEdit(trip);
            setShowTripEditDialog(true);
         },
      },
      {
         icon: <EyeIcon className="h-3.5 w-3.5" />,
         color: "hover:text-gray-900",
         onClick: () => router.push(`/trips/${trip.id}`),
      },
   ];

   return (
      <div className={"flex items-center gap-x-0.5 text-gray-500"}>
         {actions.map((action, index) => (
            <ActionButton key={index} icon={action.icon} color={action.color} onClick={action.onClick} />
         ))}
      </div>
   );
}
