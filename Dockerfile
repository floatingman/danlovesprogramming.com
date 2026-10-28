FROM node:22.22-alpine3.24 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# GITHUB_TOKEN (build secret) enables pinned-repo fetches at build time; absent it,
# the build falls back to star-sorted repos.
RUN --mount=type=secret,id=github_token \
    GITHUB_TOKEN="$(cat /run/secrets/github_token 2>/dev/null || true)" npm run build

FROM nginxinc/nginx-unprivileged:1.31.7-alpine3.24
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
