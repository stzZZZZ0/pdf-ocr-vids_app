import React, { useEffect, useState } from 'react'
    import axios from 'axios'
    import YouTube from 'react-youtube'

    export default function VideoSummary({ videoUrl }) {
      const [summary, setSummary] = useState('')
      const videoId = videoUrl.split('v=')[1]

      useEffect(() => {
        const fetchSummary = async () => {
          try {
            const response = await axios.post('/api/summarize', { videoUrl })
            setSummary(response.data.summary)
          } catch (error) {
            console.error('Erreur lors du résumé:', error)
          }
        }

        if (videoUrl) {
          fetchSummary()
        }
      }, [videoUrl])

      return (
        <div className="video-summary">
          <YouTube videoId={videoId} />
          <div className="summary">
            <h3>Résumé:</h3>
            <p>{summary}</p>
          </div>
        </div>
      )
    }
