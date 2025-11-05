import crypto from "crypto-js";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_PHONE_SECRET_KEY || "";
console.log("🚀 ~ ENCRYPTION_KEY:", ENCRYPTION_KEY)
const key = crypto.SHA256(ENCRYPTION_KEY);
const iv = crypto.enc.Hex.parse("00000000000000000000000000000000");

/**
 * AES deterministic decryption helper
 */
export const decryptDeterministic = (encryptedText: string): string => {
  try {
    if (!encryptedText) return "";
    const decrypted = crypto.AES.decrypt(encryptedText, key, { iv });
    const result = decrypted.toString(crypto.enc.Utf8);
    if (!result) throw new Error("Decryption returned empty string");
    return result;
  } catch (error) {
    console.error("❌ Decryption failed:", error);
    return encryptedText; // return original if fails
  }
};

/**
 * Normalizes encrypted or raw phone numbers into country + national parts
 */
export const normalizePhoneNumber = (rawPhone: string) => {
  const decryptedNumber = decryptDeterministic(rawPhone);
  const numberToParse = decryptedNumber || rawPhone;

  try {
    const parsed = parsePhoneNumberFromString(numberToParse);
    return {
      countryCode: parsed?.countryCallingCode
        ? `+${parsed.countryCallingCode}`
        : null,
      mobileNumber: parsed?.nationalNumber || numberToParse,
      fullPhoneNumber: parsed?.formatInternational() || numberToParse,
    };
  } catch (err) {
    console.error("❌ normalizePhoneNumber parse failed:", err);
    return {
      countryCode: null,
      mobileNumber: numberToParse,
      fullPhoneNumber: numberToParse,
    };
  }
};
