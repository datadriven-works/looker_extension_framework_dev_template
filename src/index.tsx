/// <reference types="webpack-env" />

import React from 'react'
import ReactDOM from 'react-dom'
import { ExtensionProvider } from '@looker/extension-sdk-react'
import { LinearProgress } from '@mui/material'
import { App } from './App'

const getRoot = () => {
  const id = 'extension-root'
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('div')
    el.id = id
    el.style.cssText = 'height:100vh;display:flex'
    document.body.style.margin = '0'
    document.body.appendChild(el)
  }
  return el
}

const render = (Component: typeof App) =>
  ReactDOM.render(
    <ExtensionProvider loadingComponent={<LinearProgress />} requiredLookerVersion=">=21.0">
      <Component />           {/*  <<— was missing  */}
    </ExtensionProvider>,
    getRoot()
  )

// first paint
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => render(App))
} else {
  render(App)
}

// Hot‑module reload (typed via @types/webpack-env)
if (module.hot) {
  module.hot.accept('./App.tsx', () => {
    const NextApp = require('./App.tsx').default
    render(NextApp)
  })
}
