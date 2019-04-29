# Easterseals Cloud Ops Dev Example

An example application to showcase CI and deployment procedures.

## Prerequisites

- Docker

## Starting

```bash
yarn start
```

Open [localhost:4400](http://localhost:4400) in a browser to view the app.

### Clean Images

Running fresh images can be useful to clean all current images.

```bash
yarn start:clean
```

## Docker

### Creating an Image

```bash
yarn docker:build
```