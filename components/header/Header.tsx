'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Menu, MenuItem, HoveredLink } from '../ui/navbar-menu';
import { HeaderResponsive } from './HeaderResponsive';

import {
  IconGavel,
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
            ></MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item="Profils"
              link="/profils"
            >
              {/* <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/profils/#joueurs">Joueurs</HoveredLink>
                <HoveredLink href="/profils/#entraineurs">
                  Entraîneurs
                </HoveredLink>
                <HoveredLink href="/profils/#clubs">Clubs</HoveredLink>
              </div> */}
            </MenuItem>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Agent de joueurs"
              link="/agent"
            ></MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item="Foot amateur"
              link="/amateur"
            ></MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item="Foot pro"
              link="/pro"
            ></MenuItem>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Management"
              link="/management"
            ></MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item="Contact"
              link="/contact"
            ></MenuItem>

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
