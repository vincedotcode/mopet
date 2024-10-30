"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/lib/actions/user.actions";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { donateToCampaign } from "@/lib/actions/donation.actions";

interface DonationCardProps {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  status: "ongoing" | "completed" | "canceled";
  onDonationComplete: () => void; // New prop to notify parent
}

export default function DonationCard({
  id,
  title = "Food for Needy Pets",
  description = "Help us provide food and care for pets in need.",
  targetAmount = 5000,
  currentAmount = 1500,
  status = "ongoing",
  onDonationComplete,
}: DonationCardProps) {
  const searchParams = useSearchParams();
  const progressPercentage = (currentAmount / targetAmount) * 100;
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [donationConfirmed, setDonationConfirmed] = useState(false);
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    isAdmin: false,
    isEmailVerified: false,
    role: "user",
    id: "",
  });
  const [userLoaded, setUserLoaded] = useState(false);
  const { data: session } = useSession();

  const fetchUser = async () => {
    if (session?.user?.email) {
      const fetchedUser = await getUserByEmail(session.user.email);
      setUser({
        firstName: fetchedUser?.firstName || "John",
        lastName: fetchedUser?.lastName || "Doe",
        isAdmin: fetchedUser?.isAdmin || false,
        isEmailVerified: fetchedUser?.isEmailVerified || false,
        role: fetchedUser?.role || "user",
        id: fetchedUser?._id || "",
      });
      setUserLoaded(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [session?.user?.email]);

  const handleDonate = async () => {
    setLoading(true);
    localStorage.setItem("donationAmount", donationAmount.toString());
    localStorage.setItem("donationId", id);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ donationId: id, amount: donationAmount }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Failed to retrieve Stripe session URL");
      }
    } catch (error) {
      console.error("Donation error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userLoaded) return;

    const success = searchParams.get("success");

    if (success && !donationConfirmed) {
      const storedAmount = localStorage.getItem("donationAmount");
      const storedId = localStorage.getItem("donationId");

      if (storedAmount && storedId === id) {
        setDonationConfirmed(true);

        const confirmDonation = async () => {
          try {
            await donateToCampaign(id, {
              donor: user?.id,
              amount: parseFloat(storedAmount),
            });
            localStorage.removeItem("donationAmount");
            localStorage.removeItem("donationId");
            onDonationComplete(); // Trigger the callback to notify the parent
          } catch (error) {
            console.error("Error saving donation:", error);
          }
        };
        confirmDonation();
      }
    }
  }, [userLoaded, searchParams, id, donationConfirmed]);

  return (
    <Card className="w-full max-w-md border-4 border-black dark:border-white shadow-lg transition-transform hover:-translate-y-1">
      <CardHeader className="border-b-4 border-black dark:border-white">
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <Badge
            variant="outline"
            className={`text-black dark:text-white font-bold border-2 ${
              status === "ongoing"
                ? "bg-yellow-300 dark:bg-orange-400"
                : status === "completed"
                ? "bg-green-300 dark:bg-green-500"
                : "bg-red-300 dark:bg-red-500"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-muted-foreground mb-2">{description}</p>
        <div className="mb-4">
          <p className="text-sm font-bold mb-1">
            Progress: ${currentAmount} / ${targetAmount}
          </p>
          <Progress value={progressPercentage} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={status !== "ongoing"}
              className="w-full bg-red-500 text-white hover:bg-red-600 border-2 border-black dark:border-white font-bold py-4 rounded-none"
            >
              Make a Donation
              <Heart className="ml-2 h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter Donation Amount</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                placeholder="Enter amount"
              />
            </div>
            <DialogFooter>
              <Button
                onClick={handleDonate}
                disabled={loading || donationAmount <= 0}
                className="w-full"
              >
                {loading ? "Processing..." : "Donate"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
