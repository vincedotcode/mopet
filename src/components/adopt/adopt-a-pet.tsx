'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface FullPageAdoptPetModalProps {
  pet?: Pet | null
  isOpen: boolean
  onClose: () => void
}

export default function FullPageAdoptPetModal({ pet, isOpen, onClose }: FullPageAdoptPetModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    adoptionReason: ''
  })

  const nextImage = () => {
    if (pet) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pet.images.length)
    }
  }

  const prevImage = () => {
    if (pet) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + pet.images.length) % pet.images.length)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    onClose()
  }

  if (!pet) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-full h-screen p-0 m-0">
          <div className="flex flex-col items-center justify-center h-full">
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-4 w-48" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-screen p-0 m-0 max-w-full overflow-hidden">
        <div className="w-full h-full flex flex-col">
          <Card className="w-full h-full flex flex-col">
            {/* Header */}
            <CardHeader className="pb-0">
              <CardTitle className="text-3xl font-bold">{pet.name}</CardTitle>
              <CardDescription>{pet.breed} • {pet.age} • {pet.gender}</CardDescription>
            </CardHeader>

            {/* Scrollable Content */}
            <CardContent className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col lg:flex-row lg:space-x-6 h-full">
                {/* Left side: Image Carousel and Details */}
                <div className="lg:w-2/3">
                  {/* Image Carousel */}
                  <div className="relative aspect-video w-full mb-6">
                    <img
                      src={pet.images[currentImageIndex]}
                      alt={`${pet.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button
                      variant="default"
                      size="icon"
                      className="absolute top-1/2 left-2 transform -translate-y-1/2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      className="absolute top-1/2 right-2 transform -translate-y-1/2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-sm text-muted-foreground">Age</h3>
                          <p>{pet.age}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-muted-foreground">Breed</h3>
                          <p>{pet.breed}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-muted-foreground">Gender</h3>
                          <p>{pet.gender}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-muted-foreground">Location</h3>
                          <p>{pet.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right side: Adoption Form */}
                <div className="lg:w-1/3 mt-6 lg:mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Adopt {pet.name}</CardTitle>
                      <CardDescription>Fill out this form to submit an adoption request</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber">Phone Number</Label>
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="adoptionReason">Why do you want to adopt {pet.name}?</Label>
                          <Textarea
                            id="adoptionReason"
                            name="adoptionReason"
                            value={formData.adoptionReason}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">Submit Adoption Request</Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex justify-between">
              <Button variant="neutral" onClick={onClose}>Cancel</Button>
              <Button variant="default" onClick={onClose}>Close</Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
