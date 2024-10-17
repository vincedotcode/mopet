'use client'

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, X, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { mauritiusLocations } from '@/lib/utils';
import { createVet, getAllVets, deleteVet } from '@/lib/actions/vet.actions';
import { useToast } from "@/hooks/use-toast";
// Dynamically import the Map component without SSR
const Map = dynamic(() => import('@/components/map'), { ssr: false });

interface Vet {
  _id: string;
  name: string;
  address: string;
  location: { lat: number; lng: number };
  locationName: string;
  email: string;
  phoneNumber: string;
  openingHours?: string;
  website?: string;
  services?: string[];
}

type CreateVetParams = Omit<Vet, '_id'>;

export default function VetsTab() {
  const [newVet, setNewVet] = useState<CreateVetParams>({
    name: "",
    address: "",
    location: { lat: 0, lng: 0 },
    locationName: "",
    email: "",
    phoneNumber: "",
    openingHours: "",
    website: "",
    services: [],
  });
  const [currentService, setCurrentService] = useState("");
  const [vets, setVets] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVet, setSelectedVet] = useState<Vet | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchVets() {
      try {
        setLoading(true);
        const fetchedVets = await getAllVets();
        setVets(fetchedVets || []);
      } catch (error) {
        console.error("Failed to fetch vets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVets();
  }, []);

  const handleAddVet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdVet = await createVet(newVet);
      setVets([...vets, createdVet]);
      setNewVet({
        name: "",
        address: "",
        location: { lat: 0, lng: 0 },
        locationName: "",
        email: "",
        phoneNumber: "",
        openingHours: "",
        website: "",
        services: [],
      });
    } catch (error) {
      console.error("Error adding vet:", error);
    }
  };

  const handleDeleteVet = async () => {
    if (!selectedVet) return;
    try {
      await deleteVet(selectedVet._id);
      setVets(vets.filter((vet) => vet._id !== selectedVet._id));
      setSelectedVet(null);
      toast({
        title: "Success",
        description: `Veterinarian ${selectedVet.name} has been deleted.`,
      });
    } catch (error) {
      console.error("Error deleting vet:", error);
      toast({
        title: "Error",
        description: `An error occurred while deleting ${selectedVet.name}.`,
      });
    }
  };


  const handleAddService = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentService.trim() !== '') {
      e.preventDefault();
      setNewVet(prev => ({
        ...prev,
        services: [...(prev.services || []), currentService.trim()]
      }));
      setCurrentService('');
    }
  };

  const handleRemoveService = (serviceToRemove: string) => {
    setNewVet(prev => ({
      ...prev,
      services: prev.services?.filter(service => service !== serviceToRemove) || []
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Add New Vet</CardTitle>
          <CardDescription>Enter the details of the new veterinarian.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddVet} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vet-name">Name</Label>
              <Input
                id="vet-name"
                placeholder="Dr. Jane Doe"
                value={newVet.name}
                onChange={(e) => setNewVet({ ...newVet, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vet-address">Address</Label>
              <Input
                id="vet-address"
                placeholder="Vet Address"
                value={newVet.address}
                onChange={(e) => setNewVet({ ...newVet, address: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vet-email">Email</Label>
              <Input
                id="vet-email"
                type="email"
                placeholder="Email"
                value={newVet.email}
                onChange={(e) => setNewVet({ ...newVet, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vet-phoneNumber">Phone Number</Label>
              <Input
                id="vet-phoneNumber"
                placeholder="Phone Number"
                value={newVet.phoneNumber}
                onChange={(e) => setNewVet({ ...newVet, phoneNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vet-openingHours">Opening Hours</Label>
              <Input
                id="vet-openingHours"
                placeholder="e.g., Mon-Fri: 8am-5pm"
                value={newVet.openingHours}
                onChange={(e) => setNewVet({ ...newVet, openingHours: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vet-website">Website</Label>
              <Input
                id="vet-website"
                type="url"
                placeholder="https://www.example.com"
                value={newVet.website}
                onChange={(e) => setNewVet({ ...newVet, website: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vet-services">Services</Label>
              <Input
                id="vet-services"
                placeholder="Add a service and press Enter"
                value={currentService}
                onChange={(e) => setCurrentService(e.target.value)}
                onKeyDown={handleAddService}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {newVet.services?.map((service, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {service}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveService(service)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="location" className="text-lg font-bold text-foreground">Location</Label>
              <Select onValueChange={(value) => setNewVet({ ...newVet, locationName: value })} required>
                <SelectTrigger id="vet-location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {mauritiusLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link">Select Location on Map</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Vet Location</DialogTitle>
                </DialogHeader>
                <Map setLocation={(coords: [number, number]) => setNewVet({ ...newVet, location: { lat: coords[0], lng: coords[1] } })} />
              </DialogContent>
            </Dialog>
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Vet
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registered Vets</CardTitle>
          <CardDescription>A list of all veterinarians registered on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          {vets && vets.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vets.map((vet) => (
                  <TableRow key={vet._id}>
                    <TableCell>{vet.name}</TableCell>
                    <TableCell>{vet.locationName}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {vet.services?.map((service, index) => (
                          <Badge key={index} variant="secondary">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            onClick={() => setSelectedVet(vet)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete {vet.name}?</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete {vet.name}? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="neutral" onClick={() => setSelectedVet(null)}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteVet}>
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No vets have been added at the moment.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}