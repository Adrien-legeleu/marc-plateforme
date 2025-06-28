'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiselect';

const countries: Option[] = [
  { value: 'France', label: 'France' },
  { value: 'Belgique', label: 'Belgique' },
  { value: 'Suisse', label: 'Suisse' },
  { value: 'Espagne', label: 'Espagne' },
  { value: 'Italie', label: 'Italie' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Allemagne', label: 'Allemagne' },
  { value: 'Pays-Bas', label: 'Pays-Bas' },
  { value: 'Angleterre', label: 'Angleterre' },
  { value: 'Maroc', label: 'Maroc' },
  { value: 'Algérie', label: 'Algérie' },
  { value: 'Tunisie', label: 'Tunisie' },
  { value: 'Sénégal', label: 'Sénégal' },
  { value: 'Côte d’Ivoire', label: 'Côte d’Ivoire' },
  { value: 'Cameroun', label: 'Cameroun' },
  { value: 'Brésil', label: 'Brésil' },
  { value: 'Argentine', label: 'Argentine' },
  { value: 'USA', label: 'USA' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Autre', label: 'Autre' },
];

interface NationalitySelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function NationalitySelector({
  value,
  onChange,
}: NationalitySelectorProps) {
  const selectedOptions = countries.filter((c) => value.includes(c.value));

  return (
    <div className="w-full">
      <Label>Nationalité(s)</Label>
      <MultipleSelector
        defaultOptions={countries}
        className="bg-white rounded-3xl py-2"
        placeholder="Sélectionnez une ou plusieurs nationalités"
        emptyIndicator={
          <p className="text-center text-sm">Aucun résultat trouvé</p>
        }
        value={selectedOptions}
        onChange={(selected: Option[]) =>
          onChange(selected.map((item) => item.value))
        }
        commandProps={{ label: 'Rechercher un pays' }}
      />
    </div>
  );
}
