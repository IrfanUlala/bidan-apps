import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type AdminButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function AdminButton({
  className = "",
  variant = "secondary",
  ...props
}: AdminButtonProps) {
  return (
    <button
      className={`admin-form-button ${variant} ${className}`.trim()}
      {...props}
    />
  );
}

export function FormLabel({
  className = "",
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`admin-form-label ${className}`.trim()} {...props} />;
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className = "", ...props }: TextInputProps) {
  return (
    <input
      className={`admin-form-control ${className}`.trim()}
      {...props}
    />
  );
}

type DateInputProps = Omit<TextInputProps, "type"> & {
  type?: "date" | "time" | "month";
};

export function DateInput({
  className = "",
  type = "date",
  ...props
}: DateInputProps) {
  return (
    <input
      className={`admin-form-control ${className}`.trim()}
      type={type}
      {...props}
    />
  );
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement>;

export function SelectInput({ className = "", ...props }: SelectInputProps) {
  return (
    <select
      className={`admin-form-control ${className}`.trim()}
      {...props}
    />
  );
}

type TextareaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextareaInput({
  className = "",
  ...props
}: TextareaInputProps) {
  return (
    <textarea
      className={`admin-form-control ${className}`.trim()}
      {...props}
    />
  );
}
