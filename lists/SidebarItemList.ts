export interface SidebarItemDetails{
    text:string;
    link:string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const user:any = {}
export const getSidebarItemsBasedOnUser = ()=>{
  const sidebarItems:SidebarItemDetails[] = user?.role=="STUDENT"?studentSidebarItems:user?.role==="ADVISOR"?advisorSidebarItems:[]
  return sidebarItems}
export const studentSidebarItems: SidebarItemDetails[] =[
    {
        text:"Dashboard",
        link:"/dashboard"
    },
    {
        text:"Appointments",
        link:"/appointments"
    },
    {
        text:"Degree Progress",
        link:"/degree-progress"
    },
]

export const advisorSidebarItems:SidebarItemDetails[] =[
    {
        text:"Dashboard",
        link:"/dashboard"
    },
    {
        text:"Availability",
        link:"/availability"
    },
    {
        text:"Appointments",
        link:"/appointments"
    },
    {
        text:"Students",
        link:"/students"
    },
    {
        text:"Advising Notes",
        link:"/advising-notes"
    },
]