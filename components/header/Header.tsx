'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Menu, MenuItem, HoveredLink } from '../ui/navbar-menu';
import { HeaderResponsive } from './HeaderResponsive';

import {
  IconUser,
  IconGavel,
  IconBuildingStadium,
  IconBooks,
  IconUsersGroup,
  IconMail,
  IconRocket,
  IconShieldCheck,
  IconInfoSquare,
} from '@tabler/icons-react';

export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <HeaderResponsive />

      <div
        className={cn(
          'fixed max-lg:hidden inset-x-0 duration-500 ease-in-out flex items-center justify-center mx-auto z-[10000] top-4',
          className
        )}
      >
        <Menu setActive={setActive}>
          <div className="flex items-center justify-center" />

          <div className="flex items-center w-full gap-10 justify-end">
            <MenuItem
              setActive={setActive}
              active={active}
              item="Accueil"
              link="/"
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/#mission">
                  <IconInfoSquare stroke={2} />
                  La mission
                </HoveredLink>
                <HoveredLink href="/#reseau">
                  <IconUsersGroup stroke={2} />
                  Le réseau
                </HoveredLink>
              </div>
            </MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item="Agent de joueurs"
              link="/agent"
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/agent/#devenir">
                  <IconRocket stroke={2} />
                  Devenir agent
                </HoveredLink>
                <HoveredLink href="/agent/#fff">
                  <IconShieldCheck stroke={2} />
                  Agent FFF
                </HoveredLink>
                <HoveredLink href="/agent/#fifa">
                  <IconShieldCheck stroke={2} />
                  Agent FIFA
                </HoveredLink>
              </div>
            </MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item="Profils"
              link="/profils"
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/profils/#joueurs">Joueurs</HoveredLink>
                <HoveredLink href="/profils/#entraineurs">
                  Entraîneurs
                </HoveredLink>
                <HoveredLink href="/profils/#clubs">Clubs</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item="Ressources"
              link="/ressources"
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/ressources/#juridiques">
                  <IconGavel stroke={2} />
                  Juridiques
                </HoveredLink>
                <HoveredLink href="/ressources/#contrats">
                  Contrats & transferts
                </HoveredLink>
                <HoveredLink href="/ressources/#jurisprudence">
                  Jurisprudence
                </HoveredLink>
              </div>
            </MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item="Management"
              link="/accompagnement"
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/accompagnement/#joueurs">
                  Accompagnement joueurs
                </HoveredLink>
                <HoveredLink href="/accompagnement/#entraineurs">
                  Entraîneurs
                </HoveredLink>
              </div>
            </MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item="Sport associatif"
              link="/sport-associatif"
            ></MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item="Contact"
              link="/contact"
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/contact">
                  <IconMail stroke={2} /> Formulaire
                </HoveredLink>
                <HoveredLink href="/contact/#reseaux">
                  Réseaux sociaux
                </HoveredLink>
              </div>
            </MenuItem>

            {/* CTA principal */}
            <Button
              asChild
              className="bg-marcblue/60 capitalize font-bold shadow-xl backdrop-blur-sm hover:bg-blue-600/60 transition-colors text-lg text-white p-6 rounded-[3rem]"
            >
              <Link href="/premium">Premium</Link>
            </Button>
          </div>
        </Menu>
      </div>
    </>
  );
}
