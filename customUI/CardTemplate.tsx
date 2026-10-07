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
    <Card className={cn("")}>
      <CardHeader className="">
        <CardTitle className=""></CardTitle>
        <CardDescription className=""></CardDescription>
      </CardHeader>
      <CardContent className=""></CardContent>
      <CardFooter className=""></CardFooter>
    </Card>
  );
};

export default CardTemplate;
