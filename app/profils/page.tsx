'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import {
  IconClipboardList,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Player {
  id: number;
  name: string;
  firstName: string;
  age: number;
  email: string;
  cvUrls: string[];
  premium: boolean;
}

export interface Club {
  id: number;
  name: string;
  city: string;
  categories?: string;
  createdAt: string;
}

export interface Entraineur {
  id: number;
  name: string;
  firstName: string;
  email: string;
  telephone: string;
  createdAt: string;
}

export default function Page() {
  const [nameProfils, setNameProfils] = useState<
    'players' | 'clubs' | 'entraineurs'
  >('players');
  const [listProfilsPLayers, setListProfilsPLayers] = useState<Player[]>([]);
  const [listProfilsClubs, setListProfilsClubs] = useState<Club[]>([]);
  const [listProfilsEntraineurs, setListProfilsEntraineurs] = useState<
    Entraineur[]
  >([]);

  const handlePlayers = async () => {
    try {
      const response = await fetch('/api/player');
      const data = await response.json();
      setListProfilsPLayers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des joueurs', error);
    }
  };

  const handleClubs = async () => {
    try {
      const response = await fetch('/api/club');
      const data = await response.json();
      setListProfilsClubs(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des clubs', error);
    }
  };

  const handleEntraineurs = async () => {
    try {
      const response = await fetch('/api/entraineur');
      const data = await response.json();
      setListProfilsEntraineurs(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des entraîneurs', error);
    }
  };

  useEffect(() => {
    handlePlayers();
    handleClubs();
    handleEntraineurs();
  }, []);

  const animationVariant = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  const renderList = () => {
    if (nameProfils === 'players') {
      return (
        <AnimatePresence>
          {listProfilsPLayers.map((profil, i) => (
            <motion.div
              key={profil.id}
              custom={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={animationVariant}
              className="bg-white rounded-lg shadow p-4 w-full"
            >
              <p className="font-semibold">
                {profil.firstName} {profil.name}
              </p>
              <p className="text-sm text-gray-500">{profil.email}</p>
              <p className="text-sm">Âge : {profil.age}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      );
    }

    if (nameProfils === 'clubs') {
      return (
        <AnimatePresence>
          {listProfilsClubs.map((club, i) => (
            <motion.div
              key={club.id}
              custom={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={animationVariant}
              className="bg-white rounded-lg shadow p-4 w-full"
            >
              <p className="font-semibold">{club.name}</p>
              <p className="text-sm text-gray-500">{club.city}</p>
              {club.categories && (
                <p className="text-sm">Catégories : {club.categories}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      );
    }

    if (nameProfils === 'entraineurs') {
      return (
        <AnimatePresence>
          {listProfilsEntraineurs.map((coach, i) => (
            <motion.div
              key={coach.id}
              custom={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={animationVariant}
              className="bg-white rounded-lg shadow p-4 w-full"
            >
              <p className="font-semibold">
                {coach.firstName} {coach.name}
              </p>
              <p className="text-sm text-gray-500">{coach.email}</p>
              <p className="text-sm">Tél. : {coach.telephone}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      );
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-b from-white to-marcblue/50 rounded-[3rem]  pt-40 pb-28 gap-20 w-full flex flex-col items-center justify-center">
        <h1 className="text-6xl max-w-2xl text-center font-bold">
          Tous nos profils
        </h1>

        <div className="grid grid-cols-3 h-[100px] gap-10 z-10 w-full max-w-4xl">
          <MagneticButton>
            <Button
              onClick={() => setNameProfils('players')}
              className="bg-gradient-to-b from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors text-2xl text-white py-5 rounded-[3rem]"
            >
              <IconUser className="min-w-10 min-h-10" />
              Joueurs
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              onClick={() => setNameProfils('clubs')}
              className="bg-gradient-to-b from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors text-2xl text-white py-5 rounded-[3rem]"
            >
              <IconUsersGroup className="min-w-10 min-h-10" />
              Clubs
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              onClick={() => setNameProfils('entraineurs')}
              className="bg-gradient-to-b from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors text-2xl text-white py-5 rounded-[3rem]"
            >
              <IconClipboardList className="min-w-10 min-h-10" />
              Entraîneurs
            </Button>
          </MagneticButton>
        </div>
      </div>

      <div className="w-full max-w-4xl grid-cols-3 grid gap-6 mx-auto mt-32">
        {renderList()}
      </div>
    </div>
  );
}
