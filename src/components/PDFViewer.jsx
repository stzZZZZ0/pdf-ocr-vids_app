import React, { useEffect, useRef } from 'react'
    import * as pdfjsLib from 'pdfjs-dist'
    import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url'

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

    export default function PDFViewer({ file }) {
      const canvasRef = useRef(null)

      useEffect(() => {
        const loadPdf = async () => {
          const fileReader = new FileReader()
          fileReader.onload = async (e) => {
            const pdf = await pdfjsLib.getDocument(e.target.result).promise
            const page = await pdf.getPage(1)
            const viewport = page.getViewport({ scale: 1.5 })
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            
            canvas.height = viewport.height
            canvas.width = viewport.width
            
            const renderContext = {
              canvasContext: context,
              viewport: viewport
            }
            await page.render(renderContext).promise
          }
          fileReader.readAsArrayBuffer(file)
        }

        if (file) {
          loadPdf()
        }
      }, [file])

      return <canvas ref={canvasRef} />
    }
