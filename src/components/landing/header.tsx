import Image from "next/image";
import { Button } from '@/components/ui/button';


const Header: React.FC = () => {
  return (
    <header className="dark:bg-darkBg relative flex min-h-[80dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <main className="flex flex-col gap-8 items-center sm:items-start z-10">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Find, Adopt, and Care for Your Pet.
        </h1>
        <p className="text-lg text-center sm:text-left text-muted-foreground">
          Helping you connect with veterinarians, adopt pets, and grow your knowledge.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button variant="default" size="lg">
            Find a Pet to Adopt
          </Button>
          <Button variant="neutral" size="lg">
            Locate Nearby Vets
          </Button>
        </div>
      </main>


    </header>
  );
};

export default Header;
