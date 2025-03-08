import { setTotalPrice } from "../slices/totalPriceSlice";

export const calculateTotalPrice = () => (dispatch,getState) => {
  const state = getState(); // Get entire Redux state
  console.log("entire state");
  
  const { pickupDate, returnDate } = state.rentalDetail;
  const { price } = state.selectedCar;
//   const { selectedPackage } = state.selectedPackage;
//   const { activeAddons } = state.activeAddons;

if (!pickupDate || !returnDate || !price) {
    dispatch(setTotalPrice(0)); // ✅ Ensure it always updates the state
    return;
  }

  const calculateNumberOfDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
   return Math.max(1, timeDifference / (1000 * 3600 * 24));
  };

  const numberOfRentalDays = calculateNumberOfDays(
    pickupDate,
    returnDate
  );


  const carPricePerDay = price;
//   const packagePrice = selectedPackage ? 30 : 0;
//   const addonPrice = Object.keys(activeAddons).length * 10;

  const totalPrice = numberOfRentalDays * carPricePerDay + 400
//   + packagePrice + addonPrice;
console.log(totalPrice,"total price from thunk");

  dispatch(setTotalPrice(totalPrice)); // ✅ Dispatch the calculated price
};