import React from 'react'
    import { Helmet } from 'react-helmet'

    export default function Blog() {
      return (
        <div className="container mx-auto px-4 py-8">
          <Helmet>
            <title>Blog - PDF OCR & Résumé Vidéo</title>
            <meta name="description" content="Découvrez des articles sur l'OCR, le résumé de vidéos et les outils PDF." />
          </Helmet>

          <h1 className="text-3xl font-bold mb-8">Blog</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <article>
              <h2 className="text-2xl font-semibold mb-4">Comment extraire du texte d'un PDF avec OCR</h2>
              <p className="mb-4">Découvrez comment utiliser notre outil OCR pour extraire du texte de vos PDF.</p>
              <a href="/blog/ocr-pdf" className="text-blue-500 hover:underline">Lire l'article</a>
            </article>

            <article>
              <h2 className="text-2xl font-semibold mb-4">Les 5 meilleurs outils pour résumer des vidéos YouTube</h2>
              <p className="mb-4">Comparez les meilleurs outils pour résumer des vidéos YouTube.</p>
              <a href="/blog/resume-video" className="text-blue-500 hover:underline">Lire l'article</a>
            </article>
          </div>
        </div>
      )
    }
