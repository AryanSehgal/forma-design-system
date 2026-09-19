# Local validation — v0.1.0

## Automated checks

- Production build: successful. All 16 component routes are prerendered, along with the overview, getting-started page, token studio, and accessibility lab. The theme-download endpoint is dynamic.
- TypeScript: both workspaces pass `tsc --noEmit`.
- Public package regression suite: **9 tests passed**. Covers button submission defaults, loading/disabled semantics, polymorphic anchors, field associations, progress edge cases, mixed checkbox state, every component entry point, registry consistency, and package export boundaries.
- HTTP route smoke test: **20 pages** returned successful responses with headings; an unknown component returned 404.
- Theme attachment: a valid custom theme returns CSS with the correct attachment header and chosen values; invalid configuration returns HTTP 400.
- Independent consumer: the generated tarball was installed outside the repository. All 16 component imports resolved; React rendering, metadata, and stylesheet resolution passed without installing Next.js.
- Production dependency audit: no reported vulnerabilities at validation time.

## Browser verification

Checked through the in-app browser with desktop and phone viewport settings:

- Overview composition and component documentation layouts.
- Mobile menu opening, closing, and navigation.
- No horizontal document overflow on tested mobile component and accessibility pages.
- Global light/dark switching and independently scoped preview themes.
- Button prop edits reflected in the preview and generated code; loading disabled activation; reset restored defaults.
- Dialog opening, editable form, local save feedback, and focus restoration after save and Escape.
- Tabs changed selection and visible panel with the right-arrow key.
- Select opened with the keyboard; End skipped the disabled last option; Enter selected Astro and restored focus to the combobox.
- Floating select content inherited the dark preview’s theme.
- Search filtered results and navigated to the selected component.
- Theme palette and font changes updated generated CSS; download event verified for the attachment link.
- Black text on white returned a contrast ratio of **21.00:1**.
- Keyboard lab axe scan: **0 violations, 15 checks passed, 0 needs-review items** in the tested state.
- Button preview axe scan: **0 violations, 6 checks passed, 1 needs-review item** for contrast in the patterned preview background. This is surfaced by the UI rather than suppressed.
- WebMCP: read/configure tools registered, a valid configuration updated visible state, and an invalid value was rejected without changing the preview.

## Scope and remaining release work

These results apply to the local review build that produced the deployed playground. They are not a whole-site WCAG certification, exhaustive state coverage, or a full cross-browser matrix. Manual screen-reader testing, a formal accessibility audit, and testing additional browser/device combinations remain appropriate for future releases.

The package is publicly available as [`@aryan_sehgal/forma-ui`](https://www.npmjs.com/package/@aryan_sehgal/forma-ui), and the playground is deployed at [forma-design-system-docs.vercel.app/getting-started](https://forma-design-system-docs.vercel.app/getting-started). GitHub repository setup, npm Trusted Publishing configuration, and licensing remain release-management tasks rather than validation results.
