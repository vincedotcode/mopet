'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PawPrint, Users, UserPlus, PlusCircle, ArrowLeft, Users2 } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [newVet, setNewVet] = useState({ name: "", specialization: "" })
  const [vets, setVets] = useState([
    { name: "Dr. Smith", specialization: "General" },
    { name: "Dr. Johnson", specialization: "Surgery" },
  ])
  const [newGroup, setNewGroup] = useState({ name: "", description: "" })
  const [groups, setGroups] = useState([
    { name: "Dog Lovers", description: "A group for dog enthusiasts" },
    { name: "Cat Cafe", description: "Discuss all things cats" },
  ])
  const router = useRouter()

  const handleAddVet = (e: React.FormEvent) => {
    e.preventDefault()
    setVets([...vets, newVet])
    setNewVet({ name: "", specialization: "" })
  }

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault()
    setGroups([...groups, newGroup])
    setNewGroup({ name: "", description: "" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 p-8 overflow-auto">
        <Button
          variant="default"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="vets">Vets</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pets Adopted</CardTitle>
                  <PawPrint className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">254</div>
                  <p className="text-xs text-muted-foreground">+20% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pets on Platform</CardTitle>
                  <PawPrint className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,423</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,120</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Vets</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vets.length}</div>
                  <p className="text-xs text-muted-foreground">+2 new this month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>A list of users who recently joined the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Alice Johnson</TableCell>
                      <TableCell>alice@example.com</TableCell>
                      <TableCell>2 days ago</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bob Smith</TableCell>
                      <TableCell>bob@example.com</TableCell>
                      <TableCell>5 days ago</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Carol Williams</TableCell>
                      <TableCell>carol@example.com</TableCell>
                      <TableCell>1 week ago</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vets">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Vet</CardTitle>
                  <CardDescription>Enter the details of the new veterinarian.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddVet} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vet-name">Name</Label>
                      <Input
                        id="vet-name"
                        placeholder="Dr. Jane Doe"
                        value={newVet.name}
                        onChange={(e) => setNewVet({ ...newVet, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vet-specialization">Specialization</Label>
                      <Input
                        id="vet-specialization"
                        placeholder="General, Surgery, etc."
                        value={newVet.specialization}
                        onChange={(e) => setNewVet({ ...newVet, specialization: e.target.value })}
                      />
                    </div>
                    <Button type="submit">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Vet
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Registered Vets</CardTitle>
                  <CardDescription>A list of all veterinarians registered on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Specialization</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vets.map((vet, index) => (
                        <TableRow key={index}>
                          <TableCell>{vet.name}</TableCell>
                          <TableCell>{vet.specialization}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community">
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}