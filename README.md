# Looker Extension Starter Template

A minimal React + TypeScript project that bundles to **`bundle.js`** and runs inside the [Looker Extension Framework](https://cloud.google.com/looker/docs/reference/extensions). It gives you a hot‑reloading development loop and a production build in a single command.

---

## ️🚀  Quick start

| Step | Command | Notes |
|------|---------|-------|
| **1. Install dependencies** | `npm install` | Requires **Node 18+**. |
| **2. Start the dev server** | `npm run start` | Serves `https://localhost:8080/bundle.js` with Webpack in HMR mode. |
| **3. Register the extension in Looker** | Add the snippet below to your project’s `manifest.lkml` and **commit / deploy**. |
| **4. Open the extension** | In Looker → ⚙️ **Admin** → *Develop* → *Manage LookML Projects* → open the project → *Develop* menu → *Your Extension App*. |

```lkml
# manifest.lkml
application: extension_app {
  label: "Extension App"
  url: "https://localhost:8080/bundle.js"
  entitlements: {
    core_api_methods: ["lookml_model_explore", "all_lookml_models", "run_query", "create_query", "me", "run_inline_query"]
    navigation: yes
    use_embeds: yes
    use_iframes: yes
    new_window: yes
    new_window_external_urls: ["https://developers.generativeai.google/*"]
    local_storage: yes
  }
}
```

> **HTTPS & certificates**  
> Looker only loads extensions over **HTTPS**. The dev server ships with a self‑signed certificate; your browser will ask you to trust it the first time you visit `https://localhost:8080`.

---

## Build for production

```bash
npm run build   # outputs ≈dist/bundle.js (minified)
```

*Host the produced `bundle.js` somewhere HTTPS‑accessible (S3, GCS, Vercel, etc.) and update the `url:` in `manifest.lkml` accordingly.*

---

## Project layout

```
.
├─ src/
│  ├─ index.tsx      # entry; mounts <App/> into the ExtensionProvider
│  └─ App.tsx        # "Hello world" UI component
├─ webpack.develop.js
├─ webpack.prod.js
├─ tsconfig.json
└─ package.json
```

---

## NPM scripts

| Script | What it does |
|--------|--------------|
| `npm run start` | Webpack dev‑server @ `https://localhost:8080` with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run clean` | Deletes `dist/` |
| `npm run lint`  | ESLint on `src/**/*.{ts,tsx}` |
| `npm test`      | Jest unit tests |

---

## Updating React / SDK versions

* **React 17** is required by `@looker/extension-sdk-react 24.x`.  
  If you want React 18, upgrade the SDKs to **25.x** *and then* bump React.
* After changing React’s major version **delete `node_modules/` and `package‑lock.json`** and reinstall to avoid conflicts.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `npm ERR! ERESOLVE unable to resolve dependency tree` | Remove `node_modules` & `package‑lock.json`, ensure React and SDK versions are compatible, then `npm install`. |
| Blank page in Looker | Verify `manifest.lkml` points to the correct HTTPS URL and that the dev server is running. Open the browser console for errors. |
| `module.hot` typing error | We include `@types/webpack-env`; make sure `/// <reference types="webpack-env" />` is at the top of `src/index.tsx`. |

---

## License

Apache 2.0 (see `LICENSE`).

