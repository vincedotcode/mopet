'use client'

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';

import DashboardTab from "@/components/admin/admin-dashboard";
import UsersTab from "@/components/admin/admin-users";
import VetsTab from "@/components/admin/admin-vets";
import CommunityTab from "@/components/admin/admin-community";

export default function AdminDashboard() {
  const router = useRouter();

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
            <DashboardTab />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>

          <TabsContent value="vets">
            <VetsTab />
          </TabsContent>

          <TabsContent value="community">
            <CommunityTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
