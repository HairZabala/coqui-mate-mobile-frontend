# CoquiMateMobile Mobile App

## Configure splash screen

This template uses `react-native-bootsplash` for handling splash screen. A default DreamWalk logo has been used but can be overridden. Generate a high res asset to be used as the splash
image and run:

`yarn react-native generate-bootsplash path/to/original/asset.png`

additional options can be specified if required:

```
Options:
  --background-color <color>  color used as launch screen background (in hexadecimal format) (default: "#fff")
  --logo-width <width>        logo width at @1x (in dp - we recommand approximately ~100) (default: 100)
  --assets-path [path]        path to your static assets directory (useful to require the logo file in JS)
  --flavor <flavor>           [android only] flavor build variant (outputs in an android resource directory other than "main")
  -h, --help                  output usage information
```

example:

```
yarn react-native generate-bootsplash assets/bootsplash_logo_original.png \
  --background-color=F5FCFF \
  --logo-width=100 \
  --assets-path=assets \
  --flavor=main
```

See the [react-native-bootplash docs](https://github.com/zoontek/react-native-bootsplash) for more information

## Build Environments

### Dev

- Attached to dev backend, used for local development and pushing to DreamWalk Beta platform for internal builds
- Reads from .env.development env file

### UAT

- Attached to UAT backend, used for pushing to DreamWalk Beta platform
- Reads from .env.uat env file

### Production

- Attached to Production backend, used for pushing to App Store/Play Store.
- Using clients Apple Developer account/Google Play production keystore
- Reads from .env.production env file

## GraphQL

## Setup

Configure the schema under `src/graphql/codegen.yml` to point to the GraphQL endpoint for the project.

- Store queries and mutations under the following paths for them to be picked up by codegen:
  `['src/features/*/graphql/*.graphql', 'src/graphql/**/*.graphql', 'src/graphql/*.graphql']`

## Generating GraphQL

This application uses GraphQL CodeGen to automatically generate hooks and typescript typings for all our GraphQL queries and mutations.

Running `yarn codegen` will generate typescript Apollo hooks for any `.graphql` files in the the `src/graphql/` directory or in the `graphql` subdirectory of a feature.
