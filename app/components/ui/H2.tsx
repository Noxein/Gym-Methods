import { cn } from "@/app/lib/cn";

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
    text: string;
}

function H2({ text,className,...rest }: H2Props) {
    return ( 
        <h2 className={cn("text-2xl font-bold mb-5 mx-5 text-center", className)} {...rest}>{text}</h2>
     );
}

export default H2;