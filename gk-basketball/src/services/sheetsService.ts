import type { Match, GameScorer, SeasonScorer, PlayerScore, SeasonAssister, SeasonBlocker, SeasonRebounder, SeasonStealer } from '../types/match';

const SHEET_ID = '195bKP_61HVF0JCdgTVnV_aH8l-NfPJ1vwV-qw6gOk7s';

function csvUrl(sheet: string) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheet)}`;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') inQuotes = !inQuotes;
    else if (char === ',' && !inQuotes) { result.push(current.trim()); current = ''; }
    else current += char;
  }
  result.push(current.trim());
  return result;
}

function isDataRow(cols: string[]): boolean {
  if (!cols[0] || !cols[1]) return false;
  if (isNaN(Number(cols[2])) || cols[2] === '') return false;
  const skip = ['Top', 'Season', 'Auto', 'Player Name', '▼', 'Fill', 'Game ID'];
  if (skip.some(s => cols[0].includes(s))) return false;
  return true;
}

export async function fetchMatches(): Promise<Match[]> {
  const response = await fetch(csvUrl('Fixtures'));
  const text = await response.text();
  const lines = text.trim().split('\n').slice(1);

  return lines
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

export async function fetchGameScorers(): Promise<GameScorer[]> {
  const response = await fetch(csvUrl('Game Top Scorers'));
  const text = await response.text();
  const lines = text.trim().split('\n').slice(1);

  return lines
    .map((line) => {
      const cols = parseCSVLine(line);
      if (!cols[0] || isNaN(Number(cols[0]))) return null;
      return {
        gameId: Number(cols[0]),
        date: cols[1],
        teamA: cols[2],
        topScorerA: cols[3],
        scoreA: cols[4],
        teamB: cols[5],
        topScorerB: cols[6],
        scoreB: cols[7],
      };
    })
    .filter((m): m is GameScorer => m !== null);
}

export async function fetchSeasonScorers(): Promise<SeasonScorer[]> {
  const response = await fetch(csvUrl('Season Top Scorers'));
  const text = await response.text();
  const lines = text.trim().split('\n');

  return lines
    .map((line) => {
      const cols = parseCSVLine(line);
      if (!isDataRow(cols)) return null;
      return {
        playerName: cols[0],
        team: cols[1],
        totalPoints: Number(cols[2]) || 0,
        gamesPlayed: Number(cols[3]) || 0,
      };
    })
    .filter((m): m is SeasonScorer => m !== null)
    .slice(0, 10);
}

export async function fetchSeasonAssisters(): Promise<SeasonAssister[]> {
  const response = await fetch(csvUrl('Season Top Assisters'));
  const text = await response.text();
  const lines = text.trim().split('\n');

  return lines
    .map((line) => {
      const cols = parseCSVLine(line);
      if (!isDataRow(cols)) return null;
      return {
        playerName: cols[0],
        team: cols[1],
        totalAssists: Number(cols[2]) || 0,
        gamesPlayed: Number(cols[3]) || 0,
      };
    })
    .filter((m): m is SeasonAssister => m !== null)
    .slice(0, 10);
}

export async function fetchSeasonRebounders(): Promise<SeasonRebounder[]> {
  const response = await fetch(csvUrl('Season Top Rebounders'));
  const text = await response.text();
  const lines = text.trim().split('\n');

  return lines
    .map((line) => {
      const cols = parseCSVLine(line);
      if (!isDataRow(cols)) return null;
      return {
        playerName: cols[0],
        team: cols[1],
        totalRebounds: Number(cols[2]) || 0,
        gamesPlayed: Number(cols[3]) || 0,
      };
    })
    .filter((m): m is SeasonRebounder => m !== null)
    .slice(0, 10);
}

export async function fetchSeasonStealers(): Promise<SeasonStealer[]> {
  const response = await fetch(csvUrl('Season Top Stealers'));
  const text = await response.text();
  const lines = text.trim().split('\n');

  return lines
    .map((line) => {
      const cols = parseCSVLine(line);
      if (!isDataRow(cols)) return null;
      return {
        playerName: cols[0],
        team: cols[1],
        totalSteals: Number(cols[2]) || 0,
        gamesPlayed: Number(cols[3]) || 0,
      };
    })
    .filter((m): m is SeasonStealer => m !== null)
    .slice(0, 10);
}

export async function fetchSeasonBlockers(): Promise<SeasonBlocker[]> {
  const response = await fetch(csvUrl('Season Top Blockers'));
  const text = await response.text();
  const lines = text.trim().split('\n');

  return lines
    .map((line) => {
      const cols = parseCSVLine(line);
      if (!isDataRow(cols)) return null;
      return {
        playerName: cols[0],
        team: cols[1],
        totalBlocks: Number(cols[2]) || 0,
        gamesPlayed: Number(cols[3]) || 0,
      };
    })
    .filter((m): m is SeasonBlocker => m !== null)
    .slice(0, 10);
}

export async function fetchPlayerScores(): Promise<PlayerScore[]> {
  const response = await fetch(csvUrl('Player Scores'));
  const text = await response.text();
  const lines = text.trim().split('\n').slice(1);

  return lines
    .map((line) => {
      const cols = parseCSVLine(line);
      if (!cols[0] || isNaN(Number(cols[0]))) return null;
      return {
        gameId: Number(cols[0]),
        team: cols[1],
        playerName: cols[2],
        points: Number(cols[3]) || 0,
        steals: Number(cols[4]) || 0,
        rebounds: Number(cols[5]) || 0,
        assists: Number(cols[6]) || 0,
        blocks: Number(cols[7]) || 0,
        topPerformer: cols[8]?.toLowerCase() === 'yes',
      };
    })
    .filter((p): p is PlayerScore => p !== null);
}