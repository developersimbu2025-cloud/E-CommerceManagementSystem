import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;
  options: DropdownOption[];
  value?: string; // <-- controlled value from parent
  onSelect?: (option: DropdownOption) => void;
  placeholder?: string;
};

const Dropdown = ({
  label,
  options,
  value,
  onSelect,
  placeholder = "Select...",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption | null>(null);

  // 🔑 Keep internal state in sync with parent value
  useEffect(() => {
    if (value) {
      const match = options.find((opt) => opt.value === value) || null;
      setSelected(match);
    } else {
      setSelected(null);
    }
  }, [value, options]);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div className="relative inline-block w-64  text-sm font-medium text-gray-700">
      {label && (
        <label className="mb-1 font-medium text-gray-700">{label}</label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 w-full border px-3 py-2 rounded-md bg-white shadow-sm 
                   hover:border-blue-400 focus:ring-2 focus:ring-blue-500 
                   flex items-center justify-between"
        aria-expanded={isOpen}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
