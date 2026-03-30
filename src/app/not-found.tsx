import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page non trouvée (404)',
  description: 'La page que vous recherchez n\'existe pas. Retournez à l\'horloge en ligne gratuite.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
      <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
      <p className="text-slate-400 mb-8 text-center max-w-md">
        Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
        title="Retour à l'horloge en ligne"
      >
        Retour à l&apos;horloge
      </Link>
    </div>
  );
}
