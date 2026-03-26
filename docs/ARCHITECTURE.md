<h1 align="center">🏗 ARCHITECTURE 🏗</h1>

<br>
<br>

```plaintext
🏗️.github
 ┗ 🤖workflows
   ┣ cleanup.yml
   ┗ pipeline.yml
🐶.husky
💻.vscode
📘docs
🌍public
 ┣ ⚙️.htaccess
 ┣ ⭐favicon.ico
 ┣ 📄maintenance.css
 ┣ 📄maintenance.html
 ┣ 🛠️manifest.json
 ┣ 🤖robots.txt
 ┣ 🗺️sitemap.xml
📂src
 ┣ 🔄_environments
 ┃ ┣ 🔑environment.prod.ts
 ┃ ┗ 🔑environment.ts
 ┣ 🈸app
 ┃ ┣ 🧠core
 ┃ ┃ ┣ ⚙️_config
 ┃ ┃ ┃ ┣ 🔗links
 ┃ ┃ ┃ ┃ ┣ host-links.constant.ts
 ┃ ┃ ┃ ┃ ┣ nav-links.constant.ts
 ┃ ┃ ┃ ┃ ┗ social-links.constant.ts
 ┃ ┃ ┃ ┣ 🔔snackbar
 ┃ ┃ ┃ ┃ ┗ snackbar.constant.ts
 ┃ ┃ ┃ ┗ 👨‍💻team
 ┃ ┃ ┃ ┃ ┗ developers.constant.ts
 ┃ ┃ ┣ 🧱_models
 ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📂environment
 ┃ ┃ ┃ ┣ 📂forms
 ┃ ┃ ┃ ┣ 📂links
 ┃ ┃ ┃ ┣ 📂seo
 ┃ ┃ ┃ ┣ 📂snackbar
 ┃ ┃ ┃ ┣ 📂team
 ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┣ 💉_services
 ┃ ┃ ┃ ┣ 🔐auth
 ┃ ┃ ┃ ┃ ┗ 📄auth.service.ts
 ┃ ┃ ┃ ┣ 📈seo
 ┃ ┃ ┃ ┃ ┗ 📄seo.service.ts
 ┃ ┃ ┃ ┣ 🔔snackbar
 ┃ ┃ ┃ ┃ ┗ 📄snackbar.service.ts
 ┃ ┃ ┃ ┗ 🗣️translation
 ┃ ┃ ┃   ┗ 📄translation.service.ts
 ┃ ┃ ┣ 🚧guards
 ┃ ┃ ┃ ┣ 👑admin
 ┃ ┃ ┃ ┗ 🆔auth
 ┃ ┃ ┗ 🎣interceptors
 ┃ ┃   ┣ 🆔auth
 ┃ ┃   ┗ 🔴error
 ┃ ┣ 🧩features
 ┃ ┃ ┣ 👑admin
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
 ┃ ┃ ┃ ┃ ┣ 📂generic-error
 ┃ ┃ ┃ ┃ ┣ 📂maintenance-error
 ┃ ┃ ┃ ┃ ┣ 📂server-error
 ┃ ┃ ┃ ┃ ┣ 📂timeout-error
 ┃ ┃ ┃ ┃ ┣ 📂unauthorized-error
 ┃ ┃ ┃ ┃ ┣ 📂unfound-error
 ┃ ┃ ┃ ┃ ┗ 📂unknown-error
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
 ┃ ┣ 🎬animations
 ┃ ┣ 🌄background
 ┃ ┣ 🔡fonts
 ┃ ┣ 🗣️i18n
 ┃ ┣ ✨icons
 ┃ ┣ 📷img
 ┃ ┣ 🏢logos
 ┃ ┗ 🔊sounds
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
📄.compodocrc.json
📄.gitattributes
📄.gitignore
📄.htmlhintrc
📄.npmrc
📄.prettier.js
📄.secretlintrc.json
📄.snyk
📄.stylelintrc.json
📄eslint-security.config.js
📄eslint.config.js
📄LICENSE
📄package.json
📄pnpm-lock.yaml
📄README.md
🛡️sonar-project.properties
📄tsconfig.app.json
📄tsconfig.doc.json
📄tsconfig.json
📄tsconfig.spec.json
🧪vitest.config.ts
```
