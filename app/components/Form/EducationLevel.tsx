import { useId } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EducationLevelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const niveauxEtude = [
  'Aucun diplôme',
  'Brevet des collèges',
  'CAP / BEP',
  'Bac général / technologique / pro',
  'BTS / DUT',
  'Licence / Bachelor',
  'Master / MBA',
  'Doctorat',
  'En cours de formation',
  'Autre',
];

export default function EducationLevelSelector({
  value,
  onChange,
}: EducationLevelSelectorProps) {
  const id = useId();

  return (
    <div className="*:not-first:mt-2 w-full">
      <Label htmlFor={id}>Niveau d’étude ou diplôme</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="bg-white w-full py-6 rounded-3xl px-6 border-none"
        >
          <SelectValue placeholder="Sélectionnez votre niveau d’étude" />
        </SelectTrigger>
        <SelectContent className="bg-white pl-4 py-5 rounded-[3rem]">
          {niveauxEtude.map((niveau) => (
            <SelectItem key={niveau} value={niveau}>
              {niveau}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
