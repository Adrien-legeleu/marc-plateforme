'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import Image from 'next/image';

export default function SectionPremium() {
  return (
    <div className="w-full  relative max-w-6xl max-xl:px-10 h-full  mx-auto px-6 md:px-10  flex flex-col justify-center items-center gap-8 text-center ">
      <Image
        src={'/young-man-playing-football (1).jpg'}
        alt="jeune homme qui joue au foot"
        width={500}
        height={500}
        className="lg:w-56 w-40  max-lg:hidden lg:h-full   h-2/3  rounded-[3rem] z-0 shadow-xl object-right object-cover absolute top-0 max-lg:-translate-y-full  lg:left-0 left-1/2 max-lg:-translate-x-1/2 "
      />
      <Image
        src={'/freepik__upload__77451.jpeg'}
        alt="jeune homme qui joue au foot"
        width={500}
        height={500}
        className="lg:w-56 w-40  lg:h-full max-lg:hidden h-2/3 rounded-[3rem] z-0 shadow-xl object-right object-cover absolute lg:top-0 top-full translate-y-2 lg:right-0 right-1/2 max-lg:translate-x-1/2 "
      />
      <AnimatedShinyText className="inline-flex z-10 items-center justify-center px-4 py-1 transition ease-out hover:text-blue-600 hover:duration-300 ">
        <span className="sm:text-4xl text-3xl md:text-6xl font-extrabold ">
          Mettez toutes les chances de votre côté !
        </span>
      </AnimatedShinyText>

      <p
        style={{
          textShadow: '0 0 10px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.15)',
        }}
        className="sm:text-lg text-md md:text-xl relative z-10 !leading-loose max-w-3xl font-semibold tracking-wide mx-auto text-muted-foreground"
      >
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
