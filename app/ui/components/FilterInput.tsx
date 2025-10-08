
'use client';

import React from 'react';

interface FilterInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export default function FilterInput({ label, name, type = 'text', ...props }: FilterInputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-text/80">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full px-3 py-2 bg-background border border-secondary/30 rounded-md focus:ring-primary focus:border-primary transition"
        {...props}
      />
    </div>
  );
}
