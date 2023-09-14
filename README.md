Cookie clicker discord bot that save progress of user and display a leaderboard

Steps:

- If you add new commands to the bot

```bash
npm run commands:reload
pnpm run commands:reload
```

- To start the bot

1. Launch PostgreSQL DB

a. With docker compose

```bash
docker compose up -d
```

b. As you find a way to host on your machine

2. Launch the bot

```bash
npm start
pnpm start
```

Environments variables:

You can edit information about the database and about your bot on the discord website, copy the ```js.env.example``` file to ```js.env```

Basic packages:

- 3 commands (cookiecheck, price, setup)