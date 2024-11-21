import moment from "moment-timezone";
// import { AddressValidationResult, ConditionScale, PlaceType, ShippingTierValue } from "system-interface";
import { CognitoGroup, FulfillmentType, ReceivingOptions, SchedulerInputData, SchedulerTypes, ValidationResult } from "../types/systemType";
// import { defaultConditions } from "./resource/defaultConditions";

export function isValidEmail(email: string): boolean {
  // Regular expression pattern for validating email addresses
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

export function isJsonString(str: string): Boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/** CHECK VALID DECIMAL VALUE */

export function isValidDecimal(input: string): boolean {
  // Regular expression to match a valid decimal with maximum two decimal places
  const decimalPattern = /^[0-9]+(\.[0-9]{1,2})?$/;

  // Check if the input matches the decimal pattern
  return decimalPattern.test(input);
}

//** MANIPULATE FILE NAME: DELETE SPACE AND SPECIAL CHARACTERS */
export function formatFileName(fileName: string): string {
  let parts = fileName.split(".");
  let ext = parts.pop();
  let nameWithoutExt = parts.join(".");
  let removedSpecialChars = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, "");
  return `${removedSpecialChars}.${ext}`;
}

// //** GET HIGHEST PRIORITY ROLE */
// export function getHighestPriorityRole(groups: string[]): string {
//   const rolePriority = {
//     [CognitoGroup.SuperAdmin]: 6,
//     [CognitoGroup.Admin]: 5,
//     [CognitoGroup.SellerAdmin]: 4,
//     [CognitoGroup.Manager]: 3,
//     [CognitoGroup.Lister]: 2,
//     [CognitoGroup.Customer]: 1,
//   };

//   let highestPriorityRole: string | null = null;
//   let highestPriority = 0;

//   // Filter and check for valid groups
//   const validGroups = groups.filter(group => rolePriority[group] !== undefined);

//   if (validGroups.length === 0) {
//     throw new Error("Unauthorized request: No valid roles found. Access is denied due to invalid group information.");
//   }

//   for (const group of validGroups) {
//     const priority = rolePriority[group];
//     if (priority > highestPriority) {
//       highestPriority = priority;
//       highestPriorityRole = group;
//     }
//   }

//   return highestPriorityRole!;
// }

// export function formatUsPhoneNumber(phone: string): string {
//   if (!phone) {
//     return phone;
//   }
//   if (typeof phone === "number") {
//     phone = String(phone);
//   }

//   phone = phone.trim(); // Remove leading/trailing whitespace
//   if (phone.length === 0) {
//     return "";
//   }
//   // Check if the phone number already starts with a plus sign (+)
//   if (/^\+/.test(phone)) {
//     // If any country code is present, return the phone number as is
//     const digitsOnly = phone.replace(/\D/g, ""); // Remove all non-digit characters
//     if (digitsOnly.length === 11) {
//       return "+" + digitsOnly;
//     }
//     return phone;
//   } else if (phone.length === 11 && /^\d{11}$/.test(phone)) {
//     return "+" + phone;
//   }
//   // Define a regex pattern that matches the correct phone number formats without any country code
//   const regexPattern = /^((\d{10})|(\(\d{3}\)\s?\d{3}-\d{4})|(\d{3}-\d{3}-\d{4})|(\d{3}\s?\d{3}\s?\d{4}))$/;

//   // Check if the phone number matches the pattern for correct formats without any country code
//   if (regexPattern.test(phone)) {
//     // If it matches, prepend +1 and return the modified phone number
//     const digitsOnly = phone.replace(/\D/g, ""); // Remove all non-digit characters
//     return "+1" + digitsOnly;
//   } else {
//     // If it doesn't match, return the original phone number
//     // (assuming it's either already correct with a different issue or needs manual correction)
//     return phone;
//   }
// }

// export function getSellerGroupName(auctioneerId: number, userName: string): string {
//   try {
//     return `${auctioneerId}_${userName.toLowerCase().replaceAll(" ", "-")}`;
//   } catch (error: any) {
//     if (auctioneerId) {
//       return `${auctioneerId}`;
//     }
//     return "";
//   }
// }

// export function convertStringToNumberArray(values: string): number[] {
//   // Early return for invalid inputs
//   if (typeof values !== "string" || !values.trim()) {
//     return [];
//   }

//   // Determine if input matches allowed formats and process accordingly
//   let processedValues = /^(\[\d+(,\d+)*\]|\d+(,\d+)*)$/.test(values) ? JSON.parse(values[0] === "[" ? values : "[" + values + "]") : [];

//   // Convert to numbers and filter out invalid entries
//   return processedValues.map(Number).filter((num: number) => !isNaN(num) && isFinite(num));
// }

// /** Checks which fields are getting updated and returns an array of fields */
// export function getUpdatedFields(storedData: Object, newData: Object): string[] {
//   const fields = Object.keys(newData);
//   const changedFields: string[] = [];
//   for (let field of fields) {
//     const currentValue = storedData[field];
//     const newValue = newData[field];

//     if (currentValue !== newValue && field !== "modifiedAt") {
//       changedFields.push(field);
//     }
//   }

//   return changedFields;
// }

// /** GENERATE AN ALIAS FOR GIVEN NAME */
// export function generateAlias(input: string, aliasNumber?: number): string {
//   // Convert input to lowercase and replace spaces with underscores
//   let alias = input.toLowerCase().replace(/\s+/g, "_");

//   return alias;
// }

// /** FORMAT AN ALIAS DEPENDING ON EXISTING ALIAS */
// export function formatAliasByExistingAlias(input: string, existingAlias: string): string {
//   if (input === existingAlias) {
//     return input + "_1";
//   }
//   const serialNumber = Number(existingAlias.split(input)[1].slice(1));
//   if (!isNaN(serialNumber)) {
//     input += `_${serialNumber + 1}`;
//   }

//   return input;
// }

// //** THIS HELPER FUNCTION CONVERTS A VALUE TO AN ARRAY */
// export const transformToArray = <T>(value: T | T[]): T[] => {
//   return Array.isArray(value) ? value : [value];
// };

// /**
//  * `isValidShippingTiers` is a function that checks if a JSON string represents a valid list of shipping tiers.
//  * A valid list of shipping tiers is an array where each tier has a unique title.
//  *
//  * For example:
//  * isValidShippingTiers([{"title": "Standard", "value": 10}, {"title": "Express", "value": 20}])
//  * // returns true because "Standard" and "Express" are unique titles.
//  *
//  * isValidShippingTiers([{"title": "Standard",  "value": 10}, {"title": "Standard",  "value": 10}])
//  * // returns false because "Standard" is not a unique title.
//  */
// export const isValidShippingTiers = (shippingTiers: ShippingTierValue[]): boolean => {
//   if (!Array.isArray(shippingTiers)) {
//     return false;
//   }
//   const shippingTierSet: Set<string> = new Set(shippingTiers.map(tier => tier.title.toLowerCase()));
//   return shippingTierSet.size === shippingTiers.length;
// };

// /***
//  * THIS METHOD WILL BE USED TO FIND THE SET DIFFERENCE BETWEEN TWO ARRAYS
//  * PREREQUISITE -> NEED TO PASS TWO ARRAYS THAT CONTAIN UNIQUE VALUES
//  */
// export function getSetDifference(setA: any[], setB: any[]): any[] {
//   return setA.filter(element => !setB.includes(element));
// }

// /***
//  * THIS METHOD WILL BE USED TO FIND THE SET INTERSECTION BETWEEN TWO ARRAYS
//  * PREREQUISITE -> NEED TO PASS TWO ARRAYS THAT CONTAIN UNIQUE VALUES
//  */
// export function getSetIntersection(setA: any[], setB: any[]): any[] {
//   return setA.filter(element => setB.includes(element));
// }

// export function getReceivingOptionValue(fulfillment: string | undefined): ReceivingOptions {
//   let selectedOption = ReceivingOptions.PICKUP;
//   if (fulfillment) {
//     switch (fulfillment) {
//       case FulfillmentType.SHIPPING:
//         selectedOption = ReceivingOptions.SHIPPING;
//         break;
//       case FulfillmentType.PICKUP:
//         selectedOption = ReceivingOptions.PICKUP;
//         break;
//       case FulfillmentType.PICKUP_AND_SHIPMENT:
//         selectedOption = ReceivingOptions.PICKUP;
//         break;
//       default:
//         selectedOption = ReceivingOptions.PICKUP;
//         break;
//     }
//   }
//   return selectedOption;
// }

export const getSchedulerTimeFormat = (time: number = 0, timezone: string = "Asia/Dhaka"): string => {
  try {
    const schedulerTime = moment.unix(time).tz(timezone).format("YYYY-MM-DD HH:mm:ss");
    return schedulerTime.replaceAll(" ", "T");
  } catch (error: any) {
    return "";
  }
};

export const getSchedulerNameByType = (inputData: SchedulerInputData): string => {
  if (!inputData) return "";

  let schedulerName = "";
  switch (inputData?.eventType) {
    case SchedulerTypes.NOTIFY_SELLER_BEFORE_AUCTION_GO_LIVE:
      schedulerName = `NOTIFY-SELLER-BEFORE-AUCTION-LIVE-${inputData.id}`;
      break;
    case SchedulerTypes.AUCTION_MAKE_LIVE:
      schedulerName = `SCHEDULING-LIVE-AUCTION-${inputData.id}`;
      break;
    case SchedulerTypes.PRODUCT_WINNER:
      schedulerName = `PRODUCT-ORDER-${inputData.order}-AUCTION-${inputData.auctionId}`;
      break;
    case SchedulerTypes.WISHLIST_NOTIFICATION:
      schedulerName = `WISHLIST-NOTIFICATION-AUCTION-${inputData.auctionId}`;
      break;
    case SchedulerTypes.NOTIFY_SELLER_AFTER_DELAYING_LIVESTREAM:
      schedulerName = `NOTIFY_SELLER_AFTER_DELAYING_LIVESTREAM-${inputData.id}`;
      break;
    default:
      schedulerName = "";
      break;
  }

  return schedulerName;
};

// export const addDelayToSchedulerTime = (epochTime: number = 0, delay = process.env.SCHEDULER_DELAY_TIME ?? 0): number => {
//   return moment.unix(epochTime).add(delay, "seconds").unix();
// };

// /**
//  * Validates an array of ConditionScale objects and ensures that a default condition exists.
//  *
//  * This function checks if the input string is a valid JSON array of ConditionScale objects.
//  * Each ConditionScale object must have a scaleName  with a maximum length of 80 characters,
//  * and a value array containing at least one condition object. Each condition object must
//  * have a 'condition' property with a maximum length of 50 characters, and a 'description'
//  * property with a maximum length of 180 characters. Additionally, it ensures that there is
//  * exactly one default condition scale.
//  *
//  * @param {string} data - The JSON string representing the array of ConditionScale objects.
//  * @param {object} defaultCondition - The default condition to be validated.
//  * @returns {ValidationResult} - The result of the validation. If the validation fails,
//  * an appropriate error message is provided.
//  */
// export function validateConditionScales(data: string, defaultCondition: ConditionScale = defaultConditions): ValidationResult {
//   try {
//     const parsedData: ConditionScale[] = JSON.parse(data);
//     // Ensure the input is an array
//     if (!Array.isArray(parsedData)) {
//       return {
//         isValid: false,
//         message: "The input data must be a JSON array of Condition Scales. Please ensure the input is correctly formatted.",
//       };
//     }

//     // Ensure array is not empty and has at least one object and no more than 50 objects
//     if (parsedData.length === 0) {
//       return {
//         isValid: false,
//         message: "The Condition Scale array cannot be empty. Please provide at least one Condition Scale.",
//       };
//     }

//     if (parsedData.length > 50) {
//       return {
//         isValid: false,
//         message: "The number of condition scales exceeds the allowed limit. Please ensure the array contains no more than 50 condition scales.",
//       };
//     }

//     const scaleNames = new Set<string>();
//     const conditionSets = new Map<string, Set<string>>();
//     let isDefaultCount = 0;
//     let defaultConditionDelete = true;
//     let defaultConditionUpdated = false;

//     for (const conditionScale of parsedData) {
//       if (!conditionScale.hasOwnProperty("scaleName") || typeof conditionScale.scaleName !== "string") {
//         return {
//           isValid: false,
//           message: "The 'scaleName ' property is missing or is not of type string in the Condition Scale array.",
//         };
//       }

//       // Check if scaleName  length exceeds 80 characters
//       if (conditionScale.scaleName.length > 80) {
//         return {
//           isValid: false,
//           message: `The scale name '${conditionScale.scaleName}' exceeds the maximum allowed length of 80 characters.`,
//         };
//       }

//       // Check for unique scaleName
//       if (scaleNames.has(conditionScale.scaleName)) {
//         return {
//           isValid: false,
//           message: `The scale name '${conditionScale.scaleName}' must be unique. Please provide a different name.`,
//         };
//       }
//       scaleNames.add(conditionScale.scaleName);

//       // Ensure value is an array and contains at least one condition object
//       if (!Array.isArray(conditionScale.value) || conditionScale.value.length === 0) {
//         return {
//           isValid: false,
//           message: `The scale '${conditionScale.scaleName}' must have a 'value' array with at least one condition.`,
//         };
//       }

//       const conditionNumbers = new Set<string>();
//       const normalizedConditions = new Set<string>();

//       // Validate each condition object in the value array
//       for (const condition of conditionScale.value) {
//         if (!condition.hasOwnProperty("condition") || typeof condition.condition !== "string") {
//           return {
//             isValid: false,
//             message: `The 'condition' property is missing or is not of type string in the scale '${conditionScale.scaleName}'.`,
//           };
//         }
//         if (!condition.hasOwnProperty("description") || typeof condition.description !== "string") {
//           return {
//             isValid: false,
//             message: `The 'description' property is missing or is not of type string in the scale '${conditionScale.scaleName}'.`,
//           };
//         }
//         if (condition.condition.trim() === "") {
//           return {
//             isValid: false,
//             message: `The condition in the scale '${conditionScale.scaleName}' cannot be empty. Please provide a valid condition.`,
//           };
//         }

//         if (condition.condition.length > 50) {
//           return {
//             isValid: false,
//             message: `The condition '${condition.condition}' in the scale '${conditionScale.scaleName}' exceeds the maximum allowed length of 50 characters.`,
//           };
//         }
//         if (condition.condition.trim() !== "" && condition.description.length > 180) {
//           return {
//             isValid: false,
//             message: `The description of the condition '${condition.condition}' in the scale '${conditionScale.scaleName}' exceeds the maximum allowed length of 180 characters.`,
//           };
//         }

//         // Normalize the condition
//         const normalizedCondition = normalizeString(condition.condition);

//         // Check for unique condition numbers within a scale
//         if (conditionNumbers.has(normalizedCondition)) {
//           return {
//             isValid: false,
//             message: `The condition '${condition.condition}' in the scale '${conditionScale.scaleName}' must be unique. Please remove duplicates.`,
//           };
//         }
//         conditionNumbers.add(normalizedCondition);
//         normalizedConditions.add(normalizedCondition);
//       }

//       // Check for multiple isDefault true within ConditionScale
//       if (conditionScale.isDefault) {
//         isDefaultCount++;
//       }

//       // Check for duplicate sets of conditions
//       const normalizedConditionsString = JSON.stringify(Array.from(normalizedConditions).sort());
//       if (conditionSets.has(normalizedConditionsString)) {
//         return {
//           isValid: false,
//           message: `The scale '${conditionScale.scaleName}' has a duplicate set of conditions. Each set of conditions must be unique.`,
//         };
//       }
//       conditionSets.set(normalizedConditionsString, conditionNumbers);

//       //** Check Vendidit default condition scale is not deleted */
//       if (conditionScale.isVendiditDefault && areConditionScalesEqual(conditionScale, defaultCondition)) {
//         defaultConditionDelete = false;
//       }

//       // Check Vendidit default condition scale is not updated
//       if (conditionScale.isVendiditDefault && !areConditionScalesEqual(conditionScale, defaultCondition)) {
//         defaultConditionUpdated = true;
//       }
//     }

//     if (isDefaultCount > 1) {
//       return {
//         isValid: false,
//         message: "Only one scale can be marked as default. Please ensure only one scale is set as default.",
//       };
//     }

//     if (defaultConditionUpdated) {
//       return {
//         isValid: false,
//         message: "The default Vendidit condition scale cannot be updated. Please ensure the default condition scale is not modified.",
//       };
//     }
//     if (defaultConditionDelete) {
//       return {
//         isValid: false,
//         message: "The default Vendidit condition scale cannot be deleted. Please ensure the default condition scale is not removed.",
//       };
//     }

//     //** IF DEFAULT CONDITION SCALE IS NOT PRESENT */
//     if (isDefaultCount === 0) {
//       //** MAKE VENDIDIT  DEFAULT AS A DEFAULT */
//       parsedData.forEach(conditionScale => {
//         if (areConditionScalesEqual(conditionScale, defaultCondition)) {
//           conditionScale.isDefault = true;
//         }
//       });
//     }

//     return {
//       isValid: true,
//       message: "The Condition Scales are valid.",
//       validatedData: JSON.stringify(parsedData),
//     };
//   } catch (error: any) {
//     return {
//       isValid: false,
//       message: "The input data must be a JSON array of Condition Scales. Please ensure the input is correctly formatted",
//     };
//   }
// }

// /**
//  * Determines if two `ConditionScale` objects are considered equal based on their `scaleName` and the conditions within their `value` arrays.
//  * The comparison of `scaleName` and each `condition` in the `value` arrays is case-insensitive and space-insensitive.
//  *
//  * @param {ConditionScale} scale1 - The first `ConditionScale` object to compare.
//  * @param {ConditionScale} scale2 - The second `ConditionScale` object to compare.
//  * @returns {boolean} - Returns `true` if both `scaleName` properties match (case and space insensitive) and if every `condition` in the `value` arrays of both objects also match (case and space insensitive). Otherwise, returns `false`.
//  */
// const areConditionScalesEqual = (scale1: ConditionScale, scale2: ConditionScale): boolean => {
//   return (
//     normalizeString(scale1.scaleName) === normalizeString(scale2.scaleName) &&
//     scale1.value.length === scale2.value.length &&
//     scale1.value.every((cond, index) => normalizeString(cond.condition) === normalizeString(scale2.value[index].condition))
//   );
// };

// /**
//  * Normalizes a string to ensure case and space insensitivity.
//  * This function converts the input string to lowercase, removes extra spaces,
//  * and ensures there is only one space between words.
//  *
//  * @param {string} str - The string to be normalized.
//  * @returns {string} - The normalized string with all characters in lowercase, trimmed,
//  * and with only one space between words.
//  */
// // Normalize conditions to lowercase, trim, and ensure only one space between words
// export const normalizeString = (str: string): string =>
//   str
//     .toLowerCase()
//     .trim()
//     .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII characters
//     .replace(/\u00A0/g, " ") // Replace non-breaking spaces with regular spaces
//     .replace(/\s+/g, " "); // Replace multiple spaces with a single space

// /**
//  * Validates if a given condition exists within a specified ConditionScale.
//  * The function normalizes the input condition string by converting it to lowercase
//  * and removing spaces before comparison, ensuring case and space insensitivity.
//  *
//  * @param {string} condition - The condition string to validate.
//  * @param {ConditionScale} conditionScale - The ConditionScale object containing an array of conditions.
//  * @returns {boolean} - Returns true if the condition exists within the conditionScale, otherwise false.
//  */
// export function isConditionValidInScale(condition: string, conditionScale: ConditionScale): boolean {
//   // Check if the normalized condition exists within the conditionScale's values.
//   return conditionScale.value.some(conditionObj => normalizeString(conditionObj.condition) === normalizeString(condition));
// }

// /**
//  * CHECK CONDITION SCALE IS IN CONDITION SCALE ARRAY
//  *
//  * This function checks if a given condition scale is present in an array of condition scales.
//  * The comparison is based on matching both the scaleName  and the value array of conditions.
//  *
//  * @param {ConditionScale} conditionScale - The condition scale to check.
//  * @param {ConditionScale[]} conditionScales - The array of condition scales to search within.
//  * @returns {boolean} - True if the condition scale is found in the array, false otherwise.
//  */
// export function isConditionScaleInArray(conditionScale: ConditionScale, conditionScales: ConditionScale[]): boolean {
//   return conditionScales.some(scale => {
//     if (scale.scaleName !== conditionScale.scaleName) {
//       return false;
//     }

//     if (scale.value.length !== conditionScale.value.length) {
//       return false;
//     }

//     return scale.value.every((condition, index) => {
//       const targetCondition = conditionScale.value[index];
//       return (
//         normalizeString(condition.condition) === normalizeString(targetCondition.condition) && condition.description === targetCondition.description
//       );
//     });
//   });
// }

// export const TransformNumber = ({ value }) => {
//   if (typeof value === "string") {
//     if (value === "") return undefined;
//     return parseInt(value);
//   }
// };

// export function IsThresholdTimeExceeds(thresholdTime: number, roundOffTime: number = 120): boolean {
//   const currentTime = moment().unix();
//   const orderChangeThreshold = moment
//     .unix(thresholdTime)
//     .subtract(roundOffTime - 10, "seconds")
//     .unix();
//   return currentTime >= orderChangeThreshold;
// }
// /**
//  * Validates if a given string is a valid JSON and contains the required address properties.
//  *
//  * @param addressString - The address string to validate.
//  * @returns {AddressValidationResult} - An object containing isValid boolean and an optional error message.
//  */
// export function validateAddress(addressString: string): AddressValidationResult {
//   if (!isJsonString(addressString)) {
//     return {
//       isValid: false,
//       message: "The provided address is not in a valid JSON format.",
//     };
//   }

//   const address: PlaceType = JSON.parse(addressString);

//   if (!address.description || !address.structured_formatting) {
//     return {
//       isValid: false,
//       message: "The address must include both a valid description and structured formatting.",
//     };
//   }

//   return {
//     isValid: true,
//   };
// }
