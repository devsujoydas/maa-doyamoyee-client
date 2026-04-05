export const formatDateDynamic = (dateStr) => {
  const currentLang = localStorage.getItem("i18nextLng")

  const d = new Date(dateStr);
  return d.toLocaleDateString(currentLang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};


export const formatDynamicDate = (dateString) => {
  if (!dateString) return "";

  const now = new Date();
  const date = new Date(dateString);

  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  // Central language control
  const currentLang = localStorage.getItem("i18nextLng") || "en-US";
  const isBangla = currentLang === "bn-BD";

  if (diffSec < 60) return isBangla ? `${diffSec} সেকেন্ড আগে` : `${diffSec} sec ago`;
  if (diffMin < 60) return isBangla ? `${diffMin} মিনিট আগে` : `${diffMin} min ago`;
  if (diffHrs < 24) return isBangla ? `${diffHrs} ঘণ্টা আগে` : `${diffHrs}h ago`;
  if (diffDays < 7) return isBangla ? `${diffDays} দিন আগে` : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  // Older than 7 days → show date
  const options = { day: "numeric", month: "short", year: "numeric" };
  if (isBangla) {
    // Bangla digits
    const banglaDigits = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
    const dateStr = date.toLocaleDateString("en-US", options); // e.g., 5 Apr 2026
    return dateStr.replace(/\d/g, (d) => banglaDigits[d]);
  } else {
    return date.toLocaleDateString(undefined, options); // e.g., 5 Apr 2026
  }
};