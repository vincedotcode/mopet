"use client";

import { useState, useEffect } from "react";
import DonationCard from "@/components/donation/donation-card";
import { getAllCampaigns } from "@/lib/actions/donation.actions";
import { useToast } from "@/hooks/use-toast";

export default function DonationsSection() {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);

  const fetchCampaigns = async () => {
    try {
      const fetchedCampaigns = await getAllCampaigns();
      setCampaigns(fetchedCampaigns);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load donation campaigns. Please try again.",
        variant: "destructive",
      });
      console.error("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [toast]);

  return (
    <section className="py-10  dark:bg-darkBg">
      <div className="container mx-auto px-4">
        <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Support meaningful causes. Explore active campaigns and make a positive impact today.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign, index) => (
            <DonationCard
              id={campaign._id}
              key={campaign._id || index}
              {...campaign}
              onDonationComplete={fetchCampaigns} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
