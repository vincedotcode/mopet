import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 " />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">Oops! Page Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="w-full h-1 bg-gradient-to-r  rounded-full mb-4"></div>
          <p className="text-center text-sm text-gray-500">
            Error Code: 404
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-full hover:from-pink-600 hover:to-yellow-600 transition-all duration-200">
            <Link href="/">
              Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}