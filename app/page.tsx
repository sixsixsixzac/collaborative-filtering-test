"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { MovieList } from "@/components/movieList";
import type { Movie, MovieCategory, User } from "@/lib/interfaces";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch('/api/users');

      if (!response.ok) throw new Error('Fail');
      return response.json();
    },
  });

  const { data: movieCategories = [], isLoading } = useQuery<MovieCategory[]>({
    queryKey: ['movies', selectedUser?.id],
    queryFn: async (): Promise<MovieCategory[]> => {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ userId: selectedUser?.id || null }),
      });

      if (!response.ok) throw new Error('Fail');
      return response.json();
    },

    enabled: !!selectedUser,
  });

  useEffect(() => {
    if (users.length > 0 && !selectedUser) setSelectedUser(users[0]);
  }, [users, selectedUser]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar
        users={users}
        selectedUser={selectedUser}
        onUserSelect={setSelectedUser}
      />
      <MovieList movieCategories={movieCategories} isLoading={isLoading} />
    </div>
  );
}
