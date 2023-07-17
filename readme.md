# Sites Monitoring
This project is a service for monitoring of websites pages. Receive notifications when yours sites change the response status code. 

Until now this notifications are sended by e-mail, but in future we make a optional integration with Telegram too.

## Setup
Install dependencies
```bash
npm install | yarn
```

Copy and rename the file .env.example to .env and change the configurations


### Migrations

Run the following command to run startup migrations and seeders.

```js
node ace migration:run
```

```js
node ace db:seed
```

### Running

Start the app locally

```js
npm run dev | yarn dev
```

### Accessing

On `http://127.0.0.1:3333/admin/login` enter this authentication access for main user:

User: admin@mail.com
Password: 123123
