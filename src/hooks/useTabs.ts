import { useCallback, useMemo } from 'react'

import HistoryTab from '~/tabs/HistoryTab'
import RecordTab from '~/tabs/RecordTab'
import SettingsTab from '~/tabs/SettingsTab'

import { useAtom, useAtomValue } from 'jotai'
import { isEditModeAtom } from '@/store/rounds'
import settingsAtom from '@/store/settings'

import { Tab, tabOptions } from '@/types/tab'

const components = {
  settings: SettingsTab,
  record: RecordTab,
  history: HistoryTab,
}

const useTabs = () => {
  const isEditMode = useAtomValue(isEditModeAtom)
  const [settings, setSettings] = useAtom(settingsAtom)

  const value = useMemo(() => (isEditMode ? 'record' : settings.tab), [isEditMode, settings.tab])
  const onChange = useCallback(
    (_: unknown, tab: Tab) => setSettings((settings) => ({ ...settings, tab })),
    [setSettings]
  )

  const color = useMemo(() => (isEditMode ? ('secondary' as const) : ('primary' as const)), [isEditMode])
  const tabs = useMemo(
    () => tabOptions.map((t) => ({ value: t.value, label: t.label[+isEditMode], component: components[t.value] })),
    [isEditMode]
  )

  return useMemo(() => ({ value, onChange, color, tabs }), [color, onChange, tabs, value])
}

export default useTabs
