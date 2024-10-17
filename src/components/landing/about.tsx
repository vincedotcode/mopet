import { PawPrint, Heart, Stethoscope } from "lucide-react"

export default function AboutUsSection() {
  return (
    <section className="bg-bg dark:bg-darkBg py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000011_1px,transparent_1px),linear-gradient(to_bottom,#00000011_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#ffffff11_1px,transparent_1px),linear-gradient(to_bottom,#ffffff11_1px,transparent_1px)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading text-text dark:text-darkText text-center mb-12 relative inline-block left-1/2 transform -translate-x-1/2">
          About Mopet
          <span className="absolute -bottom-2 left-0 w-full h-4 bg-main -z-10 -rotate-1" />
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-text dark:text-darkText">
              At Mopet, we're passionate about creating a better world for pets, their owners, and the veterinarians who care for them. Our mission is simple: to provide innovative solutions that enhance the lives of animals and support the people who love them.
            </p>
            <p className="text-lg text-text dark:text-darkText">
              We believe in the power of technology to transform pet care, making it more accessible, efficient, and enjoyable for everyone involved. From connecting pet owners with the right veterinarians to offering cutting-edge tools for pet health management, we're here to make a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: PawPrint, title: "For Pets", description: "Ensuring better health and happiness for every furry friend." },
              { icon: Heart, title: "For Owners", description: "Empowering you to provide the best care for your beloved companions." },
              { icon: Stethoscope, title: "For Vets", description: "Supporting veterinarians with tools to enhance their practice and patient care." },
              { icon: PawPrint, title: "Our Promise", description: "Continuously innovating to improve the lives of pets and their families." }
            ].map((item, index) => (
              <div key={index} className="bg-main text-text dark:text-darkBg p-6 rounded-none border-4 border-text dark:border-darkText shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(238,239,233,1)] transform hover:-translate-y-1 hover:translate-x-1 transition-transform duration-200">
                <item.icon className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-heading mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-2xl font-heading text-text dark:text-darkText mb-6">
            Join us in our mission to create a better world for pets!
          </p>
          <button className="bg-main text-text dark:text-darkBg hover:bg-mainAccent px-8 py-3 rounded-none border-4 border-text dark:border-darkText font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(238,239,233,1)] transform hover:-translate-y-1 hover:translate-x-1 transition-transform duration-200">
            Get Started with Mopet
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-8 bg-main dark:bg-darkText transform -skew-y-2" />
    </section>
  )
}