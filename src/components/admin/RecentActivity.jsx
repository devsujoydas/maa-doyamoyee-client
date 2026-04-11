const RecentActivity = ({ users, blogs, events, notices }) => {
  const activities = [
    ...users.map((u) => ({
      text: `New user: ${u.name}`,
      date: u.createdAt,
    })),
    ...blogs.map((b) => ({
      text: `Blog: ${b.title}`,
      date: b.createdAt,
    })),
    ...events.map((e) => ({
      text: `Event: ${e.title}`,
      date: e.createdAt,
    })),
    ...notices.map((n) => ({
      text: `Notice: ${n.title}`,
      date: n.createdAt,
    })),
  ];

  const sorted = activities
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Recent Activity</h3>

      {sorted.map((a, i) => (
        <p key={i} className="text-sm py-1">
          {a.text}
        </p>
      ))}
    </div>
  );
};

export default RecentActivity;