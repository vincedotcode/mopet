import { Heart, PawPrint, Users, Calendar, MessageCircle, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const features = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Provide loving attention and support for pets in need."
    },
    {
      icon: PawPrint,
      title: "Pet Matching",
      description: "Find the perfect companion based on lifestyle and preferences."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with other pet lovers and share experiences."
    },
    {
      icon: Calendar,
      title: "Care Reminders",
      description: "Never miss important pet care tasks with timely alerts."
    },
    {
      icon: MessageCircle,
      title: "Expert Advice",
      description: "Access to veterinarians and pet behavior specialists."
    },
    {
      icon: Shield,
      title: "Pet Insurance",
      description: "Protect your furry friends with comprehensive coverage."
    }
  ]

  return (
    <section className="border-t-border dark:border-t-darkBorder dark:bg-darkBg border-t-2 bg-bg py-20 font-base lg:py-[100px]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transition-transform duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}