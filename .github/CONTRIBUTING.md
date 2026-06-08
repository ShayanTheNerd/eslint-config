# Contributing Guidelines
Thank you for your interest in contributing to this project.

## Code of Conduct
This project is released with a [Contributor Covenant Code of Conduct][code-of-conduct]. By participating in this project, you agree to abide by its terms.

## Reporting Bugs
To report a bug, please [open a bug report][bug-report-template] and include enough information for the issue to be reproduced.

## Requesting Features
To request a new feature, please [open a feature request][feature-request-template] and describe the problem it solves and the behavior you would like to see.

## Development Workflow
1. Create a feature branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```

2. Commit your changes using the [Conventional Commits Specification][conventional-commits]:
   ```sh
   git commit -m "feat: add some feature"
   ```

3. Push your branch:
   ```sh
   git push origin feature/your-feature-name
   ```

4. Open a pull request and describe the changes you made and, when applicable, the problem they solve.

## Local Development Notes
[ESLint's VS Code extension][eslint-vscode-extension] currently does not work reliably when importing directly from the source:
```ts
import { defineConfig } from './src/index.ts';
```

Instead, it works correctly when importing from the build output:
```ts
import { defineConfig } from './dist/index.mjs';
```

For development, run:
```sh
pnpm watch:package
```

This keeps the build output (_dist/*_) in sync with the source changes, allowing the extension to pick up your modifications. You may occasionally need to restart the ESLint server in VS Code for changes to take effect.

This build-first workflow is also reflected elsewhere in the project:
- The `inspect` script runs `pnpm build:package` before launching `eslint-config-inspector`.
- The `ci:validate` script builds the package before linting and again afterward to ensure the generated output remains in sync with any fixes applied during linting.

## Type Generation
This project relies on automatically generated TypeScript types powered by [ESLint TypeGen][eslint-typegen].

The source of truth for type generation is _./scripts/configs/eslint.config.reference.ts_. This file intentionally enables all supported API options, configurations, and rules so the generated types remain complete and accurate.

If you:
- add a new rule,
- add options to an existing rule, or
- add a new configuration,

you must update _eslint.config.reference.ts_ accordingly and regenerate the types:
```sh
pnpm generate:types
```

### Dependency Updates
When updating dependencies, you can use:
```sh
pnpm update:deps
```

This will help you interactively update dependencies, then it will regenerates the project's types and documentation.

Additionally, if _pnpm-lock.yaml_ changes, the pre-commit Git hook automatically runs:
```sh
pnpm generate:types && pnpm generate:docs
```

## Documentation
The API Reference section of _README.md_ is generated from the source code and should never be edited manually.

Some parts of the documentation generator rely on hard-coded type names, interface names, and option property names when determining how the API Reference should be rendered. If you rename, remove, or restructure any of these definitions, make sure to update the corresponding documentation-generation logic as well so the generated output remains accurate.

After making changes to the source code, regenerate the documentation:
```sh
pnpm generate:docs
```

Documentation updates are enforced in two places:
- If the types in _src/types/**/*.d.ts_ change, the pre-commit Git hook automatically runs `pnpm generate:docs`.
- The CI pipeline verifies that _README.md_ is up to date and fails if the generated API Reference differs from the committed version.

## License
By contributing, you agree that your contributions will be licensed under the [project's LICENSE][license].

<!-- References -->
[bug-report-template]: https://github.com/ShayanTheNerd/eslint-config/issues/new?template=bug_report.md
[code-of-conduct]: ./CODE_OF_CONDUCT.md
[conventional-commits]: https://www.conventionalcommits.org/en/v1.0.0
[eslint-typegen]: https://github.com/antfu/eslint-typegen
[eslint-vscode-extension]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[feature-request-template]: https://github.com/ShayanTheNerd/eslint-config/issues/new?template=feature_request.md
[license]: ../LICENSE
