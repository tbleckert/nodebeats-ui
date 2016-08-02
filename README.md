# Nodebeats UI

This is a simple demo to give you an example of how to work with the nodebeats server. I am using React here but you can of course break this apart and build your own UI. The important bits are the API and websockets interaction.

## Get started
1. Download this source (or fork it)
2. Copy config.example.json to config.json and edit.
3. Add your services to config.json
4. `node server.js` or `pm2 start ecosystem.json` if you're using pm2

## Development
1. `npm install`
2. `gulp watch`

## Production
1. Edit assetVersion in config.json and run `gulp production`
2. Set NODE_ENV to production or run pm2 with `--env production`
