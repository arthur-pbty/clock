import type { Metadata } from 'next';
import { CONTACT_EMAIL, CONTACT_MAILTO, CONTACT_URL, SITE_URL } from '@/lib/env';

export const metadata: Metadata = {
  title: 'Politique de confidentialite',
  description: `Politique de confidentialite du site ${SITE_URL}`,
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <h1>Politique de confidentialite</h1>
        <p>Derniere mise a jour: 01/04/2026</p>
      </header>

      <div className="legal-sections">
        <section>
          <h2>Donnees collectees</h2>
          <p>
            Cette application ne demande pas de creation de compte et ne collecte pas de donnees
            personnelles identifiantes pour son fonctionnement standard.
          </p>
        </section>

        <section>
          <h2>Stockage local</h2>
          <p>
            Certaines preferences utilisateur (theme, fuseau horaire, format d&apos;affichage)
            peuvent etre enregistrees localement dans votre navigateur afin d&apos;ameliorer
            votre experience.
          </p>
        </section>

        <section>
          <h2>Journaux techniques</h2>
          <p>
            Comme tout service web, des journaux techniques minimum peuvent exister cote serveur
            pour la securite, le diagnostic et la maintenance.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Pour toute question relative a la confidentialite: <a className="underline underline-offset-4" href={CONTACT_URL}>{CONTACT_URL.replace(/^https?:\/\//, '')}</a> ou{' '}
            <a className="underline underline-offset-4" href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>.
          </p>
        </section>
      </div>
    </main>
  );
}