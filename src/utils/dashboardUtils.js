
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



export const getMonthlyStats = (data, dateField) => {
  const map = {};

  data.forEach((item) => {
    const date = new Date(item[dateField]);

    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!map[key]) {
      map[key] = 0;
    }

    map[key]++;
  });

  return map;
};

export const calculateMonthlyGrowth = (data, dateField) => {
  const monthly = getMonthlyStats(data, dateField);

  const months = Object.keys(monthly).sort();

  if (months.length < 2) return 0;

  const lastMonth = months[months.length - 1];
  const prevMonth = months[months.length - 2];

  const current = monthly[lastMonth];
  const previous = monthly[prevMonth];

  if (previous === 0) return 100;

  const growth = ((current - previous) / previous) * 100;

  return Number(growth.toFixed(1));
};

 
