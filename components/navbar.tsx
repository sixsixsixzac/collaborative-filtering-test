"use client";

import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useUserStore } from "@/lib/stores/user-store";
import type { User as UserType } from "@/lib/interfaces";

export function Navbar() {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const { data: users = [] } = useQuery<UserType[]>({
    queryKey: ['users'],
    queryFn: async (): Promise<UserType[]> => {
      const response = await fetch('/api/users');

      if (!response.ok) throw new Error('Fail');
      return response.json();
    },
  });

  return (
    <nav className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Home</h1>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {currentUser?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {users.map((user) => (
                  <DropdownMenuItem
                    key={user.id}
                    onClick={() => setCurrentUser(user)}
                    className={currentUser?.id === user.id ? "bg-accent" : ""}
                  >
                    {user.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}