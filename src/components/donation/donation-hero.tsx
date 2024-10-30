"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight, Heart, Gift, Globe } from "lucide-react"

export default function NeobrutalistDonationBanner() {
  const [isHovered, setIsHovered] = useState(false)

  const handleExploreCampaigns = () => {
    const campaignSection = document.getElementById('campaigns-section')
    if (campaignSection) {
      campaignSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="relative w-full min-h-[40vh] bg-bg dark:bg-darkBg overflow-hidden font-mono py-8 transition-colors duration-300">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000022_2px,transparent_2px),linear-gradient(to_bottom,#00000022_2px,transparent_2px)] dark:bg-[linear-gradient(to_right,#ffffff22_2px,transparent_2px),linear-gradient(to_bottom,#ffffff22_2px,transparent_2px)] bg-[size:40px_40px]" />

      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4 leading-none">
            SUPPORT A
            <span className="inline-block -rotate-2 bg-red-500 dark:bg-purple-500 text-white dark:text-black px-2 py-1 ml-2 transform translate-y-1">CAUSE</span>
          </h1>
          
          <p className="text-lg text-black dark:text-white mb-4 max-w-md">
            Browse through campaigns and make a difference today. Together, we can change lives.
          </p>

          <Button 
            variant="default" 
            size="lg" 
            onClick={handleExploreCampaigns}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              bg-primary text-primary-foreground text-lg px-6 py-2 rounded-none
              border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]
              hover:shadow-none hover:translate-x-1 hover:translate-y-1
              transition-all duration-300 ease-in-out
            `}
          >
            Explore Campaigns
            <ChevronRight className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
          </Button>
        </div>

        <div className="w-full md:w-1/2 flex justify-end relative h-32 md:h-40">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-red-500 dark:bg-purple-500 absolute top-0 right-4 border-4 border-black dark:border-white transform -rotate-3"></div>
          <div className="w-32 h-32 md:w-40 md:h-40 bg-muted absolute top-0 right-0 border-4 border-black dark:border-white transform rotate-3"></div>
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-gray-800 relative z-10 border-4 border-black dark:border-white">
            <img 
              src="/donate.jpg" 
              alt="Donation illustration" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {[
            { Icon: Heart, label: "Donate", color: "bg-red-500 dark:bg-red-400" },
            { Icon: Gift, label: "Support", color: "bg-blue-500 dark:bg-blue-400" },
            { Icon: Globe, label: "Impact", color: "bg-green-500 dark:bg-green-400" },
          ].map((item, index) => (
            <div 
              key={index} 
              className={`
                absolute ${['top-full -right-4', 'bottom-0 right-1/4', 'top-1/2 left-1/4'][index]}
                ${item.color} border-2 border-black dark:border-white p-1 transform rotate-3
                flex items-center space-x-1
              `}
            >
              <item.Icon className="w-4 h-4 text-black dark:text-white" />
              <span className="text-black dark:text-white font-bold text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-2 bg-white dark:bg-black transform -skew-y-2"></div>
    </header>
  )
}
