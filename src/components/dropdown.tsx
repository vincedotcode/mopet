"use client";
import { useUser } from "@/context/user-context";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings, User2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const DropdownUser = () => {
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="border-4 border-primary">
          <span className="hidden text-right lg:block mr-2">
            <span className="block text-sm font-bold">
              {user.firstName} {user.lastName}
            </span>
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-4 border-primary ">
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center gap-3.5 text-sm font-bold hover:text-primary focus:text-primary"
          >
            <User2 className="mr-2 h-4 w-4" />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border-t-4 border-primary" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-3.5 text-sm font-bold hover:text-primary focus:text-primary"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;