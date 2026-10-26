"use client"
import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format} from "date-fns";
import { cn } from "@/lib/utils";
import WhiteButton from "@/customUI/WhiteButton";
import BlueButton from "@/customUI/BlueButton";
import {useRouter} from "next/navigation"
import {useCancelAppointmentMutation} from "@/redux/features/main/appointmentApiSlice"
import { toast } from "sonner";
import { queryErrorResponse } from "@/lib/utilityComponents";
import {  customToast } from "@/lib/utilityComponents";
interface Props{
    dialogOpen:boolean;
    setDialogOpen:Dispatch<SetStateAction<boolean>>;
    setLoadingActive:Dispatch<SetStateAction<boolean>>;
    appointmentDate:string;
    type:"studentCancel"|"advisorCancel";
    studentName:string;
    advisorName:string;
    appointmentId:number
}


const CancellationDialog = ({dialogOpen, setDialogOpen, appointmentDate, type, studentName, advisorName, appointmentId, setLoadingActive}:Props) => {
    const router = useRouter()
    const [cancelAppointment] =useCancelAppointmentMutation()
    const handleCancel = ()=>{
        setDialogOpen(false)
    }
    const handleSubmit = ()=>{ 
      toast.promise(cancelAppointment(appointmentId).unwrap().then((resp)=>{
        console.log(resp)
        if(resp.id){
          setLoadingActive(false)
          customToast("Appointment cancelled", "success")
          router.push("/appointments")
        }
      }).catch((resp)=>{
        setLoadingActive(false)
        console.log(resp);
        console.log(`MESSAGE:${resp.message}`);
          customToast(resp.data.message, "error")
        }),{
          loading:"Cancelling Appointment",
          success:"Appointment cancelled",
          error:queryErrorResponse
        })
        setDialogOpen(false)
        setLoadingActive(true)
       
    }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white">
        <DialogHeader>
            <DialogTitle className="text-lg font-bold text-center">Confirm Appointment Cancellation</DialogTitle>
        </DialogHeader>
        <div className="text-base">
            <p>{"Please confirm that you'd like to cancel your appointment with "} <span className={cn("font-semibold text-ahGreen")}>{type==="advisorCancel"?studentName:type=="studentCancel"?advisorName:""}</span>  {" at "} <span className="text-ahGreen font-semibold">{format(appointmentDate, "h:mm a,  dd MMM, yyyy ")}</span></p>
        </div>
         <div className="w-full flex items-center justify-center md:justify-between flex-wrap-reverse gap-y-4 md:flex-nowrap">
            <WhiteButton
              text="Cancel"
              additionalStyle="border border-ahDarkGrey md:w-1/3 w-full"
              onClick={handleCancel}
            />
            <BlueButton
              text={`Cancel Appointment`}
              additionalStyle="w-full md:w-40 px-5"
              onClick={handleSubmit}
            />
          </div>
        </DialogContent>
    </Dialog>
  )
}

export default CancellationDialog