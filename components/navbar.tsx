"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import type { User as UserType } from "@/lib/interfaces";

interface NavbarProps {
  users: UserType[];
  selectedUser: UserType | null;
  onUserSelect: (user: UserType) => void;
}

export function Navbar({ users, selectedUser, onUserSelect }: NavbarProps) {

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
                  {selectedUser?.name || 'Players'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {users.map((user) => (
                  <DropdownMenuItem
                    key={user.id}
                    onClick={() => onUserSelect(user)}
                    className={selectedUser?.id === user.id ? "bg-accent" : ""}
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