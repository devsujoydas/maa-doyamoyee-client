export const formatDateDynamic = (dateStr) => {
  const currentLang = localStorage.getItem("i18nextLng")

  const d = new Date(dateStr);
  return d.toLocaleDateString(currentLang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
