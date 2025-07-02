'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiselect';

const audienceOptions: Option[] = [
  { value: 'Enfants', label: 'Enfants' },
  { value: 'Adolescents', label: 'Adolescents' },
  { value: 'Adultes', label: 'Adultes' },
  { value: 'Seniors', label: 'Seniors' },
  { value: 'Joueurs amateurs', label: 'Joueurs amateurs' },
  {
    value: 'Joueurs semi-professionnels',
    label: 'Joueurs semi-professionnels',
  },
  { value: 'Joueurs professionnels', label: 'Joueurs professionnels' },
  { value: 'Équipe féminine', label: 'Équipe féminine' },
  { value: 'Équipe masculine', label: 'Équipe masculine' },
  { value: 'Sportif individuel', label: 'Sportif individuel' },
  { value: 'Groupe / Club', label: 'Groupe / Club' },
  { value: 'Autre', label: 'Autre' },
];

interface TargetAudienceSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function TargetAudienceSelector({
  value,
  onChange,
}: TargetAudienceSelectorProps) {
  const selectedOptions = audienceOptions.filter((option) =>
    value.includes(option.value)
  );

  return (
    <div className="w-full">
      <Label>Public visé</Label>
      <MultipleSelector
        defaultOptions={audienceOptions}
        className="bg-white rounded-3xl py-2"
        placeholder="Sélectionnez un ou plusieurs publics"
        emptyIndicator={
          <p className="text-center text-sm">Aucun résultat trouvé</p>
        }
        value={selectedOptions}
        onChange={(selected: Option[]) =>
          onChange(selected.map((item) => item.value))
        }
        commandProps={{ label: 'Rechercher un public cible' }}
      />
    </div>
  );
}
