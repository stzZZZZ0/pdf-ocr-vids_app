import { useEffect, useState } from 'react'
    import { useAuth } from '../components/AuthProvider'
    import PDFViewer from '../components/PDFViewer'
    import OCRProcessor from '../components/OCRProcessor'
    import VideoSummary from '../components/VideoSummary'
    import AdBanner from '../components/AdBanner'
    import PremiumModal from '../components/PremiumModal'

    export default function HomePage() {
      const { user } = useAuth()
      const [pdfFile, setPdfFile] = useState(null)
      const [ocrText, setOcrText] = useState('')
      const [videoUrl, setVideoUrl] = useState('')
      const [showPremiumModal, setShowPremiumModal] = useState(false)

      useEffect(() => {
        document.title = "PDF OCR & Résumé Vidéo - Votre Application"
        const metaDescription = document.querySelector('meta[name="description"]')
        metaDescription.setAttribute('content', 'Lisez des PDF, extrayez du texte avec OCR et résumez des vidéos YouTube. Essayez gratuitement !')
      }, [])

      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">PDF OCR & Résumé Vidéo</h1>

          {!user?.isPremium && <AdBanner />}

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Lecteur PDF</h2>
              <input 
                type="file" 
                accept="application/pdf" 
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="mb-4"
              />
              {pdfFile && <PDFViewer file={pdfFile} />}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">OCR</h2>
              <OCRProcessor file={pdfFile} setText={setOcrText} />
              <textarea 
                value={ocrText} 
                readOnly
                className="w-full h-48 p-2 border rounded"
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Résumé Vidéo YouTube</h2>
            <input
              type="text"
              placeholder="Entrez l'URL YouTube"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            {videoUrl && <VideoSummary videoUrl={videoUrl} />}
          </div>

          {showPremiumModal && (
            <PremiumModal 
              onClose={() => setShowPremiumModal(false)}
              onSubscribe={() => {
                setShowPremiumModal(false)
                // Rediriger vers la page de paiement
              }}
            />
          )}
        </div>
      )
    }
