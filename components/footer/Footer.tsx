import Link from 'next/link';
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
  IconPhoneCall,
} from '@tabler/icons-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#eaf1ff] to-[#bcd5ff] text-[#0f172a] rounded-t-[3rem] mt-24 px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="max-md:flex max-md:flex-col max-md:justify-center max-md:items-center space-y-4">
          <h2 className="lg:text-5xl text-3xl tracking-wide font-extrabold  text-marcblue">
            AgentSport
          </h2>
          <p className="lg:text-md text-sm text-gray-600">
            Plateforme dédiée aux agents, joueurs, clubs et entraîneurs du monde
            du football.
          </p>
        </div>
        <div className="max-md:flex max-md:flex-col max-md:justify-center max-md:items-center">
          <h3 className="text-xl font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 max-md:text-center text-md ">
            <li>
              <Link href="/" className="hover:underline">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/profils" className="hover:underline">
                Profils
              </Link>
            </li>
            <li>
              <Link href="/agent" className="hover:underline">
                Agent de joueurs
              </Link>
            </li>
            <li>
              <Link href="/amateur" className="hover:underline">
                Foot amateur
              </Link>
            </li>
            <li>
              <Link href="/pro" className="hover:underline">
                Foot pro
              </Link>
            </li>
            <li>
              <Link href="/management" className="hover:underline">
                Management
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:underline">
                admin
              </Link>
            </li>
          </ul>
        </div>
        <div className="max-md:flex max-md:flex-col max-md:justify-center max-md:items-center">
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-md">
            <li className="flex items-center max-md:justify-center gap-2">
              <IconMail size={16} />
              <a
                href="mailto:contact@agentsport.com"
                className="hover:underline "
              >
                contact@agentsport.com
              </a>
            </li>
            <li className="flex items-center max-md:justify-center gap-2">
              <IconPhoneCall size={16} />
              <a href="tel:+33123456789" className="hover:underline">
                +33 1 23 45 67 89
              </a>
            </li>
          </ul>
        </div>
        <div className="max-md:flex max-md:flex-col max-md:justify-center max-md:items-center">
          <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandInstagram className="w-6 h-6 text-marcblue hover:text-marcbluedark" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandLinkedin className="w-6 h-6 text-marcblue hover:text-marcbluedark" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-[#d0dce9] pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AgentSport — Tous droits réservés.
      </div>
    </footer>
  );
}
