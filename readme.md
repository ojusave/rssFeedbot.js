# RSS Feed to Zoom Chat Bot

**RSS Feed to Zoom Chat Bot** is a Node.js application that delivers RSS feed updates to Zoom chat channels or users using the **Zoom Teams Chat App API**.

It uses the [`rss-parser`](https://www.npmjs.com/package/rss-parser) library to parse RSS feeds and [`node-cron`](https://www.npmjs.com/package/node-cron) to schedule periodic fetches (default: every 30 minutes). The bot sends new feed items to Zoom using the Zoom Chat API.

## Features

* Delivers RSS feed updates to Zoom chat channels or users
* Configurable fetch interval (default: 30 minutes)
* Express server with health check and authorization endpoints

---

## Prerequisites

* [Node.js](https://nodejs.org/) (v12 or later)
* A Zoom account with a chatbot enabled

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/rss-feed-zoom-bot.git
cd rss-feed-zoom-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the following:

```env
PORT=4000

RSS_FEED_URL=https://example.com/rss

ZOOM_BOT_JID=your_zoom_bot_jid
ZOOM_TO_JID=your_zoom_channel_or_user_jid
ZOOM_USER_JID=your_zoom_user_jid

ZOOM_CLIENT_ID=your_zoom_client_id
ZOOM_CLIENT_SECRET=your_zoom_client_secret
```

> 💡 You can obtain these credentials from the [Zoom Chatbot documentation](https://developers.zoom.us/docs/team-chat-apps/create/).

---

## Running the bot

Start the application:

```bash
npm start
```

The bot will run on the specified port and fetch the RSS feed every 30 minutes, sending new items to the configured Zoom chat recipient.

---

## Environment variables

| Variable             | Description                                 | Default |
| -------------------- | ------------------------------------------- | ------- |
| `PORT`               | Port for the Express server                 | `4000`  |
| `RSS_FEED_URL`       | URL of the RSS feed to monitor              | —       |
| `ZOOM_BOT_JID`       | JID (Jabber ID) of your Zoom chatbot        | —       |
| `ZOOM_TO_JID`        | JID of the target Zoom chat channel or user | —       |
| `ZOOM_USER_JID`      | Your Zoom user JID                          | —       |
| `ZOOM_CLIENT_ID`     | Client ID from your Zoom chatbot app        | —       |
| `ZOOM_CLIENT_SECRET` | Client secret from your Zoom chatbot app    | —       |

---

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

