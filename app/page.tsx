import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import SectionGlobe from './components/Landing/SectionGlobe';
import SectionPremium from './components/Landing/Premium';
import {
  IconUser,
  IconUsersGroup,
  IconClipboardList,
} from '@tabler/icons-react';
import Ressources from './components/Landing/Ressources';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-32">
      <div className="bg-gradient-to-b from-white to-marcblue/70 px-5 rounded-[3rem] gap-20 pt-40 pb-10 w-full flex flex-col items-center justify-center ">
        <h1 className="lg:text-6xl sm:text-5xl text-4xl py-4 font-extrabold z-10 bg-clip-text text-transparent bg-gradient-to-br from-black to-neutral-900 text-center max-w-3xl">
          La plateforme dédiée aux agents sportifs du football
        </h1>

        <div className="grid grid-cols-3 h-[120px] sm:gap-10 gap-5 z-10 w-full max-w-4xl">
          <MagneticButton>
            <Link
              className="bg-gradient-to-b from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors sm:text-xl text-white sm:py-5 py-2 rounded-[3rem]"
              href={'/profils'}
            >
              <IconUser className="sm:min-w-8 sm:min-h-8 min-w-6 min-h-6" />
              Joueur
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              className="bg-gradient-to-b from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors sm:text-xl text-white sm:py-5 py-2 rounded-[3rem]"
              href={'/profils'}
            >
              {' '}
              <IconUsersGroup className="sm:min-w-8 sm:min-h-8 min-w-6 min-h-6" />
              Club
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              className="bg-gradient-to-b from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors sm:text-xl text-white sm:py-5 py-2 rounded-[3rem]"
              href={'/profils'}
            >
              {' '}
              <IconClipboardList className="sm:min-w-8 sm:min-h-8 min-w-6 min-h-6" />
              Entraîneur
            </Link>
          </MagneticButton>
        </div>
        <Button
          asChild
          className="bg-marcblue mt-5  shadow-xl backdrop-blur-sm  hover:bg-blue-600/60 cursor-pointer transition-colors text-sm text-white py-6 rounded-[3rem]"
        >
          <Link href="#ressources">En apprendre plus</Link>
        </Button>
      </div>

      <SectionGlobe />
      <SectionPremium />
      <Ressources />
    </div>
  );
}
