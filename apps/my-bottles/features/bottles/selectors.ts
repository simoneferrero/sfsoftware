import { RootState } from '../../app/store'
import { Bottle } from '../../types/Bottle'

import { bottlesAdapter } from './slice'
import NAMESPACE from './namespace'

export const { selectById: selectBottleById, selectAll: selectAllBottles } =
  bottlesAdapter.getSelectors((state: RootState) => state[NAMESPACE])

export const selectLoading = (state: RootState): boolean =>
  state[NAMESPACE].loading
export const selectError = (state: RootState): string => state[NAMESPACE].error
export const selectVisibleForm = (state: RootState): boolean =>
  state[NAMESPACE].visibleForm
export const selectSelectedBottle = (state: RootState): Bottle =>
  selectBottleById(state, String(state[NAMESPACE].selectedBottle))
