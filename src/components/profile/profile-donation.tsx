import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Donations Component
export default function DonationsTab() {
  const donations = [
    { id: 1, amount: 50, date: "2023-07-01" },
    { id: 2, amount: 100, date: "2023-07-15" },
    { id: 3, amount: 75, date: "2023-08-01" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donations</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <ul className="space-y-4">
            {donations.map((donation) => (
              <li key={donation.id} className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">${donation.amount}</span>
                <span className="text-muted-foreground">{donation.date}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <div className="mt-4">
          <Button className="w-full">Donate Again</Button>
        </div>
      </CardContent>
    </Card>
  );
}
