import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from '@/lib/env';

const SITE_NAME = 'Horloge en ligne';
const SITE_DESCRIPTION = 'Horloge en ligne gratuite avec affichage plein écran. Choisissez entre horloge numérique ou analogique, personnalisez les couleurs et le fuseau horaire. Heure exacte en temps réel.';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

// Métadonnées SEO optimisées
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Horloge en ligne gratuite — Heure exacte, plein écran, personnalisable",
    template: "%s | Horloge en ligne"
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "horloge en ligne",
    "heure exacte",
    "horloge numérique",
    "horloge analogique",
    "plein écran",
    "fuseau horaire",
    "horloge gratuite",
    "heure mondiale",
    "quelle heure est-il",
    "heure en ligne",
    "horloge plein écran",
    "horloge personnalisable",
    "heure Paris",
    "heure New York",
    "heure Tokyo",
    "heure Londres",
    "online clock",
    "digital clock",
    "analog clock",
    "fullscreen clock",
    "world time",
    "current time",
    "exact time",
    "clock app",
    "pendule en ligne",
    "montre en ligne",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Horloge en ligne gratuite — Heure exacte, plein écran, personnalisable',
    description: 'Horloge en ligne gratuite avec affichage plein écran. Choisissez entre horloge numérique ou analogique, personnalisez les couleurs et le fuseau horaire.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Horloge en ligne — Affichage de l\'heure exacte en temps réel',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horloge en ligne — Heure exacte, plein écran',
    description: 'Horloge en ligne gratuite avec affichage plein écran. Horloge numérique ou analogique personnalisable.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Horloge en ligne — Heure exacte en temps réel',
      },
    ],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'fr-FR': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  category: 'utility',
  classification: 'Horloge, Outils, Temps',
  other: {
    'application-name': SITE_NAME,
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE_NAME,
    'format-detection': 'telephone=no',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Données structurées Schema.org — WebApplication
const jsonLdApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${SITE_URL}/#app`,
  name: SITE_NAME,
  headline: 'Horloge en ligne gratuite — Heure exacte en temps réel',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  softwareVersion: '1.0.0',
  inLanguage: 'fr',
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'Horloge numérique en temps réel',
    'Horloge analogique classique',
    'Mode plein écran',
    'Personnalisation des couleurs et thèmes',
    'Plus de 30 fuseaux horaires',
    'Format 12h / 24h',
    'Sauvegarde automatique des préférences',
    'URL partageable',
    'Progressive Web App (PWA)',
  ],
  screenshot: `${SITE_URL}/og-image.png`,
  image: `${SITE_URL}/og-image.png`,
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
};

// Données structurées Schema.org — FAQPage
const jsonLdFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment passer en mode plein écran ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cliquez sur l\'icône plein écran en haut à droite de l\'écran ou appuyez sur F11 sur votre clavier. Pour quitter, appuyez sur Échap ou cliquez à nouveau sur l\'icône.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment changer de fuseau horaire ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ouvrez le panneau de paramètres en cliquant sur l\'icône engrenage, puis sélectionnez votre fuseau horaire dans la liste déroulante. L\'heure s\'actualise instantanément.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment partager ma configuration d\'horloge ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dans le panneau de paramètres, cliquez sur « Copier le lien » pour obtenir une URL unique contenant tous vos paramètres. Partagez ce lien avec qui vous voulez !',
      },
    },
    {
      '@type': 'Question',
      name: 'L\'horloge est-elle précise ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, notre horloge utilise l\'heure système de votre appareil et la met à jour en temps réel toutes les 100 millisecondes pour un affichage fluide et précis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle heure est-il dans un autre pays ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Utilisez le sélecteur de fuseau horaire dans les paramètres pour choisir parmi plus de 30 fuseaux horaires : Paris, Londres, New York, Tokyo, Sydney, et bien d\'autres.',
      },
    },
    {
      '@type': 'Question',
      name: 'L\'horloge fonctionne-t-elle hors ligne ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, notre horloge est une Progressive Web App (PWA). Une fois chargée, elle peut fonctionner hors connexion. Installez-la sur votre appareil pour un accès rapide.',
      },
    },
  ],
};

// Données structurées Schema.org — BreadcrumbList
const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: SITE_URL,
    },
  ],
};

// Données structurées Schema.org — WebSite (pour le sitelinks search box)
const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'fr',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <div style={{ padding: '2rem', textAlign: 'center', color: '#f8fafc', backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <h1>Horloge en ligne</h1>
              <p>Cette application nécessite JavaScript pour afficher l&apos;heure en temps réel.</p>
              <p>Veuillez activer JavaScript dans les paramètres de votre navigateur.</p>
            </div>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
