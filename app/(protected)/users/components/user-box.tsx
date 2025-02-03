"use client";

import axios from "axios";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { capitalizeWords } from "@/utils/text";
import { P, Small } from "@/components/ui/typography";
import {Avatar} from "@/components/utils/avatar";
import { Loader } from "@/components/utils/loader";

interface UserBoxProps {
  data: User;
}

export function UserBox({ data }: UserBoxProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>

      <div
        onClick={handleClick}
        className="relative flex w-full cursor-pointer items-center space-x-3 rounded-md  bg-background  md:px-4 pt-2 transition hover:bg-accent"
      >
        <Avatar url={data.profilePicture} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className=" flex flex-col  border-b border-border  pb-4">
              <P className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {capitalizeWords(data.username!)}
              </P>
              <Small className="text-muted-foreground">{data.email}</Small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
