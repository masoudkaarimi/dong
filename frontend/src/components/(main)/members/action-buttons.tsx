import { useRouter } from "next/navigation";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";

// types
import { Member } from "@/types/members";

// components
import { ActionButton } from "@/components/ui/data-table";

interface ActionButtonsProps {
   member: Member;
   setShowMemberDeleteDialog: (value: boolean) => void;
   setMemberIdToDelete: (value: number | null) => void;
   setShowMemberEditDialog: (value: boolean) => void;
   setMemberToEdit: (value: Member | null) => void;
}

export default function ActionButtons({
   member,
   setShowMemberDeleteDialog,
   setMemberIdToDelete,
   setShowMemberEditDialog,
   setMemberToEdit,
}: ActionButtonsProps) {
   const router = useRouter();

   const actions = [
      {
         icon: <Trash2Icon className="h-3.5 w-3.5" />,
         color: "hover:text-red-500",
         onClick: () => {
            setMemberIdToDelete(member.id);
            setShowMemberDeleteDialog(true);
         },
      },
      {
         icon: <PencilIcon className="h-3.5 w-3.5" />,
         color: "hover:text-indigo-600",
         onClick: () => {
            setMemberToEdit(member);
            setShowMemberEditDialog(true);
         },
      },
      {
         icon: <EyeIcon className="h-3.5 w-3.5" />,
         color: "hover:text-gray-900",
         onClick: () => router.push(`/trips/${member.id}`),
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
