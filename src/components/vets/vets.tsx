// pages/vets.tsx
"use client";

import { useEffect, useState } from "react";
import VetSection from "@/components/vets/vets-section";
import { getAllVets } from "@/lib/actions/vet.actions";

export default function VetsPage() {
  const [vets, setVets] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVets() {
      try {
        setLoading(true);
        const fetchedVets = await getAllVets(); // Fetch all vets from the server-side function
        setVets(fetchedVets || []);
      } catch (error) {
        console.error("Failed to fetch vets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVets();
  }, []);

  if (loading) {
    return <p>Loading veterinarians...</p>;
  }

  return (
    <div>
      <VetSection vets={vets} />
    </div>
  );
}
