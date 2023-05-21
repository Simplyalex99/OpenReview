FROM node:18.8.0-alpine3.16
RUN addgroup app && adduser -S -G app app
RUN mkdir /app && chown -R app:app /app
USER app
WORKDIR /app
COPY --chown=app:app package*.json ./
ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}
RUN npm install
COPY --chown=app:app . .
EXPOSE 3000
CMD ["npm","run","start"]
