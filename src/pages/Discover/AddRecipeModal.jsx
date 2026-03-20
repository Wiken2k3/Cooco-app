export default function AddRecipeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm">

      <div className="absolute inset-0" onClick={onClose} />

      <div className="w-full max-w-[430px] bg-[var(--color-card)] rounded-t-[32px] p-6 border border-[var(--color-border)]">

        <div className="flex justify-between mb-6">
          <button onClick={onClose} className="text-[var(--color-main)]">
            Cancel
          </button>
          <h3 className="font-bold text-[var(--color-text)]">Add Recipe</h3>
          <button className="text-[var(--color-text-muted)]">
            Add
          </button>
        </div>

        <input 
          placeholder="https://..."
          className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-transparent text-[var(--color-text)]"
        />

      </div>
    </div>
  );
}