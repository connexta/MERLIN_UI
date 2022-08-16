# Merlin UI

## Local Development

Node.js 12.22.0 or later is required

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser. Next.js features Fast Refresh, components will be automatically re-rendered when a file is updated.

## Local Deployment

Build the container:

```bash
docker build -t merlin-ui .
```

Run the container:

```bash
docker run -p 3000:3000 merlin-ui
```

Open [http://localhost:3000](http://localhost:3000)

## Dependencies and Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [Material UI Documentation](https://mui.com/material-ui/getting-started/overview/)
