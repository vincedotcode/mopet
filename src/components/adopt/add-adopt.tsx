"use client";

import { Button } from '@/components/ui/button';

import { signIn, useSession } from 'next-auth/react'; // Import next-auth hooks
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'; // Assuming you have a Dialog component
import NotLoggedInCard from '@/components/not-logged-card';
import { useRouter } from 'next/navigation';

const AddAdoption: React.FC = () => {
  const { data: session } = useSession(); // Get session data
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state
  const router = useRouter();

  const handleClick = () => {
    if (!session) {
      setIsDialogOpen(true); // Show dialog if not logged in
    } else {
      router.push('/adopt/add'); // Redirect to add adoption page
    }
  };

  return (
    <div className="mt-1 mb-10 p-6 bg-card dark:bg-darkCard border-4 border-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="text-2xl font-bold mb-4 text-foreground text-center">
        Willing to Put Up a Pet for Adoption?
      </h3>
      <p className="text-lg mb-6 text-foreground text-center">
        Help a pet find their forever home by putting them up for adoption.
      </p>
      <div className="flex justify-center">
        <Button variant="default" onClick={handleClick}>
          Put a Pet for Adoption
        </Button>
      </div>

      {/* Dialog to show when not logged in */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
       
        <DialogContent>
          <NotLoggedInCard />
         
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAdoption;
