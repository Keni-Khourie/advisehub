import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils';

//interface Props {}
const DegreeProgressCard = () => {
  return (
    <Card className={cn("")}>
        <CardHeader className="">
            <CardTitle className="">Degree Progress</CardTitle>
            <CardDescription className="">Bsc Computer Science</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
    </Card>
  )
}

export default DegreeProgressCard