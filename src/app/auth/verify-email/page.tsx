"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/lib/actions/user.actions";
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const VerifyEmailComponent: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (token) {
        try {
          await verifyEmail(token);
          setStatus("success");
        } catch (error) {
          console.error("Error verifying email:", error);
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
    };

    verifyUserEmail();
  }, [token]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Email Verification
        </CardTitle>
        <CardDescription className="text-center">
          {status === "loading" && "Please wait while we verify your email."}
          {status === "success" && "Your email has been verified successfully."}
          {status === "error" && "We encountered an issue while verifying your email."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {status === "loading" && (
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        )}
        {status === "success" && (
          <CheckCircle className="h-12 w-12 text-primary" />
        )}
        {status === "error" && (
          <XCircle className="h-12 w-12 text-destructive" />
        )}
        
        <p className="text-lg font-medium text-center">
          {status === "loading" && "Verifying..."}
          {status === "success" && "Email verified!"}
          {status === "error" && "Verification failed. Please try again."}
        </p>
        
        {status === "success" && (
          <Button 
            onClick={() => router.push("/auth/signin")}
            className="w-full"
          >
            Go to Sign In
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailComponent />
      </Suspense>
    </div>
  );
}
