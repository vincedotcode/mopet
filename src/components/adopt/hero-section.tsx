"use client";  // Ensure this is a client-side component


import { Button } from '@/components/ui/button';

const AdoptPetBanner: React.FC = () => {

  const handleScrollToPets = () => {
    const petsSection = document.getElementById('pets');
    if (petsSection) {
      petsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <header className="dark:bg-darkBg relative flex min-h-[40vh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] p-0 m-0">
      <main className="flex flex-col gap-4 items-center sm:items-start z-10 p-0 m-0">
        <h1 className="text-3xl font-bold text-center sm:text-left m-0 p-0">
          Adopt a Pet
        </h1>
        <p className="text-lg text-center sm:text-left text-muted-foreground m-0 p-0">
          Browse pets available for adoption and find your new best friend.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row m-0 p-0">
         <Button variant="default" size="lg" onClick={handleScrollToPets}>
            View Available Pets
          </Button>
          <Button variant="neutral" size="lg">
            Learn About Adoption Process
          </Button>
        </div>
      </main>
    </header>
  );
};

export default AdoptPetBanner;
