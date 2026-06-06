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