import { preetiCharMap } from "../constants";

/**
 * Converts a English character to its corresponding Preeti character.
 * @param {string} key - The English char to convert
 * @returns {string} - The corresponding Preeti character.
 */
export const handlePreetiCharMap = (key: string) => {
  return preetiCharMap[key];
};
