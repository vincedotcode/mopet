"use client";

import { Button } from "@/components/ui/button"
import { Syringe, Stethoscope, PawPrint } from "lucide-react"

export default function VetHeroSection() {
  const handleScrollToVets = () => {
    const vetsSection = document.getElementById('vets-section')
    if (vetsSection) {
      vetsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="relative min-h-[40vh] w-full bg-bg dark:bg-darkBg overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000022_2px,transparent_2px),linear-gradient(to_bottom,#00000022_2px,transparent_2px)] dark:bg-[linear-gradient(to_right,#ffffff22_2px,transparent_2px),linear-gradient(to_bottom,#ffffff22_2px,transparent_2px)] bg-[size:40px_40px]" />
      
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
        <main className="flex flex-col gap-6 items-center md:items-start max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-black text-center md:text-left text-black dark:text-white m-0 p-0 leading-tight">
            Find Your Pet's <br />
            <span className="bg-yellow-300 dark:bg-orange-400 text-white dark:text-black px-2 -rotate-1 inline-block transform">Perfect Vet</span>
          </h1>
          <p className="text-xl text-center md:text-left text-black dark:text-white m-0 p-0 max-w-md">
            Connect with top veterinarians in your area for the best care your furry friend deserves.
          </p>

          <div className="flex gap-4 items-center flex-col sm:flex-row m-0 p-0">
            <Button 
              variant="default" 
              size="lg" 
              onClick={handleScrollToVets}
              className=" text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transform hover:-translate-y-1 transition-transform duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
              Find a Vet
            </Button>
            <Button 
              variant="neutral" 
              size="lg"
              className=" border-2 border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-purple-700 transform hover:-translate-y-1 transition-transform duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
              Emergency Services
            </Button>
          </div>
        </main>

        <div className="mt-12 md:mt-0 relative">
          <div className="w-64 h-64 bg-yellow-300 dark:bg-orange-400 rounded-full overflow-hidden border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <img 
              src="/vet.jpg?height=256&width=256" 
              alt="Veterinarian with a dog" 
              className="w-full h-full object-cover"
            />
          </div>
          <Syringe className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 w-16 h-16 text-red-500 dark:text-red-400 rotate-12" />
          <Stethoscope className="absolute bottom-0 left-0 transform translate-y-1/2 -translate-x-1/2 w-16 h-16 text-green-500 dark:text-green-400 -rotate-12" />
          <PawPrint className="absolute top-1/2 right-0 transform translate-x-1/2 w-12 h-12 text-purple-500 dark:text-purple-400" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-8 bg-white dark:bg-black transform -skew-y-2" />
    </header>
  )
}