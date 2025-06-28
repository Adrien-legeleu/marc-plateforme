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

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-b from-white to-marcblue/70 rounded-[3rem] gap-10 pt-40 pb-20 w-full flex flex-col items-center justify-center ">
        <h1 className="text-6xl py-4 font-extrabold z-10 bg-clip-text text-transparent bg-gradient-to-br from-black to-neutral-900 text-center max-w-3xl">
          La plateforme dédiée aux agents sportifs du football
        </h1>
        <p className="z-10 text-black text-xl max-w-2xl text-center">
          Déposez votre profil, accédez à des ressources exclusives et
          connectez-vous avec les clubs, joueurs et entraîneurs du monde du
          football.
        </p>

        <div className="grid grid-cols-3 h-[220px] gap-10 z-10 w-full max-w-4xl">
          <MagneticButton>
            <Button className="bg-gradient-to-b from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors text-2xl text-white py-5 rounded-[3rem]">
              <IconUser className="min-w-10 min-h-10" />
              Joueur
            </Button>
          </MagneticButton>

          <MagneticButton>
            <Button className="bg-gradient-to-b from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors text-2xl text-white py-7 rounded-[3rem]">
              <IconUsersGroup className="min-w-10 min-h-10" />
              Club
            </Button>
          </MagneticButton>

          <MagneticButton>
            <Button className="bg-gradient-to-b from-marcblue to-marcblue/40 flex flex-col gap-3 font-bold shadow-xl backdrop-blur-sm w-full h-full hover:bg-blue-600/60 cursor-pointer transition-colors text-2xl text-white py-7 rounded-[3rem]">
              <IconClipboardList className="min-w-10 min-h-10" />
              Entraîneur
            </Button>
          </MagneticButton>
        </div>
      </div>

      <SectionGlobe />
      <SectionPremium />
      <Ressources />
    </div>
  );
}
