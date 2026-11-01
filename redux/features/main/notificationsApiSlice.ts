import { ApiSlice } from "@/redux/services/apiSlice";
import {NotificationType} from "@/types/types"

export interface NotificationResponse{
id:number;
type:NotificationType;
title:string;
message:string;
isRead:boolean;
appointmentId:number
createdAt:number
}
export interface PaginatedNotificationResponse{
    notification:NotificationResponse[],
    pagination:{
        page:number;
        limit:number;
        totalCount:number;
        totalPages:number;
        hasNextPage:boolean;
        hasPreviousPage:boolean;
    },
    unreadCount:number
}
export interface NonPaginatedNotificationResponse{
    notification:NotificationResponse[],
    unreadCount:number
}

const notificationsApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getNotifications:builder.query<PaginatedNotificationResponse, {page:number, limit:number}>({
            query:({page, limit})=>({
                url:"/notifications",
                method:"GET",
                params:{
                    page:page,
                    limit:limit
                }
            }),
            providesTags:["Notifications"]
        }),
        markNotificationAsRead:builder.mutation<NotificationResponse, number>({
            query:(notificationId)=>({
                url:`/notifications/${notificationId}`,
                method:"PATCH"
            }),
            invalidatesTags: (data)=>data? ["Notifications", {type: "Notifications", id:data.id}]:[]
        }),
        getUnreadNotifications:builder.query<NonPaginatedNotificationResponse, void>({
            query:()=>({
                url:"/notifications/unread",
                method:"GET"
            }),
            providesTags:["Notifications"]
        })
    })
})

export const {useGetNotificationsQuery, useMarkNotificationAsReadMutation, useGetUnreadNotificationsQuery} =notificationsApiSlice
export default notificationsApiSlice.reducer