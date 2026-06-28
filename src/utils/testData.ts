export const loginTestData = {
  baseUrl: 'https://practicetestautomation.com',
  validUser: {
    username: 'student',
    password: 'Password123',
  },
  invalidUser: {
    username: 'incorrectUser',
    password: 'Password123',
  },
  invalidPassword: {
    username: 'student',
    password: 'incorrectPassword',
  },
  errorMessages: {
    invalidUsername: 'Your username is invalid!',
    invalidPassword: 'Your password is invalid!',
  },
} as const;
