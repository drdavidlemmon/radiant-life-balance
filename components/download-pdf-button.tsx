'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { QuizResults } from '@/types'

interface Props {
  results: QuizResults
  deepDiveResults?: Record<string, Record<string, number>>
}

export function DownloadPDFButton({ results, deepDiveResults }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)
    try {
      // Dynamic import keeps PDF library out of the main bundle
      const { pdf } = await import('@react-pdf/renderer')
      const { ResultsPDF } = await import('./results-pdf')
      const blob = await pdf(
        <ResultsPDF results={results} deepDiveResults={deepDiveResults} />
      ).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'radiant-life-balance-results.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm
        bg-white border-2 border-purple-200 text-purple-700
        hover:border-purple-400 hover:bg-purple-50
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-all duration-200 shadow-sm hover:shadow-md"
    >
      {loading ? (
        <>
          <svg className="animate-spin w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Generating PDF…
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Download My Results (PDF)
        </>
      )}
    </button>
  )
}
