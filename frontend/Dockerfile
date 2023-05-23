FROM node:18.8.0-alpine3.16
RUN addgroup app && adduser -S -G app app
RUN mkdir /app && chown -R app:app /app
USER app
WORKDIR /app
COPY --chown=app:app package*.json ./
RUN npm install
COPY --chown=app:app . .
EXPOSE 3000
CMD ["npm","run","start"]
