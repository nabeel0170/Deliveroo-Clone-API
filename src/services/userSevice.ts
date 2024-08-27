export const emails: string[] = [
  "john.doe@example.com",
  "jane.smith@example.com",
  "alice.johnson@example.com",
  "bob.brown@example.com",
  "charlie.davis@example.com",
  "okay@email.com",
];

export const verifyUserEmail = async (email: string) => {
  if (emails.includes(email)) {
    const result = {
      Email: email,
      success: true,
    };
    return result;
  } else {
    const result = {
      Email: email,
      success: false,
    };
    return result;
  }
};
