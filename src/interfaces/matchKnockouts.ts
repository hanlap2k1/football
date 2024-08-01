export interface IMatchKnockouts {
  id: string
  sequenceId: number
  matchId: string
  leagueId: string
  matchTime: string
  homeName: string
  awayName: string
  homeId: string
  awayId: string
  homeScore: string
  awayScore: string
  homePenaltyScore: string|null
  awayPenaltyScore: string|null
  homeLogo: string
  awayLogo: string
  homeGrouped: string
  awayGrouped: string
  parentHomeSequenceId: string|null
  parentAwaySequenceId: string|null
  season: string
  groupId: string|null
  roundName: string
  matchStatus: string
  championId: string|null
}
