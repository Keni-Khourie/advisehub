export interface ErrorResponse {
    data: {
      message?: string;
      detail?: string;
    };
  }

export interface GenericMessageResponse{
  message:string
}

export interface SelectItemData {
  title: string;
  value: string;
}