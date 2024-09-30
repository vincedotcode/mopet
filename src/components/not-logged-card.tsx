import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LockIcon } from 'lucide-react'

export default function NotLoggedInCard() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Not Logged In</CardTitle>
        <CardDescription className="text-center">
          Please log in to access this feature
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <LockIcon className="w-16 h-16 " />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href="/auth/signin">
            Log In
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}