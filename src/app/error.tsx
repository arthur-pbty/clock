'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oups !</h1>
      <h2 className="text-xl font-semibold mb-4">Une erreur s&apos;est produite</h2>
      <p className="text-slate-400 mb-8 text-center max-w-md">
        Nous sommes désolés, quelque chose s&apos;est mal passé. Veuillez réessayer.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}
