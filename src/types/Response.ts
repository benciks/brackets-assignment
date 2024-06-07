import { type Character } from './Character'

export interface Response {
  count: number
  next: string | null
  previous: string | null
  results: Character[]
}
