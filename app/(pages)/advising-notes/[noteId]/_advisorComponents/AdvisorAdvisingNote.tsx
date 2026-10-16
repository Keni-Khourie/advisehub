"use client"
import PageHeader from '@/customUI/PageHeader';
import WhiteButton from '@/customUI/WhiteButton';
import Link from 'next/link';

interface Props{
    noteId:number
}

const AdvisorAdvisingNote = ({noteId}:Props) => {
  return (
    <div className="w-full">
        <PageHeader headerText="Advising Note" subtitle="View note made during meeting" additionalClass="mb-10"/>
        <Link href="/advising-notes" className="">
        
        <WhiteButton text="← Back to all notes" additionalStyle="border border-ahBorderBlue py-2 shadow-sm mb-10"/>
        </Link>
        <p>{`Note ID: ${noteId}`}</p>
    </div>
  )
}

export default AdvisorAdvisingNote