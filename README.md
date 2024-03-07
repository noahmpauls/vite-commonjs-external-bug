# Vite CommonJS External File Extension Bug

This repository is a reproduction of a Vite bug.

## Bug Description

**Expected Behavior**

When Vite handles CommonJS packages that export/import files with extensions like `.scss.js`, they should be treated as regular JavaScript files.

**Actual Behavior**

If a CommonJS module includes imports of files with names containing externalized file extensions (e.g. `test.scss.js`, `tests.stylus.js`), Vite produces the following errors for each of the affected files when running `vite`:

```
✘ [ERROR] Could not resolve "vite-dep-pre-bundle-external:/path/to/project/package/test.scss.js"

    vite:dep-pre-bundle:external-conversion:/path/to/project/package/test.tsx.js:1:24:
      1 │ ... { default } from "vite-dep-pre-bundle-external:/path/to/project/package/test.scss.js"...
        ╵                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  The plugin "vite:dep-pre-bundle" didn't set a resolve directory for the file
  "vite:dep-pre-bundle:external-conversion:/path/to/project/package/test.scss.js",
  so esbuild did not search for
  "vite-dep-pre-bundle-external:/path/to/project/package/test.scss.js" on the file
  system.
```

## Running the Reproduction

1. Clone this repository.
2. `cd` to the repo root and `npm install`.
3. Run Vite in the `app` workspace using `npm run -w app dev`.
4. Observe that each of `test.scss.js`, `test.astro.js`, `test.stylus.js`, and `test.tsx.js` encounter an error, while `test.okay.js` is fine.

This repository is a tiny monorepo where a Vite application imports from a `test-package` to make it simple to test various behaviors locally. A CommonJS package in a monorepo requires the extra config options seen in the `vite.config.js` file. [See this GitHub issue.](https://github.com/vitejs/vite/issues/5668)

You can reproduce this same behavior by attempting to import an NPM package that is CommonJS and imports offending files.
