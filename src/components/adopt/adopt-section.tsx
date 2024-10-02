'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PawPrint, Search, Undo } from 'lucide-react';
import Link from 'next/link';
import { getAllPets } from '@/lib/actions/pet.actions';
import { mauritiusLocations } from '@/lib/utils';
import AddAdoption from '@/components/adopt/add-adopt';
import FullPageAdoptPetModal from '@/components/adopt/adopt-a-pet';




export default function AdoptPetSection() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [location, setLocation] = useState('');
  const [pets, setPets] = useState<Pet[]>([]); // Use the Pet type here
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]); // For filtered results
  const [noData, setNoData] = useState(false); // For no results message
  const [visiblePets, setVisiblePets] = useState(12); // Number of pets visible at a time
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null); // Store the selected pet

  // Fetch pets when the component mounts
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await getAllPets();
        setPets(petsData);
        setFilteredPets(petsData); // Initialize filteredPets with all pets
      } catch (error) {
        console.error('Failed to fetch pets:', error);
      }
    };

    fetchPets();
  }, []);

  const handleSearch = () => {
    const filtered = pets.filter(pet => {
      return (
        (selectedType === '' || pet.species === selectedType) &&
        (selectedAge === '' || pet.age === selectedAge) &&
        (location === '' || pet.location.includes(location))
      );
    });

    if (filtered.length === 0) {
      setNoData(true);
    } else {
      setNoData(false);
    }

    setFilteredPets(filtered);
    setVisiblePets(12); // Reset visible pets to 12 on each new search
  };

  const resetSearch = () => {
    setSelectedType('');
    setSelectedAge('');
    setLocation('');
    setFilteredPets(pets);
    setNoData(false);
    setVisiblePets(12); // Reset visible pets to 12
  };

  // Load more pets when "View More Pets" is clicked
  const handleViewMore = () => {
    setVisiblePets((prev) => prev + 12); // Increase visible pets by 12
  };

  const handleOpenModal = (pet: Pet) => {
    setSelectedPet(pet); // Store the selected pet
    setIsModalOpen(true); // Open the modal
  };

  return (
    <section className="py-12 border-t-border border-t-2 px-4 bg-background dark:bg-darkBg">
      <div className="container mx-auto">
        <AddAdoption />
        <h2 className="text-4xl font-bold mb-8 text-center text-foreground">Adopt a Pet</h2>

        <div className="mb-8 p-6 bg-card dark:bg-darkCard border-4 border-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Find Your Perfect Companion</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pet-type" className="text-lg font-bold text-foreground">Pet Type</Label>
              <Select onValueChange={setSelectedType} value={selectedType}>
                <SelectTrigger id="pet-type" className="w-full border-2 border-border">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="rabbit">Rabbit</SelectItem>
                  <SelectItem value="fish">Fish</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="pet-age" className="text-lg font-bold text-foreground">Pet Age</Label>
              <Select onValueChange={setSelectedAge} value={selectedAge}>
                <SelectTrigger id="pet-age" className="w-full border-2 border-border">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="young">Young</SelectItem>
                  <SelectItem value="adult">Adult</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location" className="text-lg font-bold text-foreground">Location</Label>
              <Select onValueChange={(value) => setLocation(value)}>
                <SelectTrigger id="pet-location">
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
          </div>
          <Button
            onClick={handleSearch}
            className="mt-4 bg-primary hover:bg-primary-hover text-background font-bold py-2 px-4 border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            <Search className="mr-2 h-4 w-4" /> Search Pets
          </Button>
          <Button
            onClick={resetSearch} variant="default" className='py-2 mx-4' >
            <Undo className="mr-2 h-4 w-4" /> Reset Search
          </Button>
        </div>

        {noData ? (
          <div className="p-6 mt-6 bg-card dark:bg-darkCard border-4 border-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">No Pets Found</h2>
            <p className="text-lg text-foreground">It looks like there are no pets available matching your search criteria. Please try again with different filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="pets">
            {filteredPets.slice(0, visiblePets).map((pet) => (
              <Card key={pet._id} className="border-4 border-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-4">
                  <img
                    src={pet.images?.[0] || '/placeholder.svg?height=200&width=200'}
                    alt={pet.name}
                    className="w-full h-48 object-cover mb-4 border-2 border-border"
                  />
                  <h3 className="text-xl font-bold mb-2 text-foreground">{pet.name}</h3>
                  <p className="text-lg mb-2 text-foreground">
                    {pet.species} • {pet.age}
                  </p>
                  <Button
                    className="w-full bg-secondary hover:bg-secondary-hover text-background font-bold py-2 px-4 border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                    onClick={() => handleOpenModal(pet)} // Pass the current pet to the modal function
                  >
                    <PawPrint className="mr-2 h-4 w-4" /> Adopt Me
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!noData && filteredPets.length > visiblePets && (
          <div className="mt-8 text-center">
            <Button
              onClick={handleViewMore}
              className="bg-accent hover:bg-accent-hover text-background font-bold py-2 px-4 border-2 border-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              View More Pets
            </Button>
          </div>
        )}
      </div>
      <FullPageAdoptPetModal
  pet={selectedPet} // Use `undefined` if selectedPet is null
  isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
