import api from "@/app/api/axiosInstance";
import React, { useEffect } from "react";

const Bookings = () => {

useEffect(()=>{
  const localUserId = localStorage.getItem("userId")
const fetchBookings =async()=>{

  console.log(localUserId,"userId");
  
  const responce = await api.get("/getcarbooking.php",{localUserId})
}
fetchBookings()
},[])


  return (
    <>
      <h3 style={{marginBottom:20}}>Bookings content goes here</h3>
    </>
  );
};

export default Bookings;
