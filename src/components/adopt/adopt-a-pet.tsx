'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { createAdoption } from '@/lib/actions/adoption.action'
import { useUser } from "@/context/user-context";
import {LoadingButton} from '@/components/ui/loading-button'; // Importing the LoadingButton component

interface FullPageAdoptPetModalProps {
  pet?: Pet | null
  isOpen: boolean
  onClose: () => void
}

export default function FullPageAdoptPetModal({ pet, isOpen, onClose }: FullPageAdoptPetModalProps) {
  const user = useUser(); // Get the current logged-in user
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    adoptionReason: ''
  })
  const [isLoading, setIsLoading] = useState(false); // State for loading button

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!pet || !user) {
      console.error("Pet or user information is missing.");
      return;
    }

    const adoptionData = {
      adopter: user.id, // Use the user ID from context
      pet: pet._id, // The pet ID
      listedBy: pet.listedBy, // Add listedBy from the pet object
      adoptionReason: formData.adoptionReason,
      contactInfo: {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address
      }
    };

    try {
      setIsLoading(true); // Set loading state to true
      // Call the action to create an adoption
      await createAdoption(adoptionData);
      console.log("Adoption request submitted successfully");

      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error submitting adoption request:", error);
    } finally {
      setIsLoading(false); // Reset loading state after completion
    }
  }

  if (!pet) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md p-6">
          <div className="flex flex-col items-center justify-center">
            <p>Loading...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 mx-auto">
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
              <LoadingButton loading={isLoading} type="submit" className="w-full">
                Submit Adoption Request
              </LoadingButton>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="neutral" onClick={onClose}>Close</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
