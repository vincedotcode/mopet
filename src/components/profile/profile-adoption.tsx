import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Adoptions Component
export default function AdoptionsTab({ adoptionsData }: { adoptionsData: any[] }) {
  return (
    <ScrollArea className="h-[400px]">
      <div className="grid gap-4">
        {adoptionsData.map((adoption) => (
          <Card key={adoption._id} className="flex flex-row items-center space-x-4 p-4">
            <div className="w-20 h-20">
              <img
                src={adoption.pet.images[0]} // Displaying the first image from the pet's images array
                alt={adoption.pet.name}
                className="object-cover rounded-md w-full h-full"
              />
            </div>
            <div className="flex-1">
              <CardHeader>
                <CardTitle>{adoption.pet.name}</CardTitle>
                <CardDescription>{adoption.pet.species}</CardDescription>
                <p className="mt-2">Adoption Date: {adoption.adoptionDate}</p>
                <div>
                  <Badge variant={adoption.status === "approved" ? "default" : "secondary"}>
                    {adoption.status}
                  </Badge>
                </div>
              </CardHeader>
            </div>
            <CardFooter className="ml-auto">
              <Button variant="destructive" className="w-full">Cancel Adoption</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
