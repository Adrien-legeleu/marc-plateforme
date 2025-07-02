import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

const prisma = new PrismaClient();

interface EntraineurPageProps {
  params: { id: string };
}

export default async function EntraineurPage({ params }: EntraineurPageProps) {
  const coach = await prisma.entraineur.findUnique({
    where: { id: Number(params.id) },
  });

  if (!coach) {
    return (
      <div className="text-center h-screen flex items-center justify-center tracking-wider text-red-600 text-2xl">
        Entraîneur / Préparateur introuvable.
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
              src={coach.photoUrls?.[0] || '/avatar-default.png'}
              alt={`${coach.firstName} ${coach.name}`}
              width={220}
              height={220}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center sm:items-start">
            <h1 className="text-4xl font-extrabold mb-1 tracking-tight">
              {coach.firstName} {coach.name}
            </h1>
            <div className="flex gap-3 mt-2 text-marcblue/90 font-medium text-lg">
              <span className="px-3 py-1 rounded-2xl bg-marcblue/10 text-marcblue font-semibold uppercase tracking-wide text-sm">
                {coach.type === 'preparateur'
                  ? 'Préparateur physique'
                  : 'Entraîneur'}
              </span>
              <span>
                {coach.createdAt && (
                  <span className="text-gray-400 ml-2 text-sm">
                    Profil créé le{' '}
                    {new Date(coach.createdAt).toLocaleDateString()}
                  </span>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-1 mt-4 text-gray-700 text-base">
              <span>
                <strong>Email :</strong> {coach.email}
              </span>
              {coach.telephone && (
                <span>
                  <strong>Tél :</strong> {coach.telephone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Infos pro */}
        <div className="flex gap-8 w-full">
          {/* Bloc gauche : Diplômes, expérience, clubs, publics */}
          <div className="bg-white/90 flex-1 rounded-[3rem] shadow-lg p-10 flex flex-col gap-5 border border-[#f2f2f2]">
            <h2 className="font-bold text-xl text-marcblue mb-2">
              Profil professionnel
            </h2>
            {/* Diplômes */}
            {coach.diplomas?.length > 0 && (
              <div>
                <p className="font-semibold mb-1">Diplômes :</p>
                <ul className="flex flex-wrap gap-2">
                  {coach.diplomas.map((diploma, i) => (
                    <li
                      key={i}
                      className="bg-marcblue/10 text-marcblue px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {diploma}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Expérience */}
            {coach.experience && (
              <div>
                <p className="font-semibold mb-1">Expérience :</p>
                <p className="bg-gray-100 px-3 py-2 rounded-2xl text-sm line-clamp-4">
                  {coach.experience}
                </p>
              </div>
            )}
            {/* Clubs précédents */}
            {coach.pastClubs?.length > 0 && (
              <div>
                <p className="font-semibold mb-1">Clubs précédents :</p>
                <div className="flex flex-wrap gap-2">
                  {coach.pastClubs.map((club, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {club}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Publics ciblés */}
            {coach.targetAudience?.length > 0 && (
              <div>
                <p className="font-semibold mb-1">Publics visés :</p>
                <div className="flex flex-wrap gap-2">
                  {coach.targetAudience.map((target, i) => (
                    <span
                      key={i}
                      className="bg-marcblue/10 text-marcblue px-3 py-1 rounded-full text-sm"
                    >
                      {target}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Types de projets recherchés */}
            {coach.projectType?.length > 0 && (
              <div>
                <p className="font-semibold mb-1">Projets recherchés :</p>
                <div className="flex flex-wrap gap-2">
                  {coach.projectType.map((proj, i) => (
                    <span
                      key={i}
                      className="bg-marcblue/10 text-marcblue px-3 py-1 rounded-full text-sm"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bloc droit : autres photos */}
          {coach.photoUrls.length > 1 && (
            <div className="bg-white/90 flex-1 rounded-[3rem] shadow-lg p-10 flex flex-col gap-2 border border-[#f2f2f2]">
              <h2 className="font-bold text-xl text-marcblue mb-4">
                Galerie photos
              </h2>
              <div className="grid grid-cols-2 gap-3 overflow-y-auto min-h-0">
                {coach.photoUrls.slice(1).map((url, i) => (
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
        {coach.cvUrls.length > 0 && (
          <div className="bg-white/90 rounded-[3rem] shadow-lg p-10 border border-[#f2f2f2]">
            <h2 className="font-bold text-xl text-marcblue mb-3">CVs</h2>
            <div className="flex flex-wrap gap-4 overflow-y-scroll">
              {coach.cvUrls.map((url, i) => (
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

        {/* Réseaux sociaux */}
        {coach.socialLinks.length > 0 && (
          <div className="bg-white/90 rounded-[3rem] shadow-lg p-10 border border-[#f2f2f2]">
            <h2 className="font-bold text-xl text-marcblue mb-3">
              Réseaux sociaux
            </h2>
            <div className="flex flex-wrap gap-4">
              {coach.socialLinks.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 px-4 py-2 rounded-xl transition font-semibold hover:bg-marcblue/10 text-marcblue"
                >
                  {url}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
