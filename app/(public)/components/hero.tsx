import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { H1, P, Small } from "@/components/ui/typography";
import { WaveDivider } from "@/components/utils/wave-divider";
import { Plus, Send, Smile } from "lucide-react";
import Image from "next/image";
import AvatarStackWithProps from "./avatar-stack";
import Link from "next/link";

export function Hero(){
    return (
        <section className="relative max-w-[1450px] mx-auto pt-32 pb-48 overflow-hidden">
          <div className="absolute inset-0 " />
          <div className="container relative px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-4 text-center lg:text-left">
                <H1 className="text-5xl font-bold leading-tight">
                  Connect & Chat in
                  <span className="text-primary"> Real Time</span>
                </H1>
                <P className="max-w-[600px] mx-auto lg:mx-0">
                  Experience the future of communication with our lightning-fast chat platform. Connect with anyone,
                  anywhere, instantly.
                </P>
                <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/users">
                    Start Chatting
                    <Send className="w-4 h-4" />
                  </Link>
                </Button>
                </div>
                <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start text-sm text-muted-foreground">
                <AvatarStackWithProps 
                    users={3} 
                    size={48} 
                />
                  <Small>Join 10,000+ users already chatting</Small>
                </div>
              </div>
              <div className="relative">
                <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
                  <div className="relative bg-card rounded-2xl shadow-2xl border p-4 w-full h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-2 pb-4 border-b">
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="flex-1 py-4 space-y-4">
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-secondary" />
                          <div className="bg-secondary rounded-lg rounded-bl-none p-3 max-w-[80%]">
                            <Small className="text-sm">Hey! How are you doing? 👋</Small>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <div className="bg-primary rounded-lg rounded-br-none p-3 max-w-[80%] text-primary-foreground">
                            <Small className="text-sm">I'm great! Just trying out this new chat app 😊</Small>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-secondary" />
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Input placeholder="Write a message..." />
                          <Button size="icon">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <WaveDivider />
        </section>
    )
}