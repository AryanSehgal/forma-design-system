# Automated npm publishing

`publish-ui.yml` publishes a patch release when a commit reaches `main` and changes the component package. The package name is [`@aryan_sehgal/forma-ui`](https://www.npmjs.com/package/@aryan_sehgal/forma-ui).

To enable or verify it:

1. Push this repository to GitHub.
2. On npm, open the package's **Trusted publishers** settings and add **GitHub Actions**.
3. Enter the exact GitHub owner, repository, and workflow filename `publish-ui.yml`.
4. Allow the publisher to run `npm publish` directly.
5. In GitHub, enable workflow read/write permissions under **Settings → Actions → General** if the workflow cannot push its version commit.

The workflow uses OpenID Connect (`id-token: write`) and stores no npm token. It builds `packages/ui` before type-checking the workspaces because the docs app consumes the package through its compiled exports. It then runs tests, increments the patch version, rebuilds and publishes the package publicly, and commits the changed package version and lockfile back to `main`.

The workflow only runs for changes under `packages/ui`, `package.json`, or `package-lock.json`. Documentation-only changes do not create npm releases. Manual runs are available through the **Run workflow** button.

Every qualifying push creates a patch release. For larger feature or breaking releases, change the version manually and adjust the workflow to use that versioning policy before publishing.
