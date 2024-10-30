"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdoptionsTab from "@/components/profile/profile-adoption";
import PetsForAdoptionTab from "@/components/profile/profile-pet-for-adoption";
import DonationsTab from "@/components/profile/profile-donation";
import { getAdoptionByAdopterId, getAllAdoptions } from "@/lib/actions/adoption.action";
import { getPetsByUserId } from "@/lib/actions/pet.actions";
import { useUser } from "@/context/user-context";

export default function ProfilePage() {
  const user = useUser(); // Assuming this gives us the logged-in user
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [adoptionsData, setAdoptionsData] = useState<Adoption[]>([]);
  const [petsForAdoptionData, setPetsForAdoptionData] = useState<Pet[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const adoptions = await getAdoptionByAdopterId(user?.id);
      setAdoptionsData(adoptions);

      const pets = await getPetsByUserId(user.id);
      setPetsForAdoptionData(pets);

      const allAdoptions = await getAllAdoptions();

      const petIds = pets.map((pet: Pet) => pet._id);
      const filteredAdoptionRequests = allAdoptions.filter(
        (adoption: Adoption) => petIds.includes(adoption.pet._id)
      );

      setAdoptionRequests(filteredAdoptionRequests);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
              <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{user?.firstName} {user?.lastName}</CardTitle>
              <CardDescription className="text-xl">Pet Lover & Adopter</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="adoptions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="adoptions">Adoptions</TabsTrigger>
          <TabsTrigger value="petsForAdoption">Pets for Adoption</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
        </TabsList>

        <TabsContent value="adoptions">
          <AdoptionsTab adoptionsData={adoptionsData} />
        </TabsContent>

        <TabsContent value="petsForAdoption">
          <PetsForAdoptionTab
            petsForAdoptionData={petsForAdoptionData}
            adoptionRequests={adoptionRequests}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </TabsContent>

        <TabsContent value="donations">
          <DonationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
