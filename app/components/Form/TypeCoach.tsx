import { useId } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TypeCoachSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const profilType = ['entraineur', 'préparateur physique'];

export default function TypeCoach({ value, onChange }: TypeCoachSelectorProps) {
  const id = useId();

  return (
    <div className="*:not-first:mt-2 w-full">
      <Label htmlFor={id}>Type de profil</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="bg-white w-full py-6 rounded-3xl px-6 border-none"
        >
          <SelectValue placeholder="Choisissez votre profil" />
        </SelectTrigger>
        <SelectContent className="bg-white pl-4 py-2 rounded-3xl">
          {profilType.map((profil) => (
            <SelectItem key={profil} value={profil}>
              {profil}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
