import type { Match } from '../types/match';

const SHEET_ID = '195bKP_61HVF0JCdgTVnV_aH8l-NfPJ1vwV-qw6gOk7s';
const SHEET_NAME = 'Fixtures';

const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export async function fetchMatches(): Promise<Match[]> {
  const response = await fetch(CSV_URL);
  const text = await response.text();

  const lines = text.trim().split('\n');
  // Skip first 2 rows (title + note) and header row = skip 3 rows total
  const dataLines = lines.slice(1);

  return dataLines
    .map((line) => {
      const cols = parseCSVLine(line);
      if (!cols[0] || isNaN(Number(cols[0]))) return null;

      return {
        gameId: Number(cols[0]),
        day: cols[1],
        date: cols[2],
        time: cols[3],
        teamA: cols[4],
        teamB: cols[5],
        venue: cols[6],
        status: cols[7] as Match['status'],
        scoreA: cols[8] ?? '',
        scoreB: cols[9] ?? '',
      };
    })
    .filter((m): m is Match => m !== null);
}