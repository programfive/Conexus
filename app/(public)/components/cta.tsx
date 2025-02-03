import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/ui/typography";
import { Send } from "lucide-react";
import Link from "next/link";

export function Cta(){
    return (
    <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-secondary/50" />
        <div className="container relative px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <H2 className="font-bold mb-4">Ready to start chatting?</H2>
            <P className="mb-8">
              Join thousands of users already enjoying Conexus. Start your free trial today.
            </P>
            <Button size="lg" asChild className="gap-2">
                  <Link href="/users">
                    Start Chatting
                    <Send className="w-4 h-4" />
                  </Link>
            </Button>
          </div>
        </div>
    </section>
    )
}