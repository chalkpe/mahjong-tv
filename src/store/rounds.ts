import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { Round } from '../types/round'

const roundsAtom = atomWithStorage<Round[]>('rounds', [])

export const lastRoundAtom = atom((get) => {
  const rounds = get(roundsAtom)
  return rounds.length > 0 ? rounds[rounds.length - 1] : undefined
})

export const selectedRoundIndexAtom = atomWithStorage<number | undefined>('selectedRoundIndex', undefined)

export default roundsAtom
