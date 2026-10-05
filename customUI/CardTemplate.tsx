import {
  Card,
  CardAction,
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
        <CardTitle className="">
          <CardDescription className=""></CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent className=""></CardContent>
      <CardFooter className=""></CardFooter>
    </Card>
  );
};

export default CardTemplate;
