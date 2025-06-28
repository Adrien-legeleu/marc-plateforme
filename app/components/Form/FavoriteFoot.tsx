import { useId } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StrongFootSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const footOptions = ['Pied gauche', 'Pied droit', 'Ambidextre'];

export default function StrongFootSelector({
  value,
  onChange,
}: StrongFootSelectorProps) {
  const id = useId();

  return (
    <div className="*:not-first:mt-2 w-full">
      <Label htmlFor={id}>Pied fort</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="bg-white w-full py-6 rounded-3xl px-6 border-none"
        >
          <SelectValue placeholder="Choisissez votre pied fort" />
        </SelectTrigger>
        <SelectContent className="bg-white pl-4 py-2 rounded-3xl">
          {footOptions.map((foot) => (
            <SelectItem key={foot} value={foot}>
              {foot}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
