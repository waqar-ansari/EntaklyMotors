import { setTotalPrice } from "../slices/totalPriceSlice";

export const calculateTotalPrice = () => (dispatch, getState) => {
  const state = getState(); // Get entire Redux state

  const { pickupDate, returnDate } = state.rentalDetail;
  const { price } = state.selectedCar;
  const { packagePrice } = state.selectedPackage;
  const selectedAddons = state.selectedAddon; // Extract selected addons array

  // Extract addon prices
  const addonPrices = selectedAddons.map(addon => addon.price);
  

  const totalAddonPrice = addonPrices.reduce((total, price) => total + price, 0);

  


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

  const numberOfRentalDays = calculateNumberOfDays(pickupDate, returnDate);

  const carPricePerDay = price;
  const currentPackagePrice = packagePrice ? packagePrice : 0;

  const totalPrice =
    numberOfRentalDays * carPricePerDay + currentPackagePrice + totalAddonPrice;

  dispatch(setTotalPrice(totalPrice)); // ✅ Dispatch the calculated price
};
