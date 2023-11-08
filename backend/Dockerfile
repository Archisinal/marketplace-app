FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

RUN chmod +x start.sh

CMD [ "./start.sh" ]