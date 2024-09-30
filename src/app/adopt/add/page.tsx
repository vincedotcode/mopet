'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { addPet } from '@/lib/actions/pet.actions'
import { useUser } from "@/context/user-context";
import { LoadingButton } from '@/components/ui/loading-button'
import { mauritiusLocations } from '@/lib/utils'

const petSchema = z.object({
  name: z.string().min(1, "Pet name is required"),
  age: z.string().min(1, "Age is required"),
  species: z.string().min(1, "Pet type is required"),
  breed: z.string().min(1, "Breed is required"),
  gender: z.string().min(1, "Gender is required"),
  healthStatus: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  listedBy: z.string(),
  isNeutered: z.boolean().optional(),
  isVaccinated: z.boolean().optional(),
  location: z.string().min(1, "Location is required"),
})

type PetFormValues = z.infer<typeof petSchema>

export default function PutPetForAdoption() {
  const router = useRouter()
  const { toast } = useToast()
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const user = useUser();

  const form = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: '',
      age: 'young',
      species: '',
      breed: '',
      gender: '',
      description: '',
      images: [],
      listedBy: user.id,
      location: '',
    },
  })

  // Helper function to resize image to 500x500 and convert to base64
  const resizeImage = (file: File, maxWidth = 500, maxHeight = 500): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const reader = new FileReader()

      reader.onload = function (e) {
        img.src = e.target?.result as string
      }

      img.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let width = img.width
        let height = img.height

        // Maintain aspect ratio while resizing
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        ctx?.drawImage(img, 0, 0, width, height)

        const dataUrl = canvas.toDataURL('image/jpeg')
        resolve(dataUrl)
      }

      reader.readAsDataURL(file)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = await Promise.all(
        Array.from(files).map(file => resizeImage(file))
      )
      setImages(prev => [...prev, ...newImages])
      form.setValue('images', [...form.getValues('images'), ...newImages])
    }
  }

  const handleDeleteImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    form.setValue('images', form.getValues('images').filter((_, i) => i !== index))
  }

  const onSubmit = async (data: PetFormValues) => {
    setIsLoading(true)
    try {
      await addPet(data)
      toast({
        title: "Success",
        description: "Pet successfully added for adoption!",
      })
      router.push('/adopt')
      setIsLoading(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add pet. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Button
        variant="default"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Put a Pet for Adoption</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pet-name">Pet Name</Label>
                <Input id="pet-name" {...form.register('name')} placeholder="Enter pet's name" />
                {form.formState.errors.name && (
                  <p className="text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pet-type">Pet Type</Label>
                <Select onValueChange={(value) => {
                  form.setValue('species', value)
                  form.clearErrors('species') // Clear the error when a valid option is selected
                }}>
                  <SelectTrigger id="pet-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="rabbit">Rabbit</SelectItem>
                    <SelectItem value="bird">Bird</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.species && (
                  <p className="text-red-500">{form.formState.errors.species.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pet-age">Age</Label>
                <Select onValueChange={(value) => {
                  form.setValue('age', value)
                  form.clearErrors('age') // Clear the error when a valid option is selected
                }}>
                  <SelectTrigger id="pet-age">
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="young">Young</SelectItem>
                    <SelectItem value="middle">Middle</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.age && (
                  <p className="text-red-500">{form.formState.errors.age.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pet-gender">Gender</Label>
                <Select onValueChange={(value) => {
                  form.setValue('gender', value)
                  form.clearErrors('gender') // Clear the error when a valid option is selected
                }}>
                  <SelectTrigger id="pet-gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.gender && (
                  <p className="text-red-500">{form.formState.errors.gender.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pet-breed">Breed</Label>
                <Input id="pet-breed" {...form.register('breed')} placeholder="Enter breed" />
                {form.formState.errors.breed && (
                  <p className="text-red-500">{form.formState.errors.breed.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pet-location">Location</Label>
                <Select onValueChange={(value) => {
                  form.setValue('location', value)
                  form.clearErrors('location') // Clear the error when a valid option is selected
                }}>
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
                {form.formState.errors.location && (
                  <p className="text-red-500">{form.formState.errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pet-description">Description</Label>
              <Textarea
                id="pet-description"
                {...form.register('description')}
                placeholder="Tell us about your pet's personality, habits, and why they need a new home"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pet-images" className="text-lg font-bold text-black dark:text-white">Upload Images</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="pet-images"
                  className="flex flex-col items-center justify-center w-full h-64 border-4 border-black dark:border-white bg-white dark:bg-black rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                  style={{ boxShadow: '5px 5px 0px #000000' }}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-black dark:text-white" />
                    <p className="mb-2 text-sm font-bold text-black dark:text-white">
                      <span className="font-extrabold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-black dark:text-white">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <Input id="pet-images" type="file" className="hidden" multiple accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
              {form.formState.errors.images && (
                <p className="text-red-500">{form.formState.errors.images.message}</p>
              )}
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Pet image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <LoadingButton type="submit" className="w-full" loading={isLoading}>
              Submit for Adoption
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
