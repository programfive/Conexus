"use client";

import { User } from "@prisma/client";

import { H3 } from "@/components/ui/typography";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { UserBox } from "./user-box";
import { SearchIcon, UserRoundX } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = useMemo(() => {
    if (searchTerm.trim() === "") {
      return users;
    }
    return users.filter((user) => {
      if (user.username?.toLowerCase().includes(searchTerm.toLowerCase()) || user.email?.toLowerCase().includes(searchTerm.toLowerCase())){
        return true;
      }
    });
  }, [users, searchTerm]);
  return (
    <aside
      className="fixed inset-y-0 left-0 block w-full overflow-y-auto border-r border-border bg-background pb-20 lg:left-20 lg:block lg:w-[28rem] lg:pb-0">
      <div className="flex h-full flex-col ">
        <div className="px-4">
        <div className="mb-4 flex items-center justify-between pt-4">
          <H3>People</H3>
        </div>
          <div className="mt-6">
            <Input
              startIcon={SearchIcon}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
        <ScrollArea className="flex-1 px-4 my-6">
          <div className="">
            {users.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center gap-4">
                <UserRoundX size={64} />
                <H3>There are no users</H3>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center gap-4">
                <UserRoundX size={64} />
                <H3>No users found</H3>
              </div>
            ) : (
              filteredItems.map((item) => <UserBox key={item.id} data={item} />)
            )}
          </div>
        </ScrollArea>

      </div>
    </aside>
  );
};
