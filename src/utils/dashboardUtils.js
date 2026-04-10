export const filterByYear = (data, field, year) => {

  return data?.filter((item) => {
    const d = new Date(item[field]);
    return d.getFullYear() === year;
  });
};

export const generateMonthlyData = (data, dateField, valueField = null) => {
  const map = {};

  data.forEach((item) => {
    const date = new Date(item[dateField]);
    const month = date.toLocaleString("default", { month: "short" });

    if (!map[month]) map[month] = 0;

    map[month] += valueField ? item[valueField] || 0 : 1;
  });

  return Object.keys(map).map((month) => ({
    month,
    value: map[month],
  }));
};

export const calculateGrowth = (data, dateField) => {
  const sorted = [...data].sort(
    (a, b) => new Date(a[dateField]) - new Date(b[dateField]),
  );

  const mid = Math.floor(sorted.length / 2);

  const firstHalf = sorted.slice(0, mid).length;
  const secondHalf = sorted.slice(mid).length;

  if (firstHalf === 0) return 100;

  return (((secondHalf - firstHalf) / firstHalf) * 100).toFixed(1);
};
