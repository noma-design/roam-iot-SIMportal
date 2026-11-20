"use client";

type SegmentedControlProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="flex items-center">
      {options.map((option, index) => {
        const active = option === value;
        const first = index === 0;
        const last = index === options.length - 1;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-2 py-1 text-xs ${
              active
                ? "border border-roam-teal bg-roam-teal-soft text-roam-teal"
                : "border border-roam-border bg-roam-surface-soft text-roam-label"
            } ${first ? "rounded-l-md" : ""} ${last ? "rounded-r-md" : ""} ${
              !first ? "border-l-0" : ""
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
