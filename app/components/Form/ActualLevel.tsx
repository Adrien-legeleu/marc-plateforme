import { useId } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NiveauActuelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const niveaux = [
  'Professionnel',
  'Semi-professionnel',
  'Amateur',
  'Loisir / Récréatif',
  'En formation',
  'Sans club',
];

export default function NiveauActuelSelector({
  value,
  onChange,
}: NiveauActuelSelectorProps) {
  const id = useId();

  return (
    <div className="*:not-first:mt-2 w-full">
      <Label htmlFor={id}>Niveau actuel</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="bg-white w-full py-6 rounded-3xl px-6 border-none"
        >
          <SelectValue placeholder="Sélectionnez votre niveau actuel" />
        </SelectTrigger>
        <SelectContent className="bg-white pl-4 py-5 rounded-[3rem]">
          {niveaux.map((niveau) => (
            <SelectItem key={niveau} value={niveau}>
              {niveau}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
