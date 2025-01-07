import { Helmet } from 'react-helmet'

    export default function SchemaMarkup() {
      const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PDF OCR & Résumé Vidéo",
        "description": "Application pour lire des PDF, extraire du texte avec OCR et résumer des vidéos YouTube",
        "applicationCategory": "Utility",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "9.99",
          "priceCurrency": "EUR"
        }
      }

      return (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        </Helmet>
      )
    }
