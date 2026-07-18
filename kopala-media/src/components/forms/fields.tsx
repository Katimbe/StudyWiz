import { forwardRef, useId, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}

export const TextField = forwardRef<
  HTMLInputElement,
  BaseProps & InputHTMLAttributes<HTMLInputElement>
>(({ label, error, hint, optional, id, className, ...props }, ref) => {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="field-label">
        {label} {optional && <span className="font-normal text-warmgray">(optional)</span>}
      </label>
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        className={cn("field", error && "border-red-400/60")}
        {...props}
      />
      {hint && !error && <p id={`${fieldId}-hint`} className="mt-1.5 text-xs text-warmgray">{hint}</p>}
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
});
TextField.displayName = "TextField";

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ label, error, hint, optional, id, className, ...props }, ref) => {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="field-label">
        {label} {optional && <span className="font-normal text-warmgray">(optional)</span>}
      </label>
      <textarea
        ref={ref}
        id={fieldId}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        className={cn("field resize-y", error && "border-red-400/60")}
        {...props}
      />
      {hint && !error && <p id={`${fieldId}-hint`} className="mt-1.5 text-xs text-warmgray">{hint}</p>}
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
});
TextAreaField.displayName = "TextAreaField";

export const SelectField = forwardRef<
  HTMLSelectElement,
  BaseProps & SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[]; placeholder?: string }
>(({ label, error, optional, id, options, placeholder, className, ...props }, ref) => {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="field-label">
        {label} {optional && <span className="font-normal text-warmgray">(optional)</span>}
      </label>
      <select
        ref={ref}
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn("field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22%23A8A29A%22 viewBox=%220 0 16 16%22%3E%3Cpath d=%22M8 11L2 5h12z%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10", error && "border-red-400/60")}
        {...props}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-charcoal text-ivory">
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
});
SelectField.displayName = "SelectField";

export function ConsentField({
  checked,
  onChange,
  error,
  text,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  text?: ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-ivory/25 bg-charcoal accent-[#C9A227]"
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-warmgray">
          {text ?? (
            <>
              I'm happy for Kopala Media to contact me about my inquiry and store my information as
              described in the{" "}
              <a href="/privacy" className="text-gold underline underline-offset-2 hover:text-gold-bright">
                Privacy Policy
              </a>
              .
            </>
          )}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** Honeypot — visually hidden from humans, attractive to bots. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" tabIndex={-1}>
      <label htmlFor="company-website-field">Company website</label>
      <input
        id="company-website-field"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function ErrorSummary({ errors, title = "Please check the following:" }: { errors: Partial<Record<string, string | undefined>>; title?: string }) {
  const entries = Object.entries(errors).filter(([, v]) => v) as [string, string][];
  if (entries.length === 0) return null;
  return (
    <div
      role="alert"
      tabIndex={-1}
      className="rounded-xl border border-red-400/40 bg-red-500/10 p-4"
      ref={(el) => el?.focus()}
    >
      <p className="flex items-center gap-2 font-display text-sm font-semibold text-red-300">
        <AlertCircle className="h-4 w-4" aria-hidden="true" /> {title}
      </p>
      <ul className="mt-2 list-inside list-disc text-sm text-red-300/90">
        {entries.map(([field, msg]) => (
          <li key={field}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export function ChecklistField({
  label,
  options,
  values,
  onChange,
  error,
}: {
  label: string;
  options: string[];
  values: string[];
  onChange: (v: string[]) => void;
  error?: string;
}) {
  const id = useId();
  const toggle = (opt: string) =>
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]);
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="field-label">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={cn(
              "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm transition-colors",
              values.includes(opt)
                ? "border-gold/60 bg-gold/10 text-ivory"
                : "border-ivory/15 bg-charcoal text-ivory/80 hover:border-ivory/30",
            )}
          >
            <input
              type="checkbox"
              checked={values.includes(opt)}
              onChange={() => toggle(opt)}
              className="h-4 w-4 shrink-0 accent-[#C9A227]"
            />
            {opt}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </fieldset>
  );
}
