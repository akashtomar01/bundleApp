// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").Target} Target
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  let targets = input.cart.lines
  // Only include cart lines with a quantity of two or more
  // and a targetable product variant
  .filter(line => line.quantity >= 2 )
  .map(line => {
    const variant = /** @type {ProductVariant} */ (line.merchandise);
    return /** @type {Target} */ ({
      // Use the variant ID to create a discount target
      productVariant: {
        id: variant.id
      }
    });
  });
  console.log("targets",JSON.stringify(targets))
  if (!targets.length) {
    // You can use STDERR for debug logs in your function
    console.error("No cart lines qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
const conditions = targets.filter((item)=>{
  return item.productVariant.id == "gid://shopify/ProductVariant/46812001042747"
})

if (!conditions.length) {
  // You can use STDERR for debug logs in your function
  console.error("No cart lines qualify for volume discount.");
  return EMPTY_DISCOUNT;
}
targets = conditions
console.log('conditions',JSON.stringify(conditions))
  return {
    discounts: [
      {
        // Apply the discount to the collected targets
        targets,
        // Define a percentage-based discount
        value: {
          percentage: {
            value: "50.0"
          }
        }
      }
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.First
  };
};