import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUserProfile } from "@/hooks/queries/useGetUserProfile";
import { useAuth } from "@/hooks/custom/useAuth";

function HeaderProfile() {
  const fall = {
    name: "USER",
    email: "mail@domain.com",
    avatar: "https://avatar.vercel.sh/john",
  };

  const { user, logout, isLoading } = useAuth();
  console.log("🚀 ~ HeaderProfile ~ user:", user)

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            {/* Avatar */}
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={user?.profileImage?? fall.avatar} alt={user?.name?? fall.name} />
              <AvatarFallback>
                {user &&user?.name ? user?.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join(""): "U"}
              </AvatarFallback>
            </Avatar>

            {/* Name and Edit Profile */}
            {/* <div className="flex flex-col">
              <span className="font-medium text-sm">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                Edit Profile
              </span>
            </div> */}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">{user?.name??"User name"}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email??"User@yopmail.com"}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              // router.push("/profile");
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderProfile;
