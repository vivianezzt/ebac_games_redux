import { PreloadedState } from '@reduxjs/toolkit'
import { RenderOptions, render } from '@testing-library/react'
import { RootState, AppStore, configuraStore } from '../store'

import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderizaComProvider(
  elemento: React.ReactElement,
  {
    preloadState = {},
    store = configuraStore(preloadState),
    ...opcoesAdicionais
  } = {}
) {
  return render(<Provider store={store}>{elemento}</Provider>, opcoesAdicionais)
}
