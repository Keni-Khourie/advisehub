export interface SidebarItemDetails{
    text:string;
    link:string;
}

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