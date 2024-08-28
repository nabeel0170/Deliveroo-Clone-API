export const emailAndPassword: { email: string; password: string }[] = [
  { email: "john.doe@example.com", password: "password123" },
  { email: "jane.smith@example.com", password: "securePass456" },
  { email: "alice.johnson@example.com", password: "aliceSecure789" },
  { email: "bob.brown@example.com", password: "bobPassword101" },
  { email: "charlie.davis@example.com", password: "charlieSecure202" },
  { email: "okay@email.com", password: "okayPassword303" },
];

export const verifyUserEmail = async (email: string) => {
  const user = emailAndPassword.find((user) => user.email === email);
  if (user) {
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
export const verifyLogin = async (email: string, password: string) => {
  const user = await emailAndPassword.find((user) => user.email === email);
  if (user && user.password === password) {
    return true;
  } else {
    return false;
  }
};
