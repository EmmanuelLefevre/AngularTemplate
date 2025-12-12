module.exports = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  experimentalTernaries: false,
  htmlWhitespaceSensitivity: 'css',
  importOrder: [
    '^@angular/(.*)$',
    '^rxjs',
    '<THIRD_PARTY_MODULES>',
    '^@core/(.*)$',
    '^@shared/(.*)$',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  insertPragma: false,
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'angular'
      }
    }
  ],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false
};

/* =========================================================================
PRETTIER RULES DOCUMENTATION
=========================================================================

arrowParens: "always"
  Force parentheses around arrow function arguments.

bracketSameLine: false
  Place closing angle bracket `>` of multi-line HTML elements onto a new line.

bracketSpacing: true
  Add spaces in objects: { foo: bar } instead of {foo: bar}.

embeddedLanguageFormatting: "auto"
  Prettier automatically formats embedded code (e.g., CSS in JS) if it recognizes it.

endOfLine: "lf"
  Line Feed. This is Unix standard. Even on Windows, Git handles line feeds well.
  This prevents the entire file from appearing "modified" simply because of line breaks.

experimentalTernaries: false
  Keep classic formatting of ternaries (condition? true: false).

htmlWhitespaceSensitivity: "css"
  Respect default CSS "display" property for handling whitespace in HTML.
  Avoid breaking the layout of inline elements.

importOrder
  Defines vertical hierarchy of imports. Plugin reads this table from top to bottom:
  imports matching the first rule will be placed at the very top of the file.

  Rules details (Regex) :
  1. "^@angular/(.*)$"
    Capture all official Angular packages (core, common, router, forms...).
    Convention: Framework always comes first !!!

  2. "^rxjs"
    Captures RxJS imports (Observable, Subject...).
    Positioned high because it's the fundamental asynchronous engine of Angular.

  3. "<THIRD_PARTY_MODULES>"
    This is not a Regex, but a magic keyword from the plugin.
    It captures EVERYTHING coming from 'node_modules' that hasn't been caught by rules 1 and 2

  4. "^@core/(.*)$"
    Capture your TypeScript aliases defined in tsconfig.json for 'core' folder (services, guards, interceptors...)

  5. "^@shared/(.*)$"
    Capture your aliases for 'shared' folder (UI reusable components, pipes, directives...)

  6. "^[./]"
    Capture all relevant imports (starting with . or ..).
    These are "local" files close to current file.
    They are always placed at end to separate external dependencies from internal code.

importOrderSeparation: true
  Empty line between groups.

importOrderSortSpecifiers: true
  Also sort {b, a} into {a, b}.

insertPragma: false
  Do not add @format comment to top of  files.

overrides (Angular Special)
  Essential for correctly parsing Angular syntax (*ngIf, [prop], (event)) in .html files without breaking anything.

plugins: ["@trivago/prettier-plugin-sort-imports"]
  Instructs Prettier to load this external plugin.
  Without this line, all options starting with "importOrder" will be ignored and your imports will not be sorted.

printWidth: 100
  Try to break lines after 100 characters (80 is default, often too short).

proseWrap: "preserve"
  Do not reformat text blocks in Markdown (avoids unnecessary Git diffs).

quoteProps: "as-needed"
  Only put quotes around object keys if syntax requires it (ex: "my-key").

requirePragma: false
  Format all files, not just those with @format tag.

semi: true
  Always add a semicolon at end of instructions.

singleAttributePerLine: true
  Forces one attribute per line in HTML if tag is long.
  Makes Angular templates very vertically readable.

singleQuote: true
  Use single quotes in JS/TS ('text') to reduce visual noise.

tabWidth: 2
  One indentation corresponds to 2 spaces.

trailingComma: "all"
  Adds commas to the end of lists (objects, arrays, functions).
  Makes code changes cleaner in Git.

useTabs: false
  Use spaces for indentation, not tabs.
*/
