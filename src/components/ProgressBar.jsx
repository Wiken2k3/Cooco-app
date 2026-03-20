export default function ProgressBar({ step }) {

  const total = 5
  const percent = (step / total) * 100

  return (
    <div className="w-full bg-gray-200 h-2 rounded-full mb-8">

      <div
        className="bg-[#57bbff] h-2 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      />

    </div>
  )
}