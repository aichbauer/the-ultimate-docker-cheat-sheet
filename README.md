<p align="center">
  <a href="https://devopscycle.com">
    <img target="_blank" height="100" src="http://devopscycle.com/wp-content/uploads/sites/4/2023/10/DevOps-Cycle-Logo-Long.png" />
  </a>
</p>

# The Ultimate Docker Cheat Sheet

> Learn Docker

The content of this repository can guide you to learn to use Docker. Here is the accompanying blog article: [The Ultimate Docker Cheat Sheet](https://devopscycle.com/blog/the-ultimate-docker-cheat-sheet) with the [PDF](https://devopscycle.com/wp-content/uploads/sites/4/2023/11/the-ultimate-docker-cheat-sheet.pdf) or an [image](https://devopscycle.com/wp-content/uploads/sites/4/2023/11/the-ultimate-docker-cheat-sheet-3.png) to the Docker Cheat Sheet. This repository is intended for corporate trainings, university courses and all people (mainly developers and system administrators, but also QA, security experts) that are interested into learning DevOps and especially in automating their processes and tasks to improve the iteration speed, the quality of their work output, and the overall transparancy in their company.

## Why?

It is hard getting started with the technical implementation of DevOps tools. Sharing Knowledge is an important part in DevOps and this is why this repository exists. This repository should give you some guidance on how you can start. This is by no means a silver bullet and also never finished. Another important part is continuous imporvement. You could use this repository as entrypoint for an internal hackathon at your company or your university. Feel free to share your results and learnings as a pull request to this repository.

Before you start with automating the product lifecycle and implementation of DevOps tools, you should have the correct foundation.

Start with the culture and the mindset.

You get a slighty different definition for DevOps when you look at different websites, but the intersection is always culture or the cultural philosophy. So get the key principles straight, then you will be able to profit from the technical tools as well:

* Colloboration & Communication
* Continuous Improvement
* Automation of the Product Lifecycle
* Customer Centric Action & Short Feedback Loops

Here are some good resources to get started with colloboration, communication and continuous imporvment:

* [https://dora.dev/devops-capabilities/cultural/generative-organizational-culture/](https://dora.dev/devops-capabilities/cultural/generative-organizational-culture/)
* [https://dora.dev/devops-capabilities/cultural/learning-culture/](https://dora.dev/devops-capabilities/cultural/learning-culture/)

## Prerequistits

* [Docker](https://docs.docker.com/)
* [Node.js](https://nodejs.org/)

## Apps

In this section you will get an overview of the applications in this repository.

### Client

The client application consits of a HTML and a JS file. The app makes a HTTP Get request to the server application to get all messages and displays them in an unordered list. The App has also an button, which you can click to make a HTTP POST request to add a new message on the server. The server responds with all messages and the client replaces the unordered list items with the new ones. The client is located at `./src/client`.

## Development

In this section you will get an overview of how you can start the client in development.

### Start

```sh
# start development
# you need to cancel and restart this cmd
# if you want to see changes that you make to the client
$ npm run start:client
```

## Production

In this section you will get an overview of how you can start the client in production.

### Build

```sh
# we use Docker to build the images from the Dockerfile.client
# make sure you are in the directory where the Dockerfile.client is located
$ docker build --file Dockerfile.client --tag examplename/examplerepository-client:0.1.0 .
```

### Start

```sh
# we can now run the image and publish the container port 80 to the host machine port 80
$ docker run --rm --publish 80:80 examplename/examplerepository-client:0.1.0
```

### Server

The server consists of a single JS file. It hosts a simple Fastify app with two routes `GET /` and `POST /`.
The GET route will try to load a json file if it exists and reponds with the JSON. the POST route will create a json file if it does not exists and add a new message to the file. The server app is located in `./src/server` directory.

The json file is located in `./src/server/data` and is called `messages.json`.

The messages JSON looks like:

```json
{
  "messages": [
    {
      "name": "Hello World"
    }
  ]
}
```

## Development

In this section you will get an overview of how you can start the server in development.

### Start

```sh
# start development
# you need to cancel and restart this cmd
# if you want to see changes that you make to the server
$ npm run start:server
```

## Production

In this section you will get an overview of how you can start the server in production.

### Build

```sh
# we use Docker to build the images from the Dockerfile.client
# make sure you are in the directory where the Dockerfile is located
$ docker build --file Dockerfile --tag examplename/examplerepository-server:0.1.0 .
```

### Start

```sh
# we can now run the image and publish the container port 3000 to the host machine port 3000
# we also persist the messages.json throughout container starts in a volume called server-volume
$ docker run --rm --volume server-volume:/app/build/data --publish 3000:3000 examplename/examplerepository-server:0.1.0
```

## LICENSE

MIT @ Lukas Aichbauer
