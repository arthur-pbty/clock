export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
      <div className="animate-pulse text-6xl font-mono text-slate-500">
        --:--:--
      </div>
      <p className="mt-4 text-slate-600">Chargement de l&apos;horloge...</p>
    </div>
  );
}
