# PLIMZO

Official launch site for PLIMZO — a tiny creature powered by memes, laughter, and community noise.

## Local development

```bash
pnpm install
pnpm dev
```

## Production

```bash
pnpm build
pnpm start
```

The server reads Railway's `PORT` environment variable automatically. `railway.toml` contains the build, start, and health-check configuration.

## Launch configuration

The contract and buy buttons intentionally show **Coming soon** until the token is deployed. Add only the verified contract address and official launch URL after launch.
