import { mkdirSync, writeFileSync } from 'node:fs'

const pinThemes = [
  ['A more balanced life starts with one question', '#7c3aed', '#eef2ff'],
  ['Which life area needs your attention?', '#ea580c', '#fff7ed'],
  ['Turn your strengths into your next step', '#16a34a', '#f0fdf4'],
  ['Mind · Body · Spirit · Relationships · Money · Direction', '#2563eb', '#eff6ff'],
  ['30 questions. Six life areas. One next step.', '#9333ea', '#faf5ff'],
  ['Your life balance snapshot is free', '#be123c', '#fff1f2'],
  ['Know a friend who needs a fresh start?', '#0891b2', '#ecfeff'],
  ['Small actions make room for change', '#15803d', '#f0fdf4'],
  ['What is working well in your life?', '#c2410c', '#fff7ed'],
  ['Take five minutes to check in with yourself', '#7c3aed', '#f5f3ff'],
]

function escapeXml(value) { return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') }

mkdirSync('public/social', { recursive: true })
for (const [i, [headline, accent, background]] of pinThemes.entries()) {
  const lines = headline.split(' ').reduce((out, word) => {
    if (!out.length || `${out[out.length - 1]} ${word}`.length > 23) out.push(word)
    else out[out.length - 1] += ` ${word}`
    return out
  }, [])
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500" viewBox="0 0 1000 1500"><rect width="1000" height="1500" fill="${background}"/><circle cx="815" cy="220" r="260" fill="${accent}" opacity=".12"/><circle cx="110" cy="1170" r="280" fill="${accent}" opacity=".1"/><path d="M500 390 C360 270 230 430 500 670 C770 430 640 270 500 390" fill="${accent}" opacity=".75"/><text x="90" y="105" font-size="33" font-family="Arial" font-weight="bold" fill="${accent}">RADIANT LIFE BALANCE</text>${lines.map((line, j) => `<text x="90" y="${780 + j * 88}" font-size="58" font-family="Arial" font-weight="bold" fill="#172033">${escapeXml(line)}</text>`).join('')}<rect x="90" y="1270" rx="32" width="820" height="118" fill="${accent}"/><text x="500" y="1347" text-anchor="middle" font-size="35" font-family="Arial" font-weight="bold" fill="white">TAKE THE FREE QUIZ</text><text x="500" y="1450" text-anchor="middle" font-size="29" font-family="Arial" fill="#334155">radiantlifebalance.com/quiz</text></svg>`
  writeFileSync(`public/social/pin-${String(i + 1).padStart(2, '0')}.svg`, svg)
}
