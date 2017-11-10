# Easter Seals Cloud Ops Dev Example

An example application to showcase CI and deployment procedures.

## Prerequisites

- Node/NPM
- [Yarn](https://yarnpkg.com/en/docs/install), optional

## Setup

> yarn

## Starting

> yarn start

Open `localhost:3000` in a browser to view the app.

## Docker

### Creating an Image

> docker build -t cloudops-dev .

Run `docker build --help` for more information on command.

### Testing Image

Starting a container:

> docker container run --detach --publish 8080:3000 --rm --name webhost cloudops-dev

Run `docker container run --help` for more information on command.

Stopping the container:

> docker container stop webhost

Run `docker container stop --help` for more information on command.
