import { Loader2 } from "lucide-react";

export function Loader(){
    return <div className=" bg-black/80 w-screen h-screen  grid place-content-center fixed z-50 inset-0">
        <Loader2 className="text-foreground animate-spin "  size={64} />
    </div>
}