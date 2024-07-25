import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { Round } from '../types/round'

const roundsAtom = atomWithStorage<Round[]>('rounds', [])

export const lastRoundAtom = atom((get) => {
  const rounds = get(roundsAtom)
  return rounds.length > 0 ? rounds[rounds.length - 1] : undefined
})

export const selectedRoundAtom = atom((get) => {
  const rounds = get(roundsAtom)
  const selectedRoundIndex = get(selectedRoundIndexAtom)
  return selectedRoundIndex !== undefined ? rounds[selectedRoundIndex] : undefined
})

export const preSelectedRoundAtom = atom((get) => {
  const rounds = get(roundsAtom)
  const selectedRoundIndex = get(selectedRoundIndexAtom)
  return selectedRoundIndex !== undefined && selectedRoundIndex > 0 ? rounds[selectedRoundIndex - 1] : undefined
})

export const selectedRoundIndexAtom = atomWithStorage<number | undefined>('selectedRoundIndex', undefined)

export const isEditModeAtom = atom((get) => get(selectedRoundIndexAtom) !== undefined)

export default roundsAtom
