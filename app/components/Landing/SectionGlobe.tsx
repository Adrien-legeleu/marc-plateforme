'use client';

import { Button } from '@/components/ui/button';
import { Globe } from '@/components/ui/globe';
import { MagneticButton } from '@/components/ui/magnetic-button';
import React from 'react';

export default function SectionGlobe() {
  return (
    <div className="relative flex z-50 flex-col h-full w-full items-center justify-center bg-background px-6 md:px-40 pb-40 pt-8 md:pb-60 ">
      <h2 className="z-10 absolute left-1/2 -translate-x-1/2 top-0 translate-y-1/2 text-center text-4xl md:text-6xl font-bold">
        Des joueurs de football du monde entier partagent leur parcours
      </h2>

      <Globe className="top-44 z-10" />

      <div className="w-full h-96 bg-marcblue/70 blur-[150px] absolute bottom-0 rounded-t-full" />

      {descriptifsGlobe.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.position} max-w-sm z-10 space-y-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm rounded-[3rem] p-6 shadow-lg`}
        >
          <h3 className="text-xl text-center font-semibold text-[#255cbc]">
            {item.title}
          </h3>
          <p className="text-md text-center text-muted-foreground">
            {item.description}
          </p>
        </div>
      ))}

      <div className="z-10 flex gap-10 relative top-48 flex-wrap justify-center">
        <MagneticButton>
          <Button className="bg-gradient-to-b from-white to-white/80 capitalize shadow-xl backdrop-blur-sm hover:bg-white/60 cursor-pointer transition-colors text-lg text-black p-6 rounded-[3rem]">
            Comprendre notre mission
          </Button>
        </MagneticButton>
        <MagneticButton>
          <Button className="bg-gradient-to-b from-white to-white/80 capitalize shadow-xl backdrop-blur-sm hover:bg-white/60 cursor-pointer transition-colors text-lg text-black p-6 rounded-[3rem]">
            Voir tous les profils
          </Button>
        </MagneticButton>
      </div>
    </div>
  );
}

export const descriptifsGlobe = [
  {
    title: 'Informer',
    description:
      'Offrir une information claire sur le rôle d’un agent dans le football.',
    position: 'top-[30%] left-[10%]',
  },
  {
    title: 'Valoriser',
    description:
      'Mettre en lumière les missions réelles et méconnues des agents sportifs.',
    position: 'top-[68%] right-[8%]',
  },
  {
    title: 'Connecter',
    description: 'Créer du lien entre joueurs, clubs et encadrants.',
    position: 'bottom-[20%] left-[15%]',
  },
  {
    title: 'Structurer',
    description:
      'Un projet pour encadrer et professionnaliser l’activité d’agent dans le football.',
    position: 'top-[32%] right-[12%]',
  },
];
