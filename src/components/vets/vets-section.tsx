import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default function VetSection({ vets }: { vets: Vet[] }) {

    console.log("vets", vets)
    return (
        <section className="container mx-auto py-12" id="vets-section">
            <h2 className="text-3xl font-bold mb-6">Our Veterinarians</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vets.map((vet, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{vet.name}</CardTitle>
                            <CardDescription>{vet.locationName}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground mb-2">{vet.address}</p>
                            <p className="text-sm text-muted-foreground mb-2">{vet.openingHours}</p>
                            {vet.website && (
                                <p className="text-sm text-muted-foreground mb-2">
                                    <a href={vet.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        Visit Website
                                    </a>
                                </p>
                            )}
                            <div className="mt-4">
                                <h4 className="font-semibold mb-2">Services:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {vet.services?.map((service, idx) => (
                                        <Badge key={idx} variant="secondary">
                                            {service}
                                        </Badge>
                                    ))}

                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="default" size="sm" onClick={() => window.location.href = `tel:${vet.phoneNumber}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                Call
                            </Button>
                            <Button variant="neutral" size="sm" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${vet.location.lat},${vet.location.lng}`, '_blank')}>
                                <MapPin className="mr-2 h-4 w-4" />
                                Location
                            </Button>
                            <Button variant="reverse" size="sm" onClick={() => window.location.href = `mailto:${vet.email}`}>
                                <Mail className="mr-2 h-4 w-4" />
                                Email
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    )
}