import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Pets for Adoption Component
export default function PetsForAdoptionTab({
  petsForAdoptionData,
  adoptionRequests,
  openModal,
  setOpenModal
}: {
  petsForAdoptionData: Pet[];
  adoptionRequests: Record<string, AdoptionRequest[]>;
  openModal: string | null;
  setOpenModal: (id: string | null) => void;
}) {
  return (
    <ScrollArea className="h-[400px]">
      <div className="grid gap-4">
        {petsForAdoptionData.map((pet) => (
          <Card key={pet._id} className="flex flex-row items-center space-x-4 p-4">
            <div className="w-20 h-20">
              <img
                src={pet.images[0]} // Displaying the first image from the pet's images array
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
            <CardFooter className="ml-auto">
              <Dialog open={openModal === `pet-${pet._id}`} onOpenChange={() => setOpenModal(null)}>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => setOpenModal(`pet-${pet._id}`)}>View Requests</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Adoption Requests for {pet.name}</DialogTitle>
                    <DialogDescription>List of people who have requested to adopt {pet.name}.</DialogDescription>
                  </DialogHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adoptionRequests[pet._id]?.map((request) => (
                        <TableRow key={request._id}>
                          <TableCell>{request.adopter.firstName} {request.adopter.lastName}</TableCell>
                          <TableCell>{request.adoptionDate}</TableCell>
                          <TableCell>
                            <Badge variant={
                              request.status === "approved" ? "default" :
                              request.status === "rejected" ? "destructive" : "secondary"
                            }>
                              {request.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
