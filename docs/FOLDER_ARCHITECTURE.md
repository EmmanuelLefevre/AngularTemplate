<h1 align="center">🏗 ARCHITECTURE DE DOSSIER 🏗</h1>

<br>
<br>

```plaintext
🏗️.github
 ┗ 🤖workflows
   ┗ pipeline.yml
🐶.husky
💻.vscode
📘docs
🌍public
 ┣ 🛠️manifest.json
 ┣ 🤖robots.txt
 ┣ 🗺️sitemap.xml
📂src
 ┣ 🔄_environments
 ┃ ┣ 🔑environment.prod.sample.ts
 ┃ ┗ 🔑environment.ts
 ┣ 🈸app
 ┃ ┣ 🧠core
 ┃ ┃ ┣ ⚙️_config
 ┃ ┃ ┃ ┣ host-links.constant.ts
 ┃ ┃ ┃ ┣ nav-links.constant.ts
 ┃ ┃ ┃ ┗ social-links.constant.ts
 ┃ ┃ ┣ 🧱_models
 ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📂links
 ┃ ┃ ┃ ┣ 📂seo
 ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┣ 💉_services
 ┃ ┃ ┃ ┣ 🔐auth
 ┃ ┃ ┃ ┃ ┗ 📄auth.service.ts
 ┃ ┃ ┃ ┗ 📈seo
 ┃ ┃ ┃   ┗ 📄seo.service.ts
 ┃ ┃ ┣ 📂guard
 ┃ ┃ ┃ ┗ 📄admin.guard.ts
 ┃ ┃ ┗ 📂interceptor
 ┃ ┃   ┗ 📂auth
 ┃ ┃     ┗ 📄auth.interceptor.ts
 ┃ ┣ 🧩features
 ┃ ┃ ┣ 👔admin
 ┃ ┃ ┃ ┣ ⚙️_config
 ┃ ┃ ┃ ┣ 🧱_models
 ┃ ┃ ┃ ┣ 💉_services
 ┃ ┃ ┃ ┣ 🗃️components
 ┃ ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┃ ┃ ┣ 📄dashboard.component.html
 ┃ ┃ ┃ ┃ ┗ 📄dashboard.component.ts
 ┃ ┃ ┃ ┣ 👁️admin-views
 ┃ ┃ ┃ ┣ 📂settings
 ┃ ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┣ 📄admin-layout.component.html
 ┃ ┃ ┃ ┗ 📄admin-layout.component.ts
 ┃ ┃ ┣ 🔓private
 ┃ ┃ ┃ ┣ ⚙️_config
 ┃ ┃ ┃ ┣ 🧱_models
 ┃ ┃ ┃ ┣ 💉_services
 ┃ ┃ ┃ ┣ 🗃️components
 ┃ ┃ ┃ ┣ 👁️private-views
 ┃ ┃ ┃ ┣ 📄private.component.html
 ┃ ┃ ┃ ┣ 📄private.component.ts
 ┃ ┃ ┃ ┣ 📄private.config.ts
 ┃ ┃ ┃ ┗ 📄private.route.ts
 ┃ ┃ ┗ 😺public
 ┃ ┃   ┣ ⚙️_config
 ┃ ┃   ┣ 🧱_models
 ┃ ┃   ┣ 💉_services
 ┃ ┃   ┣ 🗃️components
 ┃ ┃   ┣ 👁️public-views
 ┃ ┃   ┃ ┣ ✉️contact
 ┃ ┃   ┃ ┗ 🏠home
 ┃ ┃   ┣ 📄public.component.html
 ┃ ┃   ┣ 📄public.component.ts
 ┃ ┃   ┣ 📄public.config.ts
 ┃ ┃   ┗ 📄public.route.ts
 ┃ ┣ ♻️shared
 ┃ ┃ ┣ 🎛️_directives
 ┃ ┃ ┣ ⚗️_pipes
 ┃ ┃ ┣ 🧰_utils
 ┃ ┃ ┣ 🗃️components
 ┃ ┃ ┃ ┣ 📂footer
 ┃ ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ❌error-handler
 ┃ ┃ ┃ ┣ 👁️error-views
 ┃ ┃ ┃ ┃ ┣ 📂server-error
 ┃ ┃ ┃ ┃ ┣ 📂unauthorized-error
 ┃ ┃ ┃ ┃ ┣ 📂unconnected-error
 ┃ ┃ ┃ ┃ ┗ 📂unfound-error
 ┃ ┃ ┃ ┣ 📄error-handler.component.html
 ┃ ┃ ┃ ┗ 📄error-handler.component.ts
 ┃ ┃ ┗ 📄shared.ts
 ┃ ┣ 📄app.component.html
 ┃ ┣ 📄app.component.ts
 ┃ ┣ 📄app.config.ts
 ┃ ┗ 📄app.routes.ts
 ┣ 🖼️assets
 ┃ ┣ ⚙️_config
 ┃ ┣ 💾_data
 ┃ ┣ 🗣️_i18n
 ┃ ┣ 🔡fonts
 ┃ ┣ ✨icons
 ┃ ┣ 📷img
 ┃ ┗ 🏢logos
 ┣ 🎨styles
 ┃ ┣ 📂abstracts
 ┃ ┃ ┣ 🎨_functions.scss
 ┃ ┃ ┣ 🎨_mixins.scss
 ┃ ┃ ┗ 🎨_index.scss
 ┃ ┣ 📂base
 ┃ ┃ ┣ 🎨_animations.scss
 ┃ ┃ ┣ 🎨_fonts.scss
 ┃ ┃ ┣ 🎨_globals.scss
 ┃ ┃ ┣ 🎨_reset.scss
 ┃ ┃ ┣ 🎨_typography.scss
 ┃ ┃ ┗ 🎨_utilities.scss
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 🎨_admin-layout.scss
 ┃ ┃ ┗ 🎨_main-layout.scss
 ┃ ┗ 📂themes
 ┃   ┣ 🎨_light-theme.scss
 ┃   ┣ 🎨_material-overrides.scss
 ┃   ┗ 🎨_theme-variables.scss
 ┣ 📄index.html
 ┣ 📄main.ts
 ┣ 🎨styles.scss
 ┗ 🧪test-setup.ts
📄.....
📄.gitignore
📄.gitleaks.toml
📄.npmrc
📄.stylelintrc.json
📄eslint-security.config.js
📄eslint.config.js
📄LICENSE
📄package.json
📄pnpm-lock.yaml
📄README.md
🛡️sonar-project.properties
🧪.vitest.config.ts
📄.....
```
