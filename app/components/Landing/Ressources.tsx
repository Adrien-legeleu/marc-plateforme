import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import {
  IconSchool,
  IconClipboardCheck,
  IconUsersGroup,
  IconNews,
  IconScale,
  IconBook,
  IconBuildingBank,
  IconCertificate,
} from '@tabler/icons-react';

export default function Ressources() {
  return (
    <div className="h-full w-full max-w-6xl  mx-auto relative max-xl:px-10 py-24">
      <div className="relative p-0 h-full flex flex-col items-center justify-center gap-10">
        <div className="w-4 h-4 rounded-full bg-marcblue absolute top-0 left-0" />
        <div className="w-4 h-4 rounded-full bg-marcblue absolute top-0 right-0" />
        <div className="w-4 h-4 rounded-full bg-marcblue absolute bottom-0 left-0" />
        <div className="w-4 h-4 rounded-full bg-marcblue absolute bottom-0 right-0" />
        <h2 className="z-10 text-center text-4xl md:text-6xl font-bold">
          Ressources Juridiques & Professionnelles
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-5">
          {ressourcesFootPro.map((rsc, index) => {
            return (
              <div
                key={index}
                className="bg-gradient-to-b max-w-xs shadow-2xl shadow-[#00000010] from-marcblue/10  from-05% to-white p-5 rounded-[3rem] flex flex-col gap-4 items-center jsutify-center"
              >
                <rsc.icon className="min-w-8 min-h-8 text-marcbluedark" />
                <h3 className="text-marcbluedark text-xl text-center">
                  {rsc.title}
                </h3>
                <p className="text-center text-md">{rsc.description}</p>
              </div>
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

const ressourcesFootPro = [
  {
    title: 'Contrats et fiscalité des transferts et des prêts de joueurs',
    description:
      'Informations clés sur la gestion fiscale et juridique des transferts et prêts de joueurs professionnels.',
    icon: IconCertificate,
  },
  {
    title: 'La formation des footballeurs',
    description:
      'Règles et bonnes pratiques concernant la formation et le développement des jeunes footballeurs.',
    icon: IconSchool,
  },
  {
    title: 'Jurisprudences marquantes',
    description:
      'Sélection de décisions de justice importantes dans le domaine du football professionnel.',
    icon: IconClipboardCheck,
  },
  {
    title: 'Les accords collectifs dans le football',
    description:
      'Détail des accords collectifs essentiels à connaître pour tous les acteurs du football.',
    icon: IconUsersGroup,
  },
  {
    title: 'Nouvelles lois ou règlements',
    description:
      'Restez informé sur les dernières évolutions légales et réglementaires dans le monde du football.',
    icon: IconNews,
  },
  {
    title: 'Droit du travail / Droit du sport',
    description:
      'Éclairages juridiques sur le droit du travail appliqué au contexte sportif professionnel.',
    icon: IconScale,
  },
  {
    title: 'Éditos juridiques',
    description:
      'Analyses et éditoriaux sur des points précis et importants du droit appliqué au football.',
    icon: IconBook,
  },
  {
    title: 'Base jurisprudentielle',
    description:
      'Accès direct à une base complète des principales décisions juridiques concernant le sport professionnel.',
    icon: IconBuildingBank,
  },
];
