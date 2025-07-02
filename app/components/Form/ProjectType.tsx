'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiselect';

const projectOptions: Option[] = [
  { value: 'Formation', label: 'Formation' },
  { value: 'Centre de formation', label: 'Centre de formation' },
  { value: 'Jeunes', label: 'Jeunes' },
  { value: 'Seniors', label: 'Seniors' },
  { value: 'Préparation physique', label: 'Préparation physique' },
  { value: 'Réathlétisation', label: 'Réathlétisation' },
  { value: 'Détection', label: 'Détection' },
  { value: 'Haute performance', label: 'Haute performance' },
  { value: 'Loisir', label: 'Loisir' },
  { value: 'Événement ponctuel', label: 'Événement ponctuel' },
  { value: 'Projet longue durée', label: 'Projet longue durée' },
  { value: 'Autre', label: 'Autre' },
];

interface ProjectTypeSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function ProjectTypeSelector({
  value,
  onChange,
}: ProjectTypeSelectorProps) {
  const selectedOptions = projectOptions.filter((option) =>
    value.includes(option.value)
  );

  return (
    <div className="w-full">
      <Label>Projet recherché</Label>
      <MultipleSelector
        defaultOptions={projectOptions}
        className="bg-white rounded-3xl py-2"
        placeholder="Sélectionnez un ou plusieurs types de projets"
        emptyIndicator={
          <p className="text-center text-sm">Aucun résultat trouvé</p>
        }
        value={selectedOptions}
        onChange={(selected: Option[]) =>
          onChange(selected.map((item) => item.value))
        }
        commandProps={{ label: 'Rechercher un type de projet' }}
      />
    </div>
  );
}
