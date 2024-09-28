"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PawPrint, Search } from "lucide-react"

export default function AdoptPetSection() {
  const [selectedType, setSelectedType] = useState("")
  const [selectedAge, setSelectedAge] = useState("")

  const pets = [
    { id: 1, name: "Buddy", type: "Dog", age: "Young", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Whiskers", type: "Cat", age: "Adult", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Hoppy", type: "Rabbit", age: "Young", image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Goldie", type: "Fish", age: "Adult", image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <section className="py-12 border-t-border border-t-2 px-4 bg-background dark:bg-darkBg">
      <div className="container mx-auto">
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
              <Input id="location" placeholder="Enter zip code" className="border-2 border-border" />
            </div>
          </div>
          <Button className="mt-4 bg-primary hover:bg-primary-hover text-background font-bold py-2 px-4 border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
            <Search className="mr-2 h-4 w-4" /> Search Pets
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <Card key={pet.id} className="border-4 border-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-4">
                <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover mb-4 border-2 border-border" />
                <h3 className="text-xl font-bold mb-2 text-foreground">{pet.name}</h3>
                <p className="text-lg mb-2 text-foreground">{pet.type} • {pet.age}</p>
                <Button className="w-full bg-secondary hover:bg-secondary-hover text-background font-bold py-2 px-4 border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                  <PawPrint className="mr-2 h-4 w-4" /> Adopt Me
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-accent hover:bg-accent-hover text-background font-bold py-2 px-4 border-2 border-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
            View More Pets
          </Button>
        </div>
      </div>
    </section>
  )
}
