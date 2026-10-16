import PageHeader from "@/customUI/PageHeader"
import SearchableSelect from "./SearchableSelect"

const CreateAdvisingNoteContent = () => {
  return (
    <div className="w-full">
        <PageHeader headerText="Add Advising Note" subtitle="Create Note and choose visibility"/>

        <SearchableSelect/>
        
    </div>
  )
}

export default CreateAdvisingNoteContent