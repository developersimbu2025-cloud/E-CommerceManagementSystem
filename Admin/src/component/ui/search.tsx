import { Search as SearchIcon } from "lucide-react";
import Button from "./button";

type SearchProps = {
  type?: "text" | "number" | "email";
  placeholder?: string;
  className?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({
  type = "text",
  placeholder = "Search...",
  className,
  value,
  onChange,
}: SearchProps) => {
  return (
    <div className="flex items-center w-full max-w-md">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`flex-1 p-1    border  rounded w-1/3 outline-none  px-3 py-2 text-sm border-gray-300 ${
          className || ""
        }`}
      />
    </div>
  );
};

export default SearchInput;
