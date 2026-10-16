import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CardTemplate = () => {
  return (
    <Card className={cn("rounded-lg")}>
      <CardHeader className="">
        <CardTitle className="font-semibold"></CardTitle>
        <CardDescription className="font-thin text-ahTextGrey text-sm"></CardDescription>
      </CardHeader>
      <CardContent className=""></CardContent>
      <CardFooter className=""></CardFooter>
    </Card>
  );
};

export default CardTemplate;
