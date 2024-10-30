"use client";
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LoadingButton } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { createCampaign, getAllCampaigns, updateCampaignStatus } from "@/lib/actions/donation.actions";
import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
export default function DonationsTab() {
    const user = useUser();
    const { toast } = useToast();
    const [newCampaign, setNewCampaign] = useState({
        title: "",
        description: "",
        targetAmount: "",
        startDate: new Date(),
        endDate: new Date(),
    });
    const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<"ongoing" | "completed" | "canceled">("ongoing");

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const fetchedCampaigns = await getAllCampaigns();
                setCampaigns(fetchedCampaigns);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch campaigns. Please try again.",
                    variant: "destructive",
                });
                console.error("Error fetching campaigns:", error);
            }
        };

        fetchCampaigns();
    }, []);

    const handleAddCampaign = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const newCampaignData: CreateCampaignParams = {
                ...newCampaign,
                targetAmount: parseFloat(newCampaign.targetAmount),
                currentAmount: 0,
                status: "ongoing",
                startDate: newCampaign.startDate || new Date(),
                endDate: newCampaign.endDate || new Date(),
            };

            await createCampaign(newCampaignData);
            toast({
                title: "Success",
                description: "Campaign created successfully!",
                variant: "default",
            });
            setNewCampaign({
                title: "",
                description: "",
                targetAmount: "",
                startDate: new Date(),
                endDate: new Date(),
            });
            const updatedCampaigns = await getAllCampaigns();
            setCampaigns(updatedCampaigns);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create campaign. Please try again.",
                variant: "destructive",
            });
            console.error("Error creating campaign:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async () => {
        if (!selectedCampaignId) return;
        setIsLoading(true);

        try {
            await updateCampaignStatus(selectedCampaignId, selectedStatus);
            toast({
                title: "Success",
                description: "Campaign status updated successfully!",
                variant: "default",
            });
            setCampaigns(await getAllCampaigns());
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update campaign status. Please try again.",
                variant: "destructive",
            });
            console.error("Error updating campaign status:", error);
        } finally {
            setIsDialogOpen(false);
            setIsLoading(false);
        }
    };
    const renderDatePicker = (label: string, selectedDate: Date, onSelectDate: (date: Date) => void) => (
        <div className="space-y-1">
            <Label>{label}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <LoadingButton variant="noShadow" className="w-full text-left" loading={false}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </LoadingButton>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date: Date | undefined) => onSelectDate(date || new Date())}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
    

    return (
        <div className="flex">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Existing Donation Campaigns</CardTitle>
                    <CardDescription>A list of all donation campaigns on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                <Dialog>
                        <DialogTrigger asChild>
                            <LoadingButton variant="default" className="mb-4" loading={isLoading}>
                                <DollarSign className="mr-2 h-4 w-4" />
                                New Campaign
                            </LoadingButton>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Create Campaign</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddCampaign} className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-1">
                                    <Label htmlFor="campaign-title">Title</Label>
                                    <Input
                                        id="campaign-title"
                                        placeholder="e.g., Help Abandoned Pets"
                                        value={newCampaign.title}
                                        onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                                        className="text-sm"
                                    />
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <Label htmlFor="campaign-description">Description</Label>
                                    <Input
                                        id="campaign-description"
                                        placeholder="Short description"
                                        value={newCampaign.description}
                                        onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                                        className="text-sm"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="campaign-target">Target</Label>
                                    <Input
                                        id="campaign-target"
                                        type="number"
                                        placeholder="e.g., 10000"
                                        value={newCampaign.targetAmount}
                                        onChange={(e) => setNewCampaign({ ...newCampaign, targetAmount: e.target.value })}
                                        className="text-sm"
                                    />
                                </div>
                                {renderDatePicker("Start Date", newCampaign.startDate, (date) =>
                                    setNewCampaign({ ...newCampaign, startDate: date })
                                )}
                                {renderDatePicker("End Date", newCampaign.endDate, (date) =>
                                    setNewCampaign({ ...newCampaign, endDate: date })
                                )}
                                <DialogFooter className="col-span-2">
                                    <LoadingButton type="submit" className="w-full" loading={isLoading}>
                                        <DollarSign className="mr-2 h-4 w-4" />
                                        Create Campaign
                                    </LoadingButton>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Target</TableHead>
                                <TableHead>Current</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {campaigns.map((campaign, index) => (
                                <TableRow key={index}>
                                    <TableCell>{campaign.title}</TableCell>
                                    <TableCell>{campaign.description}</TableCell>
                                    <TableCell>${campaign.targetAmount}</TableCell>
                                    <TableCell>${campaign.currentAmount}</TableCell>
                                    <TableCell> <Badge variant="default">
                                    {campaign.status} </Badge></TableCell>
                                    <TableCell>
                                        <LoadingButton
                                            variant="default"
                                            onClick={() => {
                                                setSelectedCampaignId(campaign._id);
                                                setSelectedStatus(campaign.status);
                                                setIsDialogOpen(true);
                                            }}
                                        >
                                            Update Status
                                        </LoadingButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* Update Status Dialog */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Update Campaign Status</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <Label>Status</Label>
                                <Select onValueChange={(value) => setSelectedStatus(value as typeof selectedStatus)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="ongoing">Ongoing</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="canceled">Canceled</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogFooter>
                                <LoadingButton onClick={handleUpdateStatus} loading={isLoading} className="w-full">
                                    Confirm
                                </LoadingButton>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    );
}
