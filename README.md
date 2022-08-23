# Merlin UI

## Local Development

Node.js 12.22.0 or later is required

Install dependencies:

```shell
$ npm install
```

(Optional) Run the development server:

```shell
$ npm run dev
```

Open [http://localhost:3000/merlin](http://localhost:3000/merlin) with your browser. Next.js features Fast Refresh, components will be automatically re-rendered when a file is updated.

## Local Deployment

Build the container:

```shell
$ docker build -t merlin-ui .
```

Run the container:

```shell
$ docker run -p 3000:3000 merlin-ui
```

Open [http://localhost:3000/merlin](http://localhost:3000/merlin)

## Kubernetes Deployment
The instructions below assume a locally running `Kubernetes` cluster (like k3s) running its own `Docker` registry. 
Instructions for other configurations may vary.

Tag the container:

```shell
$ docker tag merlin-ui registry.localdev.me/merlin-ui:latest 
```

Push it to the local registry:

```shell
$ docker push registry.localdev.me/merlin-ui:latest
```

Build the `Kubernetes` artifacts:
```shell
$ kubectl apply -f src/kubernetes/merlin-ui.yaml
```

In a web browser, access `merlin-UI` at `http://merlin.localdev.me/merlin`.

## Dependencies and Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [Material UI Documentation](https://mui.com/material-ui/getting-started/overview/)
