'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import {
  IconClipboardList,
  IconUser,
  IconHeartRateMonitor,
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export interface Player {
  id: number;
  name: string;
  firstName: string;
  bornDate: string; // DateTime en string (ISO)
  email: string;
  telephone?: string;
  position: string[];
  strongFoot?: string;
  height?: number;
  weight?: number;
  nationalities: string[];
  lastClub?: string;
  currentLevel?: string;
  educationLevel?: string;
  mobility?: string;
  cvUrls: string[];
  photoUrls: string[];
  videoUrls: string[];
  premium: boolean;
  createdAt: string; // DateTime
}

export interface Entraineur {
  id: number;
  name: string;
  firstName: string;
  email: string;
  telephone?: string;
  diplomas: string[];
  experience?: string;
  pastClubs: string[];
  targetAudience: string[];
  type: 'entraineur' | 'préparateur physique';
  projectType: string[];
  cvUrls: string[];
  photoUrls: string[];
  socialLinks: string[];
  createdAt: string;
}

export default function Page() {
  const [nameProfils, setNameProfils] = useState<
    'players' | 'entraineurs' | 'preparateurs'
  >('players');

  const [listProfilsPLayers, setListProfilsPLayers] = useState<Player[]>([]);
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
              className="bg-white h-[300px] max-w-md mx-auto  rounded-[3rem] bg-cover bg-center"
              style={{
                backgroundImage: profil.photoUrls[0]
                  ? `url(${profil.photoUrls[0]})`
                  : undefined,
              }}
            >
              <Link
                href={`/players/${profil.id}`}
                className="p-4 flex flex-col h-full items-start justify-end w-full relative"
              >
                <h3 className="font-semibold text-white text-2xl">
                  {profil.firstName} {profil.name}
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  <p className="text-sm text-black bg-white px-3 py-1 items-center justify-center flex rounded-3xl">
                    {Math.floor(
                      (new Date().getTime() -
                        new Date(profil.bornDate).getTime()) /
                        (1000 * 60 * 60 * 24 * 365.25)
                    )}{' '}
                    ans
                  </p>
                  <p className="text-sm text-black bg-white px-3 py-1 items-center justify-center flex rounded-3xl">
                    {profil.height} cm
                  </p>
                  <p className="text-sm text-black bg-white px-3 py-1 items-center justify-center flex rounded-3xl">
                    {profil.position}
                  </p>
                  <p className="text-sm text-black bg-white px-3 py-1 items-center justify-center flex rounded-3xl">
                    {profil.currentLevel}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      );
    }

    if (nameProfils === 'entraineurs') {
      const entraineurs = listProfilsEntraineurs.filter(
        (e) => e.type === 'entraineur'
      );
      return (
        <AnimatePresence>
          {entraineurs.map((profil, i) => (
            <motion.div
              key={profil.id}
              custom={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={animationVariant}
              className="bg-white h-[300px]  max-w-md mx-auto rounded-[3rem] bg-cover bg-center"
              style={{
                backgroundImage: profil.photoUrls[0]
                  ? `url(${profil.photoUrls[0]})`
                  : undefined,
              }}
            >
              <Link
                href={`/entraineurs/${profil.id}`}
                className="p-4 flex flex-col h-full items-start justify-end w-full relative"
              >
                <h3 className="font-semibold text-white text-2xl">
                  {profil.firstName} {profil.name}
                </h3>
                <p className="line-clamp-2 text-white">{profil.experience}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {profil.pastClubs.map((pastClub, index) => {
                    return (
                      <p
                        key={index}
                        className="text-sm text-black bg-white px-3 py-1 items-center justify-center flex rounded-3xl"
                      >
                        {pastClub}
                      </p>
                    );
                  })}
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      );
    }

    if (nameProfils === 'preparateurs') {
      const preparateurs = listProfilsEntraineurs.filter(
        (e) => e.type === 'préparateur physique'
      );
      return (
        <AnimatePresence>
          {preparateurs.map((profil, i) => (
            <motion.div
              key={profil.id}
              custom={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={animationVariant}
              className="bg-white max-w-md h-[300px] mx-auto rounded-[3rem] bg-cover bg-center"
              style={{
                backgroundImage: profil.photoUrls[0]
                  ? `url(${profil.photoUrls[0]})`
                  : undefined,
              }}
            >
              <Link
                href={`/entraineurs/${profil.id}`}
                className="p-4 flex flex-col h-full items-start justify-end w-full relative"
              >
                <h3 className="font-semibold text-white text-2xl">
                  {profil.firstName} {profil.name}
                </h3>
                <p className="line-clamp-2 text-white">{profil.experience}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {profil.pastClubs.map((pastClub, index) => {
                    return (
                      <p
                        key={index}
                        className="text-sm text-black bg-white px-3 py-1 items-center justify-center flex rounded-3xl"
                      >
                        {pastClub}
                      </p>
                    );
                  })}
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      );
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-b from-white to-marcblue/50 rounded-[3rem]  pt-40 pb-28 gap-20 w-full flex flex-col items-center justify-center">
        <h1 className="lg:text-6xl sm:text-5xl text-4xl py-4 font-extrabold z-10 bg-clip-text text-transparent bg-gradient-to-br from-black to-neutral-900 text-center max-w-3xl">
          {' '}
          Tous nos profils
        </h1>

        <div className="grid grid-cols-3 h-[100px] px-2 sm:gap-10 gap-5 z-10 w-full max-w-4xl">
          <MagneticButton>
            <Button
              onClick={() => setNameProfils('players')}
              className="bg-gradient-to-b from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors text-xs sm:text-xl text-white sm:py-5 py-2 rounded-[3rem]"
            >
              <IconUser className="sm:min-w-8 sm:min-h-8 min-w-6 min-h-6" />
              Joueurs
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              onClick={() => setNameProfils('entraineurs')}
              className="bg-gradient-to-b from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer text-xs transition-colors sm:text-xl text-white sm:py-5 py-2 rounded-[3rem]"
            >
              <IconClipboardList className="sm:min-w-8 sm:min-h-8 min-w-6 min-h-6" />
              Entraîneurs
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              onClick={() => setNameProfils('preparateurs')}
              className="bg-gradient-to-b text-xs from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors sm:text-xl text-white sm:py-5 py-2 rounded-[3rem]"
            >
              <IconHeartRateMonitor className="sm:min-w-8 sm:min-h-8 min-w-6 min-h-6" />
              Préparateurs
            </Button>
          </MagneticButton>
        </div>
      </div>

      <h2 className="text-5xl font-semibold tracking-wide text-center pt-16">
        {nameProfils == 'entraineurs'
          ? 'Entraineurs'
          : nameProfils == 'players'
          ? 'Joueurs'
          : 'Préparateurs'}
      </h2>

      <div className="w-full max-w-5xl px-5 md:grid-cols-3 sm:grid-cols-2  grid gap-8 mx-auto mt-16">
        <Link
          className="fixed bottom-5 z-20 right-10 p-5 rounded-3xl shadow-2xl text-center bg-marcbluedark text-white"
          href={nameProfils === 'players' ? '/players/new' : '/entraineurs/new'}
        >
          {nameProfils === 'players' && 'Déposer un profil joueur'}

          {nameProfils === 'entraineurs' && 'Ajouter un profil entraîneur'}

          {nameProfils === 'preparateurs' && 'Ajouter un profil préparateur'}
        </Link>
        {renderList()}
      </div>
    </div>
  );
}
