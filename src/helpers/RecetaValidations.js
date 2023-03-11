export const titleValidation = {
  required: "Title is required.",
  minLength: {
    value: 10,
    message: "Title must be greater than 10.",
  },
  maxLength: {
    value: 70,
    message: "Title must be less than 70.",
  },
};

export const descriptionValidation = {
  required: "Description is required.",
  minLength: {
    value: 10,
    message: "Description must be greater than 10.",
  },
  maxLength: {
    value: 255,
    message: "Description must be less than 250.",
  },
};

export const ingredientValidation = {
  required: "Ingredient is required",
  minLength: {
    value: 1,
    message: "Ingredient must be greater than 1.",
  },
  maxLength: {
    value: 50,
    message: "Ingredient must be less than 50.",
  },
};

export const instructionValidation = {
  required: "Instruction is required.",
  minLength: {
    value: 10,
    message: "Instruction must be greater than 10.",
  },
};

export const minutesValidation = {
  min: {
    value: 0,
    message: "Minutes must be greater than 0",
  },
  max: {
    value: 1440,
    message: "Minutes must be less than 24 hours( 1440 minutes ).",
  },
};
