"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

// types
import { Trip } from "@/types/trip";

// utils
import { formatDate } from "@/lib/utils";

// components
import { DataTable, SortableHeader } from "@/components/ui/data-table";
import EditTripDialog from "@/components/(main)/trips/edit-trip";
import DeleteTripDialog from "@/components/(main)/trips/delete-trip";
import ActionButtons from "@/components/(main)/trips/action-buttons";

// mock
import { trips as data } from "@/mock/trips";

export default function TripsList() {
   const [trips, setTrips] = useState<Trip[]>(data);

   const [showTripDeleteDialog, setShowTripDeleteDialog] = useState(false);
   const [tripIdToDelete, setTripIdToDelete] = useState<number | null>(null);

   const [showTripEditDialog, setShowTripEditDialog] = useState(false);
   const [tripToEdit, setTripToEdit] = useState<Trip | null>(null);

   const columns: ColumnDef<Trip>[] = [
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
         accessorKey: "members",
         header: ({ column }) => (
            <SortableHeader
               name="Members"
               isSorted={column.getIsSorted()}
               onToggleSorting={() => column.toggleSorting(column.getIsSorted() === "asc")}
            />
         ),
         cell: ({ row }) => <div className="lowercase">{row.getValue("members")}</div>,
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
         cell: ({ row }) => (
            <ActionButtons
               trip={row.original}
               setShowTripDeleteDialog={setShowTripDeleteDialog}
               setTripIdToDelete={setTripIdToDelete}
               setShowTripEditDialog={setShowTripEditDialog}
               setTripToEdit={setTripToEdit}
            />
         ),
         enableHiding: false,
      },
   ];

   const handleDeleteTrip = (id: number) => {
      const updatedTrips = trips.filter((trip) => trip.id !== id);
      setTrips(updatedTrips);
      setTripIdToDelete(null);
      setShowTripDeleteDialog(false);
   };

   const handleEditTrip = (id: number | undefined, payload: { name?: string; members?: number }) => {
      const updatedTrips = trips.map((trip) => {
         if (trip.id === id) return { ...trip, ...payload, updated_at: Date.now() };
         return trip;
      });
      setTrips(updatedTrips);
      setTripToEdit(null);
      setShowTripEditDialog(false);
   };

   return (
      <>
         <DeleteTripDialog
            showTripDeleteDialog={showTripDeleteDialog}
            setShowTripDeleteDialog={setShowTripDeleteDialog}
            tripIdToDelete={tripIdToDelete}
            handleDeleteTrip={handleDeleteTrip}
         />
         <EditTripDialog
            showTripEditDialog={showTripEditDialog}
            setShowTripEditDialog={setShowTripEditDialog}
            tripToEdit={tripToEdit}
            handleEditTrip={handleEditTrip}
         />
         <DataTable data={trips} columns={columns} searchColumns={["name", "id"]} />
      </>
   );
}
