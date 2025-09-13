export interface User {
  id: string
  createdAt: Date
  picture?: string | null
  score: number
  attemptsLeft: number
  lastLogin: Date
  lastReset: Date
  email: string
}
