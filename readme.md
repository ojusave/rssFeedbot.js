# RSS Feed to Zoom Chat Bot

The RSS Feed to Zoom Chat Bot is a Node.js application that uses the Zoom Teams Chat App API to deliver RSS feed updates directly to your Zoom chat channels or users. It leverages the rss-parser library to fetch and parse RSS feeds, and the node-cron library to schedule periodic fetches at a configurable interval (default: every 30 minutes).

When new items are available in the specified RSS feed, the bot constructs chat messages containing the item title and link, and sends them to the designated Zoom chat channel or user using the Zoom Chat API. This allows teams or individuals to stay up-to-date with the latest content from their favorite RSS sources without leaving the Zoom chat environment.

The bot is highly configurable, allowing you to specify the RSS feed URL, Zoom chat channel or user to receive the updates, and the necessary Zoom API credentials through environment variables. It also includes an Express server with a simple health check endpoint and an authorization endpoint for configuring the Zoom chatbot integration.

## Prerequisites

- Node.js (v12 or later)
- A Zoom account with a chatbot enabled

## Setup

1. Clone the repository:
   
```
git clone https://github.com/your-repo/rss-feed-zoom-bot.git
```

2. Install dependencies:
```
cd rss-feed-zoom-bot && npm install
```

3. Create a `.env` file in the project root directory and add the following environment variables:
```
PORT=4000  
  
RSS_FEED_URL=https://example.com/rss  
  
ZOOM_BOT_JID=your_zoom_bot_jid  
  
ZOOM_TO_JID=your_zoom_channel_or_user_jid  
  
ZOOM_USER_JID=your_zoom_user_jid  
  
ZOOM_CLIENT_ID=your_zoom_client_id  
  
ZOOM_CLIENT_SECRET=your_zoom_client_secret

```

You can obtain the Zoom credentials by following the instructions in the [Zoom Chatbot Documentation](https://developers.zoom.us/docs/team-chat-apps/create/).

4. Start the application:

```
npm start
```

The application will start running and fetch the RSS feed every 30 minutes, posting new items to the specified Zoom chat channel or user.

## Configuration
| Variable Name         | Description                                                        | Default Value |
|------------------------|--------------------------------------------------------------------|----------------|
| `PORT`                 | The port on which the Express server will listen.                  | `4000`         |
| `RSS_FEED_URL`         | The URL of the RSS feed to fetch.                                  | —              |
| `ZOOM_BOT_JID`         | The JID (Jabber ID) of your Zoom chatbot.                          | —              |
| `ZOOM_TO_JID`          | The JID of the Zoom chat channel or user to send messages to.      | —              |
| `ZOOM_USER_JID`        | Your Zoom user JID.                                                | —              |
| `ZOOM_CLIENT_ID`       | Your Zoom client ID.                                               | —              |
| `ZOOM_CLIENT_SECRET`   | Your Zoom client secret.                                           | —              |


## License

This project is licensed under the [MIT License](LICENSE).
