function getSubscriptionExpDate(transactionDate, durationAmount, durationUnit) {
  let currentMonth = transactionDate.getMonth();
  let currentYear = transactionDate.getFullYear();

  if (durationUnit === "year") {
    currentYear += durationAmount;
  } else if (durationUnit === "month") {
    currentMonth += durationAmount;
  }

  // Handle the case when the month exceeds 11 (December)
  if (currentMonth > 11) {
    currentMonth = 0; // Reset to January
    currentYear += 1; // Move to the next year
  }

  // Create a new Date object with the updated month and year
  const resultDate = new Date(
    currentYear,
    currentMonth,
    transactionDate.getDate(),
    transactionDate.getHours(),
    transactionDate.getMinutes(),
    transactionDate.getSeconds(),
    transactionDate.getMilliseconds(),
  );
  return resultDate;
}

module.exports = getSubscriptionExpDate;
