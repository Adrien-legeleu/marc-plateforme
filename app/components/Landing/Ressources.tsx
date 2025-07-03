import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import {
  IconSchool,
  IconUsersGroup,
  IconCertificate,
  IconBriefcase,
} from '@tabler/icons-react';
import Link from 'next/link';

export default function Ressources() {
  return (
    <div
      className="h-full w-full max-w-6xl  mx-auto relative max-xl:px-10 py-24"
      id="ressources"
    >
      <div className="relative p-0 h-full flex flex-col items-center justify-center gap-10">
        <div className="w-4 h-4 rounded-full bg-marcblue absolute top-0 left-0" />
        <div className="w-4 h-4 rounded-full bg-marcblue absolute top-0 right-0" />
        <div className="w-4 h-4 rounded-full bg-marcblue absolute bottom-0 left-0" />
        <div className="w-4 h-4 rounded-full bg-marcblue absolute bottom-0 right-0" />
        <h2 className="z-10 text-center text-4xl md:text-6xl font-bold">
          Découvrez nos 4 univers
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-5">
          {sections.map((section, index) => {
            return (
              <Link
                href={section.link}
                key={index}
                className="bg-gradient-to-b max-w-xs shadow-2xl shadow-[#00000010] from-marcblue/10  from-05% to-white p-5 rounded-[3rem] flex flex-col gap-4 items-center jsutify-center"
              >
                <section.icon className="min-w-8 min-h-8 text-marcbluedark" />
                <h3 className="text-marcbluedark text-xl text-center">
                  {section.title}
                </h3>
                <p className="text-center text-md">{section.description}</p>
              </Link>
            );
          })}
        </ul>
        <MagneticButton>
          <Button className="bg-gradient-to-b z-10 from-marcblue to-marcblue/80 capitalize  shadow-xl backdrop-blur-sm  hover:bg-marcblue/60 cursor-pointer transition-colors text-lg text-white p-6 rounded-[3rem]">
            Une question ?
          </Button>
        </MagneticButton>
      </div>
    </div>
  );
}

const sections = [
  {
    title: 'Agents Sportifs',
    link: '/agent',
    description:
      'Réglementation, conseils et accompagnement pour les agents sportifs.',
    icon: IconBriefcase,
  },
  {
    title: 'Foot Pro',
    link: '/pro',
    description:
      'Documents, lois et outils destinés aux clubs et joueurs professionnels.',
    icon: IconCertificate,
  },
  {
    title: 'Foot Amateur',
    link: '/amateur',
    description:
      'Guides et ressources pratiques pour le football amateur et ses encadrants.',
    icon: IconSchool,
  },
  {
    title: 'Management & Gestion',
    link: '/management',
    description:
      'Bonnes pratiques et outils de gestion de carrière, d’image ou de club.',
    icon: IconUsersGroup,
  },
];
