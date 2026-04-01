import { ClockApp } from '@/components/ClockApp';
import { CONTACT_EMAIL, CONTACT_MAILTO, CONTACT_URL } from '@/lib/env';

// Contenu SEO visible en bas de page pour l'indexation Google
function SEOContent() {
  return (
    <article className="seo-content" itemScope itemType="https://schema.org/Article">
      <header>
        <h1 itemProp="headline">Horloge en ligne gratuite — Heure exacte en temps réel</h1>
        <p className="seo-intro" itemProp="description">
          Découvrez notre horloge en ligne gratuite avec affichage en temps réel.
          Choisissez entre une horloge numérique moderne ou une horloge analogique 
          classique pour consulter l&apos;heure exacte n&apos;importe quand, où que vous soyez.
        </p>
      </header>

      <section id="features">
        <h2>Fonctionnalités de l&apos;horloge en ligne</h2>
        <div className="seo-features">
          <div className="seo-feature">
            <h3>🕐 Horloge numérique et analogique</h3>
            <p>
              Basculez entre un affichage numérique moderne avec ou sans secondes, 
              et une horloge analogique au design élégant. Format 12 heures ou 24 heures au choix.
            </p>
          </div>
          <div className="seo-feature">
            <h3>🖥️ Mode plein écran</h3>
            <p>
              Transformez votre écran en une horloge géante. Idéal pour les bureaux, 
              les salles de réunion, les événements ou pour garder un œil sur l&apos;heure 
              depuis n&apos;importe où dans la pièce.
            </p>
          </div>
          <div className="seo-feature">
            <h3>🌍 Plus de 30 fuseaux horaires</h3>
            <p>
              Consultez l&apos;heure dans le monde entier : Paris, Londres, New York, 
              Los Angeles, Tokyo, Sydney, Hong Kong, Dubaï, Singapour, et bien d&apos;autres villes. 
              Notre horloge mondiale affiche l&apos;heure exacte dans n&apos;importe quel fuseau horaire.
            </p>
          </div>
          <div className="seo-feature">
            <h3>🎨 12 thèmes personnalisables</h3>
            <p>
              Personnalisez votre horloge avec nos thèmes : Minuit, Océan, Forêt, 
              Coucher de soleil, Lavande, Rose, Charbon, Neige, Ambre, Émeraude, Rubis et Cyberpunk.
            </p>
          </div>
          <div className="seo-feature">
            <h3>💾 Sauvegarde automatique</h3>
            <p>
              Vos préférences sont automatiquement sauvegardées et restaurées à chaque visite. 
              Partagez votre configuration avec un lien unique.
            </p>
          </div>
          <div className="seo-feature">
            <h3>📱 Progressive Web App</h3>
            <p>
              Installez l&apos;horloge sur votre appareil comme une application native.
              Fonctionne hors ligne une fois chargée.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="seo-faq" itemScope itemType="https://schema.org/FAQPage">
        <h2>Questions fréquentes</h2>
        
        <details itemScope itemProp="mainEntity" itemType="https://schema.org/Question" open>
          <summary itemProp="name">Comment passer en mode plein écran ?</summary>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Cliquez sur l&apos;icône plein écran en haut à droite de l&apos;écran ou appuyez 
              sur F11 sur votre clavier. Pour quitter le mode plein écran, appuyez sur Échap 
              ou cliquez à nouveau sur l&apos;icône.
            </p>
          </div>
        </details>

        <details itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <summary itemProp="name">Comment changer de fuseau horaire ?</summary>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Ouvrez le panneau de paramètres en cliquant sur l&apos;icône engrenage, 
              puis sélectionnez votre fuseau horaire dans la liste déroulante. 
              L&apos;heure s&apos;actualise instantanément.
            </p>
          </div>
        </details>

        <details itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <summary itemProp="name">Comment partager ma configuration d&apos;horloge ?</summary>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Dans le panneau de paramètres, cliquez sur « Copier le lien » pour 
              obtenir une URL unique contenant tous vos paramètres. Partagez 
              ce lien avec qui vous voulez !
            </p>
          </div>
        </details>

        <details itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <summary itemProp="name">L&apos;horloge est-elle précise ?</summary>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Oui, notre horloge utilise l&apos;heure système de votre appareil et 
              la met à jour en temps réel toutes les 100 millisecondes pour un 
              affichage fluide et précis.
            </p>
          </div>
        </details>

        <details itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <summary itemProp="name">Quelle heure est-il dans un autre pays ?</summary>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Utilisez le sélecteur de fuseau horaire dans les paramètres pour choisir 
              parmi plus de 30 fuseaux horaires incluant Paris, Londres, New York, 
              Tokyo, Sydney, et bien d&apos;autres villes du monde.
            </p>
          </div>
        </details>

        <details itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <summary itemProp="name">L&apos;horloge fonctionne-t-elle hors ligne ?</summary>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Oui, notre horloge est une Progressive Web App (PWA). Une fois chargée, 
              elle peut fonctionner hors connexion. Installez-la sur votre appareil 
              pour un accès rapide depuis votre écran d&apos;accueil.
            </p>
          </div>
        </details>
      </section>
    </article>
  );
}

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <a href="#main-clock" className="skip-to-content">
        Aller au contenu principal
      </a>
      <ClockApp />
      <SEOContent />
      <footer className="seo-footer" role="contentinfo">
        <div className="footer-grid">
          <section aria-labelledby="footer-navigation">
            <h2 id="footer-navigation">Navigation</h2>
            <nav aria-label="Navigation principale du site">
              <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="https://arthurp.fr" target="_blank" rel="noopener noreferrer">Projets</a></li>
                <li><a href="#features">Fonctionnalites</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">Contact</a></li>
              </ul>
            </nav>
          </section>

          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact">Contact</h2>
            <ul>
              <li><a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">{CONTACT_URL.replace(/^https?:\/\//, '')}</a></li>
              <li><a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a></li>
              <li><a href="https://arthurp.fr" target="_blank" rel="noopener noreferrer">arthurp.fr</a></li>
              <li><a href="https://github.com/arthur-pbty" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </section>

          <section aria-labelledby="footer-legal">
            <h2 id="footer-legal">Informations</h2>
            <ul>
              <li><a href="/mentions-legales">Mentions legales</a></li>
              <li><a href="/politique-confidentialite">Politique de confidentialite</a></li>
              <li><a href="#main-clock">Horloge en direct</a></li>
            </ul>
          </section>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Arthur P. Tous droits reserves.</p>
          <p>
            Fait avec <span aria-hidden="true">❤️</span> et auto-heberge sur Proxmox.
          </p>
        </div>
      </footer>
    </>
  );
}
