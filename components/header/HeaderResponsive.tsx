'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { IconMenu2 } from '@tabler/icons-react';

export function HeaderResponsive() {
  const links = [
    { label: 'Accueil', href: '/' },
    { label: 'Profils', href: '/profils' },
    { label: 'Agent de joueurs', href: '/agent' },
    { label: 'Foot amateur', href: '/amateur' },
    { label: 'Foot pro', href: '/pro' },
    { label: 'Management', href: '/management' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <Drawer>
      <div className="fixed bottom-2 left-1/2 rounded-[3rem] gap-5 -translate-x-1/2 shadow-2xl z-[10000] flex items-center justify-between px-6 py-4 bg-white dark:bg-black  lg:hidden">
        <DrawerTrigger asChild>
          <IconMenu2 className="w-8 h-8 text-neutral-800 dark:text-neutral-200" />
        </DrawerTrigger>
        <Button
          asChild
          variant="secondary"
          className=" rounded-3xl bg-white text-black py-3  shadow-md hover:bg-white/80"
        >
          <Link href="/contact">Contactez-nous</Link>
        </Button>
        <Button
          asChild
          className=" rounded-3xl bg-marcblue text-white py-3  shadow-md hover:bg-marcblue/80"
        >
          <Link href="/premium">Premium</Link>
        </Button>
      </div>

      <DrawerContent>
        <div className="w-full max-w-sm mx-auto ">
          <DrawerHeader>
            <h2 className="text-2xl font-bold text-center mb-5 text-marcblue">
              AGENTSPORT
            </h2>
          </DrawerHeader>

          <nav className="flex flex-col items-center gap-4">
            {links.map((link) => (
              <DrawerClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className="w-full text-center font-medium text-lg text-neutral-700 dark:text-neutral-500 hover:underline"
                >
                  {link.label}
                </Link>
              </DrawerClose>
            ))}

            {/* CTA Premium */}
            <DrawerClose asChild>
              <Button
                asChild
                className="mt-6 w-full rounded-3xl bg-marcblue text-white py-3 text-lg shadow-md hover:bg-marcblue/80"
              >
                <Link href="/premium">Premium</Link>
              </Button>
            </DrawerClose>
          </nav>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="rounded-3xl w-full" variant="outline">
                Annuler
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
