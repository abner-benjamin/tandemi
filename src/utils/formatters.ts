
/**
 * Formats a number with appropriate thousands separators
 * @param num - The number to format
 * @returns The formatted number as a string with commas
 */
export const formatNumber = (num: number | string): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Formats a currency amount with dollar sign and commas
 * @param amount - The amount to format
 * @param decimals - Number of decimal places to show (default: 0)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, decimals: number = 0): string => {
  return "$" + formatNumber(amount.toFixed(decimals));
};

/**
 * Safely converts a string or Date to a valid Date object
 * @param dateValue - The date value to convert
 * @returns A valid Date object or the current date if invalid
 */
export const toValidDate = (dateValue: string | Date): Date => {
  try {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return isNaN(date.getTime()) ? new Date() : date;
  } catch (e) {
    return new Date();
  }
};
