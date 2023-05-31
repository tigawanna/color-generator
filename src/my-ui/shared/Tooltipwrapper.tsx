import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shadcn/tooltip";
import { ReactNode } from "react";




interface TooltipwrapperProps {
message:string
children:ReactNode
}

export function Tooltipwrapper({message,children}:TooltipwrapperProps){
return (
    <TooltipProvider>
        <Tooltip delayDuration={200}>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent>
                <p>{message}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>

);
}
