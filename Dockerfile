
# Stage 1: Build Stage
FROM node:20-slim AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependência e instalar
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar o restante do código-fonte
COPY . .

# Construir a aplicação
RUN pnpm build

# Stage 2: Production Stage
FROM node:20-slim AS production

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar dependências de produção
COPY --from=builder /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml ./

# Copiar os artefatos de build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY next.config.ts ./

# Expor a porta
EXPOSE 3001

# Comando para iniciar o serviço
CMD ["pnpm", "start"]
