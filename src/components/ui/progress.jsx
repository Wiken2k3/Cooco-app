export default function Progress({ step, total }) {
  const percent = (step / total) * 100;

  return (
    <div className="w-full px-8 mt-2">
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}