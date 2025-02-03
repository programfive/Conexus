"use client";

import React from "react";

import { format } from "date-fns";
import { cn } from "@/lib/utils";



export const ChatBubble = ({ 
  message, 
  isEmoji, 
  createdAt, 
  isOwn 
}: { 
  message: string; 
  isEmoji: boolean; 
  createdAt: Date; 
  isOwn: boolean; 
}) => {
  return (
    <div className={cn(
      "relative flex flex-col max-w-xs",
      isEmoji ? "items-center" : isOwn ? "items-end" : "items-start"
    )}>
      <div 
        className={cn(
          "rounded-2xl p-3 break-words",
          isEmoji 
            ? "bg-transparent text-6xl border-none shadow-none" 
            : isOwn 
              ? "bg-primary text-primary-foreground rounded-br-none" 
              : "bg-secondary text-secondary-foreground rounded-bl-none"
        )}
      >
        {message}
      </div>
      {!isEmoji && (
        <span 
          className={cn(
            "text-xs text-muted-foreground mt-1",
            isOwn ? "text-right" : "text-left"
          )}
        >
          {format(new Date(createdAt), "p")}
        </span>
      )}
    </div>
  );
};