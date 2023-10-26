export default function Avatar({ userId, username }) {
  const colors = [
    "bg-yellow-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-purple-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-orange-200",
    "bg-pink-200",
    "bg-fuchsia-200",
    "bg-rose-200",
    "bg-sky-200",
  ];

  const userIdBase10 = parseInt(userId, 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  return (
    <div
      className={"w-8 h-8 relative rounded-full  flex items-center " + color}
    >
      <div className="text-center w-full opacity-70">{username[0]}</div>
    </div>
  );
}
