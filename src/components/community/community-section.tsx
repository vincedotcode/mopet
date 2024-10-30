"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CommunityCard from "@/components/community/community-card";
import { getAllCommunities } from "@/lib/actions/community.actions";
import { useToast } from "@/hooks/use-toast";

export default function CommunitiesSection() {
  const { toast } = useToast();
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const fetchedCommunities = await getAllCommunities();
        setCommunities(fetchedCommunities);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load communities. Please try again.",
          variant: "destructive",
        });
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
  }, [toast]);

  return (
    <section className="py-10  dark:bg-darkBg">
      <div className="container mx-auto px-4">
        <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Discover vibrant communities tailored to your interests. Connect, share, and grow with like-minded individuals from around the world.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community, index) => (
            <CommunityCard id={community._id} key={community._id || index} {...community} />
          ))}
        </div>
      </div>
    </section>
  );
}
