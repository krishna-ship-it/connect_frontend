export const isEmail = (email) => {
  if (!email.includes("@") || !email.includes(".") || email.length < 3)
    return false;
  return true;
};
