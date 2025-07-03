import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

const prisma = new PrismaClient();

function getAge(dateString: Date) {
  const birthDate = new Date(dateString);
  const ageDifMs = Date.now() - birthDate.getTime();
  return Math.floor(ageDifMs / (365.25 * 24 * 60 * 60 * 1000));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const player = await prisma.joueur.findUnique({
    where: { id: Number(id) },
  });

  if (!player) {
    return (
      <div className="text-center h-screen flex items-center justify-center tracking-wider text-red-600 text-2xl">
        Joueur introuvable.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-marcblue/20 via-white to-marcblue/20 py-24 px-3">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header avec photo principale */}
        <div className="relative bg-white/90 shadow-2xl rounded-[3rem] p-10 flex flex-col sm:flex-row items-center gap-10 border border-[#e3e3e3]">
          <div className="relative w-44 h-44 flex-shrink-0 rounded-[3rem] overflow-hidden shadow-xl border-2 border-marcblue/20">
            <Image
              src={player.photoUrls?.[0] || '/avatar-default.png'}
              alt={`${player.firstName} ${player.name}`}
              width={220}
              height={220}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center sm:items-start">
            <h1 className="text-4xl font-extrabold mb-1 tracking-tight">
              {player.firstName} {player.name}
            </h1>
            <div className="flex gap-4 mt-2 text-marcblue/90 font-medium text-lg">
              <span>
                🎂 {getAge(player.bornDate)} ans
                <span className="text-gray-400 ml-2 text-sm">
                  (né le {new Date(player.bornDate).toLocaleDateString()})
                </span>
              </span>
              <span>
                {' '}
                {player.premium ? (
                  <span className="text-yellow-400">⭐ Premium</span>
                ) : null}{' '}
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-4 text-gray-700 text-base">
              <span>
                <strong>Email :</strong> {player.email}
              </span>
              {player.telephone && (
                <span>
                  <strong>Tél :</strong> {player.telephone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Infos générales */}
        <div className="flex max-sm:flex-col gap-8 w-full">
          <div className="bg-white/90 flex-1 rounded-[3rem] shadow-lg p-10 flex flex-col gap-2 border border-[#f2f2f2]">
            <h2 className="font-bold text-xl text-marcblue mb-2">
              Profil sportif
            </h2>
            <p>
              <strong>Position(s) :</strong> {player.position.join(', ')}
            </p>
            {player.strongFoot && (
              <p>
                <strong>Pied fort :</strong> {player.strongFoot}
              </p>
            )}
            {player.height && (
              <p>
                <strong>Taille :</strong> {player.height} cm
              </p>
            )}
            {player.weight && (
              <p>
                <strong>Poids :</strong> {player.weight} kg
              </p>
            )}
            <p>
              <strong>Nationalités :</strong> {player.nationalities.join(', ')}
            </p>
            {player.lastClub && (
              <p>
                <strong>Dernier club :</strong> {player.lastClub}
              </p>
            )}
            {player.currentLevel && (
              <p>
                <strong>Niveau actuel :</strong> {player.currentLevel}
              </p>
            )}
            {player.educationLevel && (
              <p>
                <strong>Niveau scolaire :</strong> {player.educationLevel}
              </p>
            )}
            {player.mobility && (
              <p>
                <strong>Mobilité :</strong> {player.mobility}
              </p>
            )}
          </div>
          {/* Photos secondaires */}
          {player.photoUrls.length > 1 && (
            <div className="bg-white/90 flex-1 rounded-[3rem] shadow-lg p-10 flex flex-col gap-2 border border-[#f2f2f2]">
              <h2 className="font-bold text-xl text-marcblue mb-4">Photos</h2>
              <div className="grid grid-cols-2 gap-3 overflow-y-auto min-h-0">
                {player.photoUrls.map((url, i) => (
                  <Image
                    key={i}
                    src={url}
                    alt={`Photo ${i + 2}`}
                    width={220}
                    height={140}
                    className="rounded-3xl object-cover w-full h-28 border border-[#f5f5f5] shadow"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CVs */}
        {player.cvUrls.length > 0 && (
          <div className="bg-white/90 rounded-[3rem] shadow-lg p-10 border border-[#f2f2f2]">
            <h2 className="font-bold text-xl text-marcblue mb-3">CVs</h2>
            <div className="flex flex-wrap gap-4 overflow-y-scroll">
              {player.cvUrls.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-marcblue/10 text-marcblue hover:bg-marcblue/20 px-4 py-2 rounded-xl transition font-semibold underline"
                >
                  Voir le CV {i + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Vidéos */}
        {player.videoUrls.length > 0 && (
          <div className="bg-white/90 rounded-[3rem] shadow-lg p-10 border border-[#f2f2f2]">
            <h2 className="font-bold text-xl text-marcblue mb-3">Vidéos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {player.videoUrls.map((url, i) => (
                <video
                  key={i}
                  controls
                  className="rounded-3xl w-full h-52 object-cover shadow-lg"
                >
                  <source src={url} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
