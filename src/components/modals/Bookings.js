import api from "@/app/api/axiosInstance";
import React, { useEffect, useState } from "react";

const Bookings = () => {
  const [customerBookings, setCustomerBookings] = useState([]);

useEffect(()=>{
  const localUserId = localStorage.getItem("userId")
const fetchBookings =async()=>{

  console.log(localUserId,"userId");
  
  const responce = await api.post("/getallcarbooking.php",{userId:localUserId})
setCustomerBookings(responce.data)
}
fetchBookings()
},[])
console.log(customerBookings,"customerBookings");

  return (
    <>
      <h3 style={{marginBottom:20}}>Bookings content goes here</h3>
      <div>

      </div>
    </>
  );
};

export default Bookings;
