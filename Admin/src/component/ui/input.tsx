type InputProps = {
  placeholder: string;
  type: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const Input = ({
  placeholder,
  type,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  className,
}: InputProps) => {
  return (
    <div>
      <input
        className={`${className} flex  w-full rounded-md border px-3 py-2 text-sm border-gray-300 `}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
