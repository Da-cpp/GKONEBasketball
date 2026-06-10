export type MatchStatus = 'Upcoming' | 'Completed';

export interface Match {
  gameId: number;
  day: string;
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  venue: string;
  status: MatchStatus;
  scoreA: string;
  scoreB: string;
}

export interface GameScorer {
  gameId: number;
  date: string;
  teamA: string;
  topScorerA: string;
  scoreA: string;
  teamB: string;
  topScorerB: string;
  scoreB: string;
}

export interface SeasonScorer {
  playerName: string;
  team: string;
  totalPoints: number;
  gamesPlayed: number;
}

export interface SeasonStealer {
  playerName: string;
  team: string;
  totalSteals: number;
  gamesPlayed: number;
}

export interface SeasonRebounder {
  playerName: string;
  team: string;
  totalRebounds: number;
  gamesPlayed: number;
}

export interface SeasonAssister {
  playerName: string;
  team: string;
  totalAssists: number;
  gamesPlayed: number;
}

export interface SeasonBlocker {
  playerName: string;
  team: string;
  totalBlocks: number;
  gamesPlayed: number;
}

export interface PlayerScore {
  gameId: number
  team: string
  playerName: string
  points: number
  steals: number
  rebounds: number
  assists: number
  blocks: number
  topPerformer: boolean
}