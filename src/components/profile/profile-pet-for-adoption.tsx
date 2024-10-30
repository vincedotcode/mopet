import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { updateAdoptionStatus } from "@/lib/actions/adoption.action"; // Import your action

export default function PetsForAdoptionTab({
  petsForAdoptionData,
  adoptionRequests,
  openModal,
  setOpenModal
}: {
  petsForAdoptionData: Pet[];
  adoptionRequests: Adoption[];
  openModal: string | null;
  setOpenModal: (id: string | null) => void;
}) {

  // Function to handle updating adoption status
  const handleUpdateStatus = async (adoptionId: string, status: "pending" | "approved" | "rejected") => {
    try {
      await updateAdoptionStatus(adoptionId, status);
      alert(`Adoption status updated to ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <ScrollArea className="h-[400px]">
      <div className="grid gap-4">
        {petsForAdoptionData.map((pet) => {
          const petAdoptionRequests = adoptionRequests.filter(
            (request) => request.pet._id === pet._id
          );

          return (
            <Card key={pet._id} className="flex flex-row items-center space-x-4 p-4">
              <div className="w-20 h-20">
                <img
                  src={pet.images[0]}
                  alt={pet.name}
                  className="object-cover rounded-md w-full h-full"
                />
              </div>
              <div className="flex-1">
                <CardHeader>
                  <CardTitle>{pet.name}</CardTitle>
                  <CardDescription>{pet.species}, {pet.age} years old</CardDescription>
                </CardHeader>
              </div>
              <CardFooter className="ml-auto max-w-full">
                <Drawer open={openModal === `pet-${pet._id}`} onOpenChange={(isOpen) => setOpenModal(isOpen ? `pet-${pet._id}` : null)}>
                  <DrawerTrigger asChild>
                    <Button className="w-full" onClick={() => setOpenModal(`pet-${pet._id}`)}>View Requests</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Adoption Requests for {pet.name}</DrawerTitle>
                      <DrawerDescription>List of people who have requested to adopt {pet.name}.</DrawerDescription>
                      <DrawerClose asChild>
                        <Button variant="noShadow">Close</Button>
                      </DrawerClose>
                    </DrawerHeader>
                    <div className="mt-4">
                      <ScrollArea className="h-[300px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Message</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {petAdoptionRequests.length ? (
                              petAdoptionRequests.map((request) => (
                                <TableRow key={request._id}>
                                  <TableCell>{request.adopter.firstName} {request.adopter.lastName}</TableCell>
                                  <TableCell>{new Date(request.adoptionDate).toLocaleDateString()}</TableCell>
                                  <TableCell>{request.adoptionReason}</TableCell>
                                  <TableCell>
                                    <Badge variant={
                                      request.status === "approved" ? "default" :
                                      request.status === "rejected" ? "destructive" : "secondary"
                                    }>
                                      {request.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="noShadow">Actions</Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleUpdateStatus(request._id, "approved")}>
                                          Approve
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleUpdateStatus(request._id, "rejected")}>
                                          Reject
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleUpdateStatus(request._id, "pending")}>
                                          Set Pending
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                  No adoption requests for this pet.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </div>
                  </DrawerContent>
                </Drawer>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
}
