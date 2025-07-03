'use client';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className="px-5 py-40">
      <h1 className="lg:text-6xl sm:text-5xl text-4xl py-4 font-extrabold z-10 bg-clip-text text-transparent bg-gradient-to-br from-black to-neutral-900 text-center max-w-3xl">
        Contact
      </h1>
      <div className="sm:grid-cols-2 pt-20 grid gap-5 sm:gap-10">
        <MagneticButton>
          <Link
            className="bg-gradient-to-b text-center from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors sm:text-xl text-white sm:py-5 py-6 rounded-[3rem]"
            href={'/players/new'}
          >
            Déposer mon CV – Joueur
          </Link>{' '}
        </MagneticButton>

        <MagneticButton>
          <Link
            className="bg-gradient-to-b text-center from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors sm:text-xl text-white sm:py-5 py-6 rounded-[3rem]"
            href={'/entraineurs/new'}
          >
            Déposer mon CV – Entraîneur ou Préparateur
          </Link>
        </MagneticButton>
      </div>
      <div className="py-20">formulaire de contact en cours</div>
    </div>
  );
}
