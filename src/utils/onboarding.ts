export const setOnboarded = () => {
  localStorage.setItem("onboarded", "true");
};
export const getOnboarded = () => {
  return localStorage.getItem("onboarded");
};
