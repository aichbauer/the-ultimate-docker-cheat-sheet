const fastify = require('fastify');
const cors = require('@fastify/cors');
const fs = require('fs');
const path = require('path');

const app = fastify({
  logger: true,
});
const port = 3000;
const host = '0.0.0.0';

app.register(cors);

app.get('/', () => {
  try {
    const messages = fs.readFileSync(path.join(__dirname, 'data', 'messages.json'));

    return JSON.parse(messages);
  } catch {
    return {
      messages: [
        { name: 'Hello World' },
      ],
    };
  }
});

app.post('/', () => {
  try {
    if (!fs.existsSync(path.join(__dirname, 'data'))) {
      fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
    }

    if (!fs.existsSync(path.join(__dirname, 'data', 'messages.json'))) {
      fs.writeFileSync(path.join(__dirname, 'data', 'messages.json'), JSON.stringify({
        messages: [
          { name: 'Hello World' },
        ],
      }));
    }

    const messages = fs.readFileSync(path.join(__dirname, 'data', 'messages.json'));

    const parsedMessages = JSON.parse(messages);

    parsedMessages.messages.push({
      name: 'New Message',
    });

    fs.writeFileSync(path.join(__dirname, 'data', 'messages.json'), JSON.stringify(parsedMessages));

    return parsedMessages;
  } catch (err) {
    console.error(err);
    return {
      messages: [
        { name: 'Hello World' },
      ],
    };
  }
});


const start = async () => {
  try {
    app.log.info(`Server listening on port ${port}`);
    await app.listen({
      port,
      host,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}
start()
