import { Input } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

export function TextInput({ value, setValue, placeholder, type = 'text' }) {
  return (
    <Input
      type={type}
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full"
    />
  );
}

export function SubmitButton({ label }) {
  return (
    <Button type="submit" className="w-full">
      {label}
    </Button>
  );
}