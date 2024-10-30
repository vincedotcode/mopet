'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { getCommunityById, sendMessage } from "@/lib/actions/community.actions";
import { useUser } from "@/context/user-context";

export default function CommunityChatScreen() {
    const pathname = usePathname();
    const user = useUser();
    const communityId = pathname.split('/').pop();
    const [community, setCommunity] = useState<CommunityById | null>(null);
    const [messages, setMessages] = useState<MessageById[]>([]);
    const [newMessage, setNewMessage] = useState("");

    const fetchCommunity = async () => {
        if (!communityId) return;

        try {
            const fetchedCommunity = await getCommunityById(communityId);

            if (fetchedCommunity) {
                const messagesWithUsers = fetchedCommunity.messages.map((message) => ({
                    ...message,
                    userId: message.userId || [],
                }));

                console.log(messagesWithUsers);

                setCommunity({ ...fetchedCommunity, messages: messagesWithUsers as unknown as MessageById[] });
                setMessages(messagesWithUsers as unknown as MessageById[]);
            }
        } catch (error) {
            console.error("Error fetching community:", error);
        }
    };

    useEffect(() => {
        fetchCommunity();
    }, [communityId]);

    const handleSendMessage = async () => {
        if (newMessage.trim() && communityId) {
            try {
                await sendMessage(communityId, {
                    communityId,
                    userId: user?.id || "",
                    content: newMessage,
                });
                
                setNewMessage("");
                fetchCommunity(); // Refresh community after sending message
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    if (!community) {
        return <p>Loading community...</p>;
    }

    return (
        <div>
            <div className="container mx-auto px-4">
            <Card className="w-full max-w-full mx-auto border-4 border-black dark:border-white shadow-lg">
            <CardHeader className="border-b-4 border-black dark:border-white">
                        <CardTitle className="text-2xl font-black flex items-center justify-between">
                            <span>{community.title} Chat</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[60vh] p-4">
                            {messages.map((message, index) => {
                                const isCurrentUser = message.userId._id === user?.id;
                                const messageUser = message.userId; 
                                return (
                                    <div
                                        key={index}
                                        className={`flex items-start mb-4 ${
                                            isCurrentUser ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        {!isCurrentUser && (
                                            <Avatar className="w-10 h-10 mr-3 border-2 border-black dark:border-white">
                                                <AvatarFallback>{messageUser.firstName?.[0] || "U"}</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={`flex-1 max-w-sm ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                                            <div className={`flex items-center mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                                <span className="font-bold mr-2">{messageUser.firstName || "Unknown User"}</span>
                                                <span className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleTimeString()}</span>
                                            </div>
                                            <p className={`p-2 rounded-lg border-2 inline-block dark:text-white ${
                                                isCurrentUser
                                                    ? 'bg-primary text-primary-foreground border-black dark:border-white'
                                                    : 'bg-white dark:bg-darkBg border-black dark:border-white'
                                            }`}>
                                                {message.content}
                                            </p>
                                        </div>
                                        {isCurrentUser && (
                                            <Avatar className="w-10 h-10 ml-3 border-2 border-black dark:border-white">
                                                <AvatarFallback>{messageUser.firstName?.[0] || "U"}</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                );
                            })}
                        </ScrollArea>
                        <div className="p-4 border-t-4 border-black dark:border-white">
                            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center">
                                <Input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="flex-1 mr-2 border-2 border-black dark:border-white"
                                />
                                <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-black dark:border-white">
                                    <Send className="w-4 h-4" />
                                    <span className="sr-only">Send message</span>
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
