import { Badge } from '@/components/ui/badge';
const BeforeYouConfirmCard = () => {
  return (
    <div className="bg-ahCardBlue border w-full md:w-1/3 flex flex-col gap-y-2 rounded-lg pt-3 pb-8 px-3">
        <p className="font-semibold text-base">Before You Confirm</p>
        <p className="font-thin text-ahTextGrey text-sm">The system re-checks the selected time to prevent double-booking.</p>
        <div className="w-full flex justify-center mt-3">
          <Badge className="bg-green-100 text-green-600 px-3 py-1 font-semibold">Conflict-free check</Badge>
        </div>
        </div>
  )
}

export default BeforeYouConfirmCard