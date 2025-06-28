import { useId } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PreferredPositionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const positions = [
  'Gardien de but',
  'Défenseur central',
  'Défenseur latéral gauche',
  'Défenseur latéral droit',
  'Milieu défensif',
  'Milieu central',
  'Milieu offensif',
  'Ailier gauche',
  'Ailier droit',
  'Attaquant',
  'Polyvalent',
  'Autre',
];

export default function PreferredPositionSelector({
  value,
  onChange,
}: PreferredPositionSelectorProps) {
  const id = useId();

  return (
    <div className="*:not-first:mt-2 w-full">
      <Label htmlFor={id}>Poste préféré</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="bg-white w-full py-6 rounded-3xl px-6 border-none"
        >
          <SelectValue placeholder="Choisissez un poste" />
        </SelectTrigger>
        <SelectContent className="bg-white pl-4 py-5 rounded-[3rem]">
          {positions.map((position) => (
            <SelectItem key={position} value={position}>
              {position}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
