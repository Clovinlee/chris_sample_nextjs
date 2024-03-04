FROM node:20.11

RUN mkdir -p /chris_sample_nextjs

WORKDIR /chris_sample_nextjs

# Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN git clone https://github.com/Clovinlee/chris_sample_nextjs.git .

COPY .env .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]