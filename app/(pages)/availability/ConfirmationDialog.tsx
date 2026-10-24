"use client";
import { useContext } from "react";
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import WhiteButton from "@/customUI/WhiteButton";
import BlueButton from "@/customUI/BlueButton";
import {useAddAdvisorAvailabilityMutation, useDeleteAdvisorAvailabilityMutation} from "@/redux/features/main/availabilityApiSlice"
import { toast } from "sonner";
import { queryErrorResponse } from "@/lib/utilityComponents";
import {CreateAdvisorAvailabilityData} from "@/validators/api/availabilityApiValidators"

//this is where you include the logic to delete or add selected existing meeting Object by sending it to the backend
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const ConfirmationDialog = () => {
  const[addAvailability] = useAddAdvisorAvailabilityMutation()
  const [deleteAvailability] = useDeleteAdvisorAvailabilityMutation()
 
  const contextData = useContext(AdvisorAvailabilityContext);

  const handleCancel = () => {
    contextData.setDialogOpen(false);
    contextData.setPageData({ ...contextData.pageData, dialogType: "none" });
  };
  const handleSubmit = () => {
    if (contextData.pageData.dialogType === "add") {
      if (!contextData.availabilityData.combinedDateTime) return;
      const createAvailabilityBody:CreateAdvisorAvailabilityData={
        date:format(contextData.availabilityData.combinedDateTime, "yyyy-MM-dd"),
        time:format(contextData.availabilityData.combinedDateTime, "HH:mm"),
        timeZone:timeZone
      }
      toast.promise(
        addAvailability(createAvailabilityBody).unwrap().then((resp)=>{
          console.log(resp)
          contextData.setIsLoading(true)
          contextData.setRefetchData(true)
          
        }), {
          loading:"Adding availability",
          success:"availability Added",
          error:queryErrorResponse
        }
      )
      //console.log(`${format(contextData.availabilityData.combinedDateTime, "h:mm a, dd MMM yyyy")} Added`);
      
      contextData.setDialogOpen(false)
      // contextData.setIsLoading(true)
    }
    if (contextData.pageData.dialogType === "delete") {
      if (!contextData.pageData.selectedExistingAvailability) return;
      toast.promise(
        deleteAvailability(contextData.pageData.selectedExistingAvailability.id).unwrap().then((resp)=>{
          console.log(resp)
           contextData.setIsLoading(true)
          contextData.setRefetchData(true)
          
        }), {
          loading:"Adding availability",
          success:"availability Added",
          error:queryErrorResponse
        }
      )

      // console.log(contextData.pageData.selectedExistingAvailability.id);
      // console.log(`${format(contextData.pageData.selectedExistingAvailability.availability, "h:mm a, dd MMM yyyy")} deleted`);
      contextData.setDialogOpen(false)
      // contextData.setIsLoading(true)
    }
  };

  return (
    <Dialog
      open={contextData.dialogOpen}
      onOpenChange={contextData.setDialogOpen}
    >
      {contextData.pageData.dialogType !== "none" && (
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">{`CONFIRM ${contextData.pageData.dialogType === "add" ? "ADDITION" : contextData.pageData.dialogType === "delete" ? "" : "DELETION"}`}</DialogTitle>
          </DialogHeader>
          <div>
            <p className="text-base">
              Confirm you&apos;d like to <span className={cn("font-semibold text-lg", contextData.pageData.dialogType === "add"&&"text-ahGreen",contextData.pageData.dialogType === "delete"&&"text-red-400")}>
                {contextData.pageData.dialogType === "add" ? "ADD" : contextData.pageData.dialogType === "delete" ? "DELETE" : ""}</span> the following availability time:
              
              <span className={cn("font-semibold text-lg" , contextData.pageData.dialogType === "add"&&"text-ahGreen",contextData.pageData.dialogType === "delete"&&"text-red-400")}>
                {(contextData.pageData.dialogType === "add" && contextData.availabilityData.combinedDateTime)
                  ? format(
                      contextData.availabilityData.combinedDateTime,
                      "h:mm a •  MMM dd yyyy",
                    )
                  : contextData.pageData.dialogType === "delete"
                    ? format(
                        contextData.pageData.selectedExistingAvailability!.dateTime,
                        "h:mm a •  MMM dd yyyy",
                      )
                    : ""}
              </span>
            </p>
          </div>
          <div className="w-full flex items-center justify-center md:justify-between flex-wrap-reverse gap-y-4 md:flex-nowrap">
            <WhiteButton
              text="Cancel"
              additionalStyle="border border-ahDarkGrey md:w-1/3 w-full"
              onClick={handleCancel}
            />
            <BlueButton
              text={`${contextData.pageData.dialogType === "add" ? "Add" : contextData.pageData.dialogType === "delete" ? "Delete" : ""}`}
              additionalStyle="w-full md:w-1/3"
              onClick={handleSubmit}
            />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ConfirmationDialog;
