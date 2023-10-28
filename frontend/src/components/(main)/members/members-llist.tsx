"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

// types
import { Trip } from "@/types/trip";
import { Member } from "@/types/members";

// utils
import { formatDate } from "@/lib/utils";

// components
import ActionButtons from "@/components/(main)/members/action-buttons";
import { DataTable, SortableHeader } from "@/components/ui/data-table";

// mock
import { members as membersData } from "@/mock/members";

export default function MembersList({ trip }: { trip: Trip | null }) {
   const [members, setMembers] = useState<Member[] | null>(null);

   useEffect(() => {
      setMembers(membersData.filter((member) => member.trip_id === trip?.id));
   }, [trip?.id]);

   const [showMemberDeleteDialog, setShowMemberDeleteDialog] = useState(false);
   const [tripIdToDelete, setMemberIdToDelete] = useState<number | null>(null);

   const [showMemberEditDialog, setShowMemberEditDialog] = useState(false);
   const [tripToEdit, setMemberToEdit] = useState<Member | null>(null);

   const columns: ColumnDef<Member>[] = [
      {
         accessorKey: "id",
         header: ({ column }) => (
            <SortableHeader
               name="#"
               isSorted={column.getIsSorted()}
               onToggleSorting={() => column.toggleSorting(column.getIsSorted() === "asc")}
            />
         ),
         cell: ({ row }) => row.getValue("id"),
      },
      {
         accessorKey: "name",
         header: ({ column }) => (
            <SortableHeader
               name="Name"
               isSorted={column.getIsSorted()}
               onToggleSorting={() => column.toggleSorting(column.getIsSorted() === "asc")}
            />
         ),
         cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
      },
      {
         accessorKey: "created_at",
         header: ({ column }) => (
            <SortableHeader
               name="Date"
               isSorted={column.getIsSorted()}
               onToggleSorting={() => column.toggleSorting(column.getIsSorted() === "asc")}
            />
         ),
         cell: ({ row }) => formatDate(row.getValue("created_at")),
      },
      {
         id: "actions",
         header: "Actions",
         // cell: ({ row }) => (
         //    <ActionButtons
         //       members={row.original}
         //       setShowMemberDeleteDialog={setShowMemberDeleteDialog}
         //       setMemberIdToDelete={setMemberIdToDelete}
         //       setShowMemberEditDialog={setShowMemberEditDialog}
         //       setMemberToEdit={setMemberToEdit}
         //    />
         // ),
         enableHiding: false,
      },
   ];

   /* const handleDeleteMember = (id: number) => {
            const updatedMembers = trips.filter((trip) => trip.id !== id);
            setMembers(updatedMembers);
            setMemberIdToDelete(null);
            setShowMemberDeleteDialog(false);
         };

         const handleEditMember = (id: number | undefined, payload: { name?: string; members?: number }) => {
            const updatedMembers = trips.map((trip) => {
               if (trip.id === id) return { ...trip, ...payload, updated_at: Date.now() };
               return trip;
            });
            setMembers(updatedMembers);
            setMemberToEdit(null);
            setShowMemberEditDialog(false);
         };*/

   return (
      <>
         {/*<DeleteMemberDialog
               showMemberDeleteDialog={showMemberDeleteDialog}
               setShowMemberDeleteDialog={setShowMemberDeleteDialog}
               tripIdToDelete={tripIdToDelete}
               handleDeleteMember={handleDeleteMember}
            />
            <EditMemberDialog
               showMemberEditDialog={showMemberEditDialog}
               setShowMemberEditDialog={setShowMemberEditDialog}
               tripToEdit={tripToEdit}
               handleEditMember={handleEditMember}
            />*/}
         <DataTable data={members || []} columns={columns} searchColumns={["name", "id"]} />
      </>
   );
}
