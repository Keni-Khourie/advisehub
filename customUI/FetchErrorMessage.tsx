import React from 'react'

interface Props{
    message?:string,
    dataName?:string
}
const FetchErrorMessage = ({message, dataName}:Props) => {
  return (
    <div className="w-full">
        <p className="w-full text-center font-thin text-ahTextGrey">{message?message:`Error fetching ${dataName?dataName:"data"}`}</p>
    </div>
  )
}

export default FetchErrorMessage