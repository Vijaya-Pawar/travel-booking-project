// Calculate total price
const calculateTotalPrice = (price, passengersCount) => {
  return price * passengersCount;
};

// Generate random reference ID (for bookings)
const generateReferenceId = () => {
  return Math.random().toString(36).substring(2, 12);
};

module.exports = {
  calculateTotalPrice,
  generateReferenceId,
};