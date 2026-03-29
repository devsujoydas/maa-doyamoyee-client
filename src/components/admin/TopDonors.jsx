const TopDonors = ({ donations }) => {
  const sorted = [...donations].sort((a, b) => b.amount - a.amount).slice(0, 5);
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Top Donors</h3>
      {sorted.map((d, i) => (
        <div key={i} className="flex justify-between text-sm py-1">
          <span>{d.donorName}</span>
          <span className="font-bold">৳ {d.amount}</span>
        </div>
      ))}
    </div>
  );
};
export default TopDonors;