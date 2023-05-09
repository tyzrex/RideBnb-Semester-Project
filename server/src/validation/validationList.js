import { check } from "express-validator";

function validateVehiclePost() {
  return [
    check("vehicleName")
      .notEmpty()
      .withMessage("Vehicle name is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("Vehicle name should be between 3 and 20 characters"),

    check("vehicleType")
      .notEmpty()
      .withMessage("Vehicle type is required")
      .isAlphanumeric()
      .withMessage("Vehicle type should be alphanumeric"),

    check("vehicleMakeYear")
      .notEmpty()
      .withMessage("Vehicle make year is required")
      .isNumeric()
      .withMessage("Vehicle make year should be numeric"),

    check("vehicleBrand")
      .notEmpty()
      .withMessage("Vehicle brand is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("Vehicle brand should be between 3 and 20 characters"),

    check("address")
      .notEmpty()
      .withMessage("Address is required")
      .isAlphanumeric()
      .withMessage("Address should be alphanumeric")
      .isLength({ min: 3, max: 20 })
      .withMessage("Address should be between 3 and 20 characters"),

    check("vehicleColor").notEmpty().withMessage("Vehicle color is required"),

    check("pricePerDay")
      .notEmpty()
      .withMessage("Price per day is required")
      .isFloat({ min: 0 })
      .withMessage("Price per day should be number"),

    check("vehicleDescription")
      .notEmpty()
      .withMessage("Vehicle description is required"),

    // check("vehiclefile").notEmpty().withMessage("Vehicle image is required"),

    check("listingType").notEmpty().withMessage("Listing type is required"),

    check("features").notEmpty().withMessage("Features is required"),

    check("numberPlate").notEmpty().withMessage("Number plate is required"),
  ];
}

export { validateVehiclePost };

// body("vehicleName").notEmpty().isString(),
// body("vehicleType").notEmpty().isString(),
// body("vehicleMakeYear").notEmpty().isNumeric(),
// body("vehicleBrand").notEmpty().isString(),
// body("address").notEmpty().isString(),
// body("vehicleColor").notEmpty().isString(),
// body("pricePerDay").notEmpty().isNumeric(),
// body("vehicleDescription").notEmpty().isString(),
// body("vehiclefile").notEmpty().isString(),
// body("listingType").notEmpty().isString(),
// body("features").notEmpty().isString(),
// body("numberPlate").notEmpty().isString(),
