// src/components/ui/button.jsx
export function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full 
        py-4 
        rounded-xl 
        font-semibold 
        text-lg 
        transition 
        active:scale-95 
        ${className}
      `}
    >
      {children}
    </button>
  );
}