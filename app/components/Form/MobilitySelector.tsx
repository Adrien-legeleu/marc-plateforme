import { useId } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MobilitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const mobiliteOptions = [
  'Disponible localement',
  'Mobile régionalement',
  'Mobile nationalement',
  'Mobile internationalement',
  'Non disponible actuellement',
];

export default function MobilitySelector({
  value,
  onChange,
}: MobilitySelectorProps) {
  const id = useId();

  return (
    <div className="*:not-first:mt-2 w-full">
      <Label htmlFor={id}>Mobilité / Disponibilité</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="bg-white w-full py-6 rounded-3xl px-6 border-none"
        >
          <SelectValue placeholder="Sélectionnez votre mobilité" />
        </SelectTrigger>
        <SelectContent className="bg-white pl-4 py-5 rounded-[3rem]">
          {mobiliteOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
