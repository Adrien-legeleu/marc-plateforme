'use client';

import { useState } from 'react';
import { XIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SocialsLinksInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function SocialsLinks({
  value,
  onChange,
}: SocialsLinksInputProps) {
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

  const removeDiploma = (club: string) => {
    onChange(value.filter((c) => c !== club));
  };

  return (
    <div className="w-full">
      <Label>Liens de vos réseaux sociaux</Label>
      <div className="grid grid-cols-1 gap-2 border rounded-3xl p-2 min-h-[3rem] bg-white">
        {value.map((link) => (
          <div
            key={link}
            className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-sm rounded-full"
          >
            {link}
            <button
              type="button"
              onClick={() => removeDiploma(link)}
              className="text-gray-500 hover:text-black"
              aria-label={`Supprimer ${link}`}
            >
              <XIcon className="w-3 h-3" />
            </button>
          </div>
        ))}
        <Input
          className="flex-1 placeholder:text-sm border-none outline-none focus:ring-0"
          placeholder="Collez l’URL d’un réseau social, validez par Entrée ou une virgule"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
