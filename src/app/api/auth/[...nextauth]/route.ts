
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-option";

// Create the handler using NextAuth and authOptions
const handler = NextAuth(authOptions);

// Export the GET and POST handlers
export { handler as GET, handler as POST };
