export const saveEmailToLocalStorage = (email) => {
  localStorage.setItem("userEmail", email);
};

export const getEmailFromLocalStorage = () => {
  const storedEmail = localStorage.getItem("userEmail");
  return storedEmail ? storedEmail : "";
};

export const RemoveEmailFromStorage = () => {
    localStorage.removeItem('userEmail');
}
