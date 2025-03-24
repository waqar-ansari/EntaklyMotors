"use client"
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookingConfirmation = () => {
  const bookingDetails = {
    carName: "Hyundai Getz or similar",
    pickupLocation: "Dubai - Downtown",
    dropoffLocation: "Dubai Hills",
    pickupDate: "Sat 27 Apr 2013",
    pickupTime: "10:00",
    dropoffDate: "Tue 30 Apr 2013",
    dropoffTime: "10:00",
    address: "JBR Dubai",
    totalCost: "AED 200.00",
    cancellationPolicy: "FREE Cancellation",
    amendmentPolicy: "FREE Amendment",
  };

  return (
     <>
          <Header />
        <div className="container mx-auto p-4 bg-gray-100">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Booking Confirmed</h2>
            <div className="bg-green-100 p-3 text-sm text-green-800 rounded">
              This air-conditioned model is ideal for families or small groups as it offers room for 5 passengers
              and 3 pieces of luggage.
            </div>
            <div className="flex mt-4 gap-6">
              <div>
                <img src="https://www.sixt.com/fileadmin2/files/global/sideview/user_upload/fleet/png/752x500/gac-ga4-4d-silver-2022.png" alt="Car" className="w-48 rounded" />
                <h3 className="text-blue-600 font-semibold mt-2">{bookingDetails.carName}</h3>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="border p-4 rounded">
                  <h4 className="font-bold">Pick Up:</h4>
                  <p>{bookingDetails.pickupLocation}</p>
                  <p>{bookingDetails.pickupDate}</p>
                  <p>{bookingDetails.pickupTime}</p>
                </div>
                <div className="border p-4 rounded">
                  <h4 className="font-bold">Drop Off:</h4>
                  <p>{bookingDetails.dropoffLocation}</p>
                  <p>{bookingDetails.dropoffDate}</p>
                  <p>{bookingDetails.dropoffTime}</p>
                </div>
                {/* <div className="border p-4 rounded col-span-2">
                  <h4 className="font-bold">Location:</h4>
                  <p>{bookingDetails.address}</p>
                </div> */}
              </div>
            </div>
            <div className="flex gap-4 mt-4 text-green-600">
              <p>✔ {bookingDetails.cancellationPolicy}</p>
              <p>✔ {bookingDetails.amendmentPolicy}</p>
            </div>
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-bold">Summary of Charges</h3>
              <div className="flex justify-between mt-2">
                <p>Total Rental Cost</p>
                <p className="font-bold">{bookingDetails.totalCost}</p>
              </div>
              <p className="text-sm text-gray-500">Rental Cost Payable on Arrival</p>
            </div>
          </div>
        </div>
          <Footer />
     </>
  );
};

export default BookingConfirmation;
