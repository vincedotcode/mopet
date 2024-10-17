import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users2 } from "lucide-react";

export default function CommunityTab() {
  const [newGroup, setNewGroup] = useState({ name: "", description: "" });
  const [groups, setGroups] = useState([
    { name: "Dog Lovers", description: "A group for dog enthusiasts" },
    { name: "Cat Cafe", description: "Discuss all things cats" },
  ]);

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    setGroups([...groups, newGroup]);
    setNewGroup({ name: "", description: "" });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
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
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
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
            <Button type="submit">
              <Users2 className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </form>
        </CardContent>
      </Card>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group, index) => (
                <TableRow key={index}>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
