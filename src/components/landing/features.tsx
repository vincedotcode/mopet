import { Heart, PawPrint, Users, Calendar, MessageCircle, Smartphone, DollarSign, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const features = [
    {
      icon: Heart,
      title: "Pet Adoption",
      description: "Help pets find their forever homes with our easy adoption process."
    },
    {
      icon: DollarSign,
      title: "Donation Campaigns",
      description: "Support causes that matter to you and help pets in need through our donation platform."
    },
    {
      icon: MapPin,
      title: "Find a Vet",
      description: "Locate the nearest and best veterinarians for your pet's health and well-being."
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with fellow pet lovers, share experiences, and seek advice."
    },
    {
      icon: Smartphone,
      title: "Friendly Interface",
      description: "Enjoy a user-friendly experience that makes navigating the platform a breeze."
    },
    {
      icon: Heart,
      title: "Non-Profit",
      description: "We are dedicated to making a difference, with all proceeds going towards helping animals."
    }
  ];
  

  return (
    <section className="border-t-border dark:border-t-darkBorder dark:bg-darkBg border-t-4 bg-bg py-20 font-base lg:py-[100px] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000011_1px,transparent_1px),linear-gradient(to_bottom,#00000011_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(to_right,#ffffff11_1px,transparent_1px),linear-gradient(to_bottom,#ffffff11_1px,transparent_1px)]" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-heading text-center mb-12 text-text dark:text-darkText relative inline-block left-1/2 transform -translate-x-1/2">
          Our Features
          <span className="absolute -bottom-2 left-0 w-full h-4 bg-main -z-10 -rotate-2" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:-translate-y-2 hover:translate-x-2 bg-bg dark:bg-darkBg border-4 border-text dark:border-darkText rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(238,239,233,1)]">
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-main rounded-full mb-4 border-4 border-text dark:border-darkText transform -rotate-3">
                  <feature.icon className="w-8 h-8 text-text dark:text-darkText" />
                </div>
                <CardTitle className="text-2xl font-heading text-text dark:text-darkText">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text dark:text-darkText">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-main dark:bg-darkText transform -skew-y-2" />
    </section>
  )
}