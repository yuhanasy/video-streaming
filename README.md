# Video Streaming

A Full Stack application with features:

- Custom Canvas Video Player
- Backend with `/video` endpoint that serve Partial Content
- Local (2 tabs) peer connection video chat with using webRTC

## How to Run Locally

### Server

- `cd /server`
- `yarn install`
- `yarn start:dev`

### Web

- `cd /web`
- `yarn install`
- add `VITE_API_URL` to `.env` file
- `yarn dev`
