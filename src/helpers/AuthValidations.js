/*
    TODO: Hacer conexion con el backend
        inputValidtion = {
            validate: { // puede hacer peticiones async/await
                checkUrl: async () => await fetch()
                    || 'error message'
            // Se esperaria la validacion del backend
            }
        }
*/
export const usernameLoginValidations = {
  required: "Username is required.",
};

export const passwordLoginValidations = {
  required: "Password is required.",
};

export const usernameValidations = {
  required: "Username is required.",
  validate: (value) =>
    /^[A-Za-z][A-Za-z0-9_]{3,21}$/g.test(value)
      ? true
      : `Username can't contain whitespaces`,
  minLength: {
    value: 4,
    message: "Username must be greater than 3",
  },
  maxLength: {
    value: 20,
    message: "Username must be less than 20",
  },
};

export const firstNameValidations = {
  required: "First name is required",
  minLength: {
    value: 2,
    message: "First name must be greater than 3",
  },
  maxLength: {
    value: 20,
    message: "First name must be less than 20",
  },
};
export const lastNameValidations = {
  required: "Last name is required",
  minLength: {
    value: 2,
    message: "Last name must be greater than 3",
  },
  maxLength: {
    value: 20,
    message: "Last name must be less than 20",
  },
};

export const emailValidations = {
  required: "Email is required.",
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "This is a email?.",
  },
};

export const passwordValidations = {
  required: "Password is required.",
  pattern: {
    value: /^(?=\w*\d)(?=\w*[A-Z])/,
    message: "Password Should be an Uppercase letter and a number.",
  },
  minLength: {
    value: 6,
    message: "Password must be greater than 6.",
  },
  maxLength: {
    value: 30,
    message: "Password must be less than 30",
  },
};
