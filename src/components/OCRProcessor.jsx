import React, { useEffect } from 'react'
    import { createWorker } from 'tesseract.js'

    export default function OCRProcessor({ file, setText }) {
      useEffect(() => {
        const processOCR = async () => {
          if (!file) return
          
          const worker = await createWorker('fra')
          const { data: { text } } = await worker.recognize(file)
          setText(text)
          await worker.terminate()
        }

        processOCR()
      }, [file, setText])

      return null
    }
