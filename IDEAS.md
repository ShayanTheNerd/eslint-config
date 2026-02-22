- Use Citty from UnJS for the CLI. Consider [Node.js CLI apps best practices](https://github.com/lirantal/nodejs-cli-apps-best-practices). Check out [@eslint/create-config](https://github.com/eslint/create-config) and [@tsdown/exe](https://tsdown.dev/options/exe).
- Let Sheibak try it and give feedback. (<https://t.me/fullstacksjs/163197/943851>) Also ask about whether `autoDetectDeps` should be `verbose` by default. Also ask whether the default values of `removeUnusedImports` should be `false`.
- Check the space between the title and the badges on <https://npmx.dev/package/@shayanthenerd/eslint-config>.
- Add eslint-plugin-react-refresh.

**Epic Center**
- Manually find and update the deprecated utility classes if the linter doesn't warn agains them. (<https://tailwindcss.com/blog/tailwindcss-v4-3#more-logical-property-utilities>). Same for the custom scrollbar utilities (<https://tailwindcss.com/blog/tailwindcss-v4-3#new-scrollbar-utilities>).
- Consider using branded types (e.g. `type Email = string & { readonly [EmailBrand]: true };` where `[EmailBrand]` is a unique symbol). Note that Zod has `.brand()`.
- Consider applying [CSS containment](https://csswizardry.com/2026/04/what-is-css-containment-and-how-can-i-use-it/#containment-in-the-real-world) to blog, products, quick search, etc.
- Update the color system? (<https://theadminbar.com/semantics-and-primitives-color-system>)
- Clean-up `watch` and `watchEffect`.
- Tokenize `z-index` values.
- Use `font-variant-numerictabular-nums;` for the login OTP countdown timer.
- Try <https://boneyard.vercel.app>
- Add unique IDs to toasts to prevent douplicates (<https://github.com/nuxt/ui/releases/tag/v4.5.0#:~:text=%F0%9F%9A%AB%20Duplicate%20toast%20prevention>).
- <https://github.com/nuxt/eslint/releases/tag/v1.14.0>
- [Horizontal tooltip](https://github.com/nuxt/ui/issues/5666).
- Try `focusOnChange="false"` on NuxtUI's `<NumberInput>` component and close [its issue](https://github.com/nuxt/ui/issues/5555).
- In Epic Center(_tsconfig.json_): // remove `"allowArbitraryExtensions": true` due to <https://nuxt.com/blog/v4-3#bug-fixes> ?
- Try putting images in a folder other than `public` (does it work with @nuxt/image v2?).
- Use `box-sizing: content-box` for `<textarea>`s.
- ⚠️ make sure the items in the navgation menu appear as either `menuitem` or `listitem`, not `generic`. How about a combination of menu items and navigation items in a navigation menu?
- Deployment command:
```shell
zip -r legacy.zip dist/ && scp legacy.zip ecd:/home/ecd/legacy.zip && ssh ecd 'rm -rf legacy && unzip legacy.zip -d legacy'
```
- Try Up-Fetch.
- Add `scroll-margin-top` and "Skip to main content" link for keyboard navigation.
- Nuxt sample repositories:
  - [Nuxt Movies](https://github.com/nuxt/movies)
  - [Nuxt Vercel ISR](https://github.com/danielroe/nuxt-vercel-isr)
- [Run-time config](https://nuxt.com/docs/api/nuxt-config#runtimeconfig-1), [env file](https://nuxt.com/docs/api/composables/use-runtime-config#using-the-env-file) for API tokens. dotenv vault and [FullstacksJS Config](https://config.fullstacksjs.com/) and [c12](https://github.com/unjs/c12)
- [Input errors with better UX](https://youtu.be/awNYtIAu6pI).
- Edge-side rendering ([ESR](https://nuxt.com/docs/guide/concepts/rendering#edge-side-rendering)).
- [Good interface details](https://github.com/raunofreiberg/interfaces), [performance](https://roadmap.sh/best-practices/frontend-performance), and [bundle size](https://sonda.dev).
- Images must get optimized even when SSR is false ([link](https://image.nuxt.com/advanced/static-images)).
- [Sliding enter animation](https://antfu.me/posts/sliding-enter-animation).
- [Optimistic updates with `useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data).
- [Pinia Colada](https://pinia-colada.esm.dev) and `refDebounced` for loading spinners.
- [`ViewTransitions`' fallback and limitations](https://nuxt.com/docs/getting-started/transitions#view-transitions-api-experimental).
- [Dynamic page/layout transitions](https://nuxt.com/docs/getting-started/transitions#dynamic-transitions).
- Dependency graphs with [dependency-cruiser](https://github.com/sverweij/dependency-cruiser). Also check barrel files and use [vite-plugin-debarrel](https://gist.github.com/developit/d2047ccb47d15b01486484fb79a2f51a).
- [Inline CSS](https://nuxt.com/docs/getting-started/styling#lcp-advanced-optimizations) or use a critters package.
- PWA: [Serwist](https://serwist.pages.dev) | [Timesy's PWA config](https://github.com/remvze/timesy/blob/main/astro.config.mjs)

```js
applicationName: title,
mobileWebAppCapable: 'yes',
appleMobileWebAppTitle: title,
appleMobileWebAppCapable: 'yes',
appleMobileWebAppStatusBarStyle: 'black-translucent',
```
```html
<link rel="apple-touch-fullscreen" content="yes" />
<link rel="apple-touch-startup-image" media="(orientation: portrait)" href="/images/splash/portrait.png" />
<link rel="apple-touch-startup-image" media="(orientation: landscape)" href="/images/splash/landscape.png" />
```

- Compare final CSS bundle size with and without `:uno:` using [Inspector](https://unocss.dev/tools/inspector#inspector) and compare it with Tailwind's output.
  _uno.config.ts_:

```ts
import presetAutoprefixer from 'unocss-preset-autoprefixer';
import {
  presetWind,
  defineConfig,
  transformerDirectives,
  transformerCompileClass,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  separators: [':'],
  presets: [presetAutoprefixer(['last 3 years']), presetWind({ variablePrefix: 'uno-' })],
  transformers: [
    transformerCompileClass(),
    transformerVariantGroup({ separators: [':'] }),
    transformerDirectives({ applyVariable: false }),
  ],
  content: {
    pipeline: {
      include: [/\\.(?:vue|ts)(?:$|\\?)/],
    },
  },
});
```
