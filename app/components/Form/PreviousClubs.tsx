'use client';

import { useState } from 'react';
import { XIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PreviousClubsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function PreviousClubsInput({
  value,
  onChange,
}: PreviousClubsInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput('');
    }
  };

  const removeClub = (club: string) => {
    onChange(value.filter((c) => c !== club));
  };

  return (
    <div className="w-full">
      <Label>Vos clubs précédents</Label>
      <div className="flex flex-wrap gap-2 border rounded-3xl p-2  min-h-[3rem] bg-white">
        {value.map((club) => (
          <div
            key={club}
            className="flex items-center justify-center gap-1 px-2 py-1 bg-marcblue/60 text-sm rounded-full"
          >
            {club}
            <button
              type="button"
              onClick={() => removeClub(club)}
              className="text-black hover:text-black"
              aria-label={`Supprimer ${club}`}
            >
              <XIcon className="w-3 h-3" />
            </button>
          </div>
        ))}
        <Input
          className="flex-1 border-none placeholder:text-sm outline-none focus:ring-0"
          placeholder="Ajoutez un club puis validez avec Entrée ou une virgule"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
