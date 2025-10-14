require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const Parser = require('rss-parser');
const cron = require('node-cron');

const app = express();
const port = process.env.PORT || 4000;
const parser = new Parser();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/authorize', (req, res) => {
  res.redirect('https://zoom.us/launch/chat?jid=robot_' + process.env.ZOOM_BOT_JID);
});

async function fetchRssFeed(url) {
  try {
    const feed = await parser.parseURL(url);
    return feed.items;
  } catch (error) {
    throw new Error('Failed to fetch RSS feed');
  }
}

async function postRssFeedToZoom() {
  const rssFeedUrl = process.env.RSS_FEED_URL;
 
  try {
    const feedItems = await fetchRssFeed(rssFeedUrl);
    const zoomToken = await getZoomToken();

    if (feedItems) {
      for (const item of feedItems) {
        const message = `${item.title}\n${item.link}`;
        await sendChat(zoomToken, message);
      }
    }
  } catch (error) {
    console.log('Error posting RSS feed to Zoom:', error);
  }
}

async function getZoomToken() {
  try {
    const response = await axios.post('https://zoom.us/oauth/token?grant_type=client_credentials', {}, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.ZOOM_CLIENT_ID + ':' + process.env.ZOOM_CLIENT_SECRET).toString('base64')
      }
    });

    console.log('Successfully received chatbot_token from Zoom.');
    return response.data.access_token;
  } catch (error) {
    console.log('Error getting chatbot_token from Zoom.', error);
    throw new Error('Failed to get Zoom token');
  }
}

async function sendChat(chatbotToken, message) {
  try {
    await axios.post('https://api.zoom.us/v2/im/chat/messages', {
      'robot_jid': process.env.ZOOM_BOT_JID,
      'to_jid': process.env.ZOOM_TO_JID,
      'user_jid': process.env.ZOOM_USER_JID,
      'content': {
        'head': {
          'text': 'RSS Feed Update'
        },
        'body': [{
          'type': 'message',
          'text': message
        }]
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + chatbotToken
      }
    });

    console.log('Successfully sent chat.');
  } catch (error) {
    console.log('Error sending chat.', error);
  }
}

// Cron job to fetch and post RSS feed every 30 minutes
cron.schedule('*/30 * * * *', () => {
  console.log('Fetching and posting RSS feed...');
  postRssFeedToZoom();
});

// Run initially
postRssFeedToZoom();

app.listen(port, () => console.log(`Zoom for Team Chat listening on port ${port}!`));
