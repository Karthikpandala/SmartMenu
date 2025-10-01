export const loginService = async (email, password) => {
  // mock login
  if(email === "admin@example.com" && password === "admin") {
    return { id: 1, name: "Admin", role: "staff" };
  } 
  return { id: 2, name: "Customer", role: "customer" };
};

export const signupService = async (name, email, password) => {
  return { id: Math.random(), name, email, role: "customer" };
};
