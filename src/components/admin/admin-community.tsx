import { useState, useEffect, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users2, Trash } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "@/components/ui/select";

// Mock API functions for community operations
import { createCommunity, getAllCommunities, deleteCommunity } from "@/lib/actions/community.actions";


export default function CommunityTab() {
  const { toast } = useToast();
  const [newGroup, setNewGroup] = useState<CreateCommunityParams>({ title: "", description: "", category: "" });
  const [groups, setGroups] = useState<Community[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<Community | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const communities = await getAllCommunities();
        setGroups(communities);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load community groups.",
          variant: "destructive",
        });
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [toast]);

  const handleAddGroup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newCommunity = await createCommunity(newGroup);
      setGroups([...groups, newCommunity]);
      toast({
        title: "Success",
        description: "Community group created successfully!",
        variant: "default",
      });
      setNewGroup({ title: "", description: "", category: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create community group.",
        variant: "destructive",
      });
      console.error("Error creating community:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (!selectedGroup) return;
    setDeleteLoading(true);
    try {
      await deleteCommunity(selectedGroup._id);
      setGroups(groups.filter((group) => group._id !== selectedGroup._id));
      toast({
        title: "Success",
        description: "Community group deleted successfully!",
        variant: "default",
      });
      setSelectedGroup(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete community group.",
        variant: "destructive",
      });
      console.error("Error deleting community:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Create Community Group Card */}
      <Card>
        <CardHeader>
          <CardTitle>Create Community Group</CardTitle>
          <CardDescription>Set up a new community group for pet lovers.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddGroup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                placeholder="e.g., Pug Lovers Unite"
                value={newGroup.title}
                onChange={(e) => setNewGroup({ ...newGroup, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-description">Description</Label>
              <Input
                id="group-description"
                placeholder="A brief description of the group"
                value={newGroup.description}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(value) => setNewGroup({ ...newGroup, category: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pet Categories</SelectLabel>
                    <SelectItem value="Dogs">Dogs</SelectItem>
                    <SelectItem value="Cats">Cats</SelectItem>
                    <SelectItem value="Birds">Birds</SelectItem>
                    <SelectItem value="Reptiles">Reptiles</SelectItem>
                    <SelectItem value="Other Pets">Other Pets</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <LoadingButton type="submit" loading={loading}>
              <Users2 className="mr-2 h-4 w-4" />
              Create Group
            </LoadingButton>
          </form>
        </CardContent>
      </Card>

      {/* Existing Community Groups Table Card */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Community Groups</CardTitle>
          <CardDescription>A list of all community groups on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group._id}>
                  <TableCell>{group.title}</TableCell>
                  <TableCell>{group.description}</TableCell>
                  <TableCell>{group.category}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          onClick={() => setSelectedGroup(group)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Community Group</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                          <p>
                            Are you sure you want to delete the community group <strong>{selectedGroup?.title}</strong>?
                            All messages in this group will be permanently lost.
                          </p>
                        </div>
                        <DialogFooter>
                          <LoadingButton
                            variant="noShadow"
                            onClick={handleDeleteGroup}
                            loading={deleteLoading}
                          >
                            Confirm Delete
                          </LoadingButton>
                          <Button
                            variant="destructive"
                            onClick={() => setSelectedGroup(null)}
                          >
                            Cancel
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
