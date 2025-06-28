'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import Image from 'next/image';

export default function SectionPremium() {
  return (
    <div className="w-full relative max-w-6xl max-xl:px-10 h-full  mx-auto px-6 md:px-10 py-12 flex flex-col justify-center items-center gap-8 text-center ">
      <Image
        src={'/young-man-playing-football (1).jpg'}
        alt="jeune homme qui joue au foot"
        width={500}
        height={500}
        className="w-56 h-full rounded-[3rem] z-0 shadow-xl object-cover absolute top-0 left-0 "
      />
      <Image
        src={'/freepik__upload__77451.jpeg'}
        alt="jeune homme qui joue au foot"
        width={500}
        height={500}
        className="w-56 h-full rounded-[3rem] z-0 shadow-xl object-right object-cover absolute top-0 right-0 "
      />
      <AnimatedShinyText className="inline-flex z-10 items-center justify-center px-4 py-1 transition ease-out hover:text-blue-600 hover:duration-300 ">
        <span className="text-4xl md:text-6xl font-extrabold ">
          Mettez toutes les chances de votre côté !
        </span>
      </AnimatedShinyText>

      <p className="text-lg md:text-xl relative z-10 !leading-loose max-w-3xl font-semibold tracking-wide mx-auto text-muted-foreground">
        Avec la formule Premium, bénéficiez d’un accompagnement sur mesure pour
        optimiser votre visibilité. Votre profil est mis en avant auprès des
        clubs et un agent dédié facilite vos mises en relation avec les
        structures professionnelles adaptées à votre projet.
      </p>

      <Button className="bg-gradient-to-b z-10 from-marcblue to-marcblue/80 capitalize shadow-xl backdrop-blur-sm hover:bg-marcblue/60 cursor-pointer transition-colors text-lg text-white p-6 rounded-[3rem]">
        Découvrir la version Premium
      </Button>
    </div>
  );
}
