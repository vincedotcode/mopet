import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface CommunityCardProps {
  title: string;
  description: string;
  memberCount?: number;
  category: string;
  id: string; // Community ID for navigation
}

export default function CommunityCard({ 
  title = "Art Enthusiasts",
  description = "A vibrant community for art lovers to share and discuss their favorite pieces and techniques.",
  memberCount,
  category = "Art & Design",
  id,
}: CommunityCardProps) {
  const router = useRouter();

  const handleViewCommunity = () => {
    router.push(`/community/chat/${id}`);
  };

  return (
    <Card className="w-full max-w-md border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
      <CardHeader className="border-b-4 border-black dark:border-white">
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-black">{title}</CardTitle>
          <Badge variant="outline" className="bg-yellow-300 dark:bg-orange-400 text-black dark:text-white border-2 border-black dark:border-white font-bold">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-muted-foreground mb-2">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleViewCommunity}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-black dark:border-white font-bold text-lg py-6 rounded-none"
        >
          View Community
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
