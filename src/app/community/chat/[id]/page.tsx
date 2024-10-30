"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommunityChatScreen from "@/components/community/community-chat";

export default function CommunityChat() {
    return (
        <div className="h-screen">
            <div className="flex items-center justify-center flex-col">
                <div className="self-start mb-16 mt-3 flex justify-between w-full">
                    <Link href="/">
                        <Button className="mx-3">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                    </Link>
                </div>
                {/* Added wrapper with max-w-7xl to make it wider */}
                <div className="w-full max-w-7xl px-4">
                    <CommunityChatScreen />
                </div>
            </div>
        </div>
    );
}
