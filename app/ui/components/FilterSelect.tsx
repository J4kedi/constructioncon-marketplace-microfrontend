
'use client';

interface FilterSelectProps {
  label: string;
  name: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterSelect({ label, name, options, onChange }: FilterSelectProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-text/80 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        onChange={onChange}
        className="w-full p-2 rounded-md bg-accent border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
      >
        <option value="all">Todos</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
