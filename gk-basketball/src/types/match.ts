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