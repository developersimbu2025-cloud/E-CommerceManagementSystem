type TextareaProps = {
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  required?: boolean;
  disabled?: boolean;
  rows: number;
  className: string;
};

const Textarea = ({
  placeholder,

  name,
  value,
  onChange,
  required = false,
  disabled = false,
  rows,
  className,
}: TextareaProps) => {
  return (
    <div>
      <textarea
        className={`${className} flex  w-full rounded-md border px-3 py-2 text-sm border-gray-300 `}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
      />
    </div>
  );
};

export default Textarea;
