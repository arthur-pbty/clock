import type { Metadata } from 'next';
import { CONTACT_EMAIL, CONTACT_MAILTO, CONTACT_URL, SITE_URL } from '@/lib/env';

export const metadata: Metadata = {
  title: 'Mentions legales',
  description: `Mentions legales du site ${SITE_URL}`,
};

export default function MentionsLegalesPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <h1>Mentions legales</h1>
        <p>Derniere mise a jour: 01/04/2026</p>
      </header>

      <div className="legal-sections">
        <section>
          <h2>Editeur du site</h2>
          <p>Site: {SITE_URL.replace(/^https?:\/\//, '')}</p>
          <p>Responsable de publication: Arthur P.</p>
          <p>
            Contact: <a className="underline underline-offset-4" href={CONTACT_URL}>{CONTACT_URL.replace(/^https?:\/\//, '')}</a> ou{' '}
            <a className="underline underline-offset-4" href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
          </p>
        </section>

        <section>
          <h2>Hebergement</h2>
          <p>Service auto-heberge sur infrastructure Proxmox.</p>
        </section>

        <section>
          <h2>Propriete intellectuelle</h2>
          <p>
            Les contenus presentes sur ce site (textes, elements graphiques et code source specifique)
            restent proteges par les lois en vigueur. Toute reproduction non autorisee est interdite.
          </p>
        </section>

        <section>
          <h2>Liens externes</h2>
          <p>
            Le site peut contenir des liens vers des services externes. Le responsable du site ne peut
            pas etre tenu responsable du contenu de ces services tiers.
          </p>
        </section>
      </div>
    </main>
  );
}