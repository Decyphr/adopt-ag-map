# Adopt Ag: Mapbox GeoJSON

### Get Started with Local Development

#### 1. Clone the repository
```bash
git clone https://github.com/Decyphr/adopt-ag-map.git
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Start the development server
```bash
npm run dev
```
After running the `npm run dev` command, you should be able to view the development build at http://localhost:8080

### Running production build locally with Docker
#### 1. Run the production build
```bash
npm run build
```

#### 2. Start the docker container
```bash
docker-compose up -d
```

After running the `docker-compose up` command, you should be able to view the production build at http://localhost:8080


## What technologies are being used?
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

*If you are not familiar with any of the different technologies used in this project, please refer to the respective docs.*