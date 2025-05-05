# Processo seletivo para Infinity

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## o que é utilizado no projeto

no projeto é utilizado tanto o prisma para criação de tabelas quanto o auth nativo do supabase para autenticação, além de cookies para guardar a autenticação e usá-la sem o uso de tokens, porém é disponibilizado os tokens mesmo assim


## Instalar Depedências do Projeto

```bash
$ yarn install
```

# Iniciando o Projeto
```bash
# criar tabelas no banco de dados
$ yarn run prisma:migrate

# iniciar backend em ambiente de desenvolvimento 
$ yarn run start:dev

# roda o lint e prettier para verificação da aplicação
$ yarn format
$ yarn lint 


```

## Rodar o Projeto

```bash
# desenvolvimento
$ yarn run start

# modo watch
$ yarn run start:dev

# para produção
$ yarn run start:prod
```

# Rotas da Aplicação

## Rota para Documentação
```typescript
GET /api-docs
```

## Rotas de autenticação

```typescript
POST /register 
body : {
 "email" : "exemple@gmail.com",
 "password" : "123456"
}

response : {
	"message": "success on register",
	"status": 201,
	"id": "d92a5afb-13e7-427a-bbb1-870d90ae6b3f",
	"email": "exemple@gmail.com",
	"username": "username",
	"full_name": "Jonh Doe",
	"confirmationSentAt": "2030-02-05T14:57:52.186718142Z"
}
```

```typescript

GET /Login
body : {
  email : "exemple@gmail.com",
  password : "123456"
}

response : {
	"message": "success on login",
	"status": 200,
	"id": "d92a5afb-13e7-427a-bbb1-870d90ae6b3f",
	"email": "exemple@gmail.com",
	"access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6IkdYL2hEMCs5Nzc3U3FaTGwiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3JzZWVwdmxpdGNneGJvZGVncm50LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkOTJhNWFmYi0xM2U3LTQyN2EtYmJiMS04NzBkOTBhZTZiM2YiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ2NDYwNzIyLCJpYXQiOjE3NDY0NTcxMjIsImVtYWlsIjoicm9kcmlnb2NhcnZhbGhvZGV2cHJvQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJyb2RyaWdvY2FydmFsaG9kZXZwcm9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiZDkyYTVhZmItMTNlNy00MjdhLWJiYjEtODcwZDkwYWU2YjNmIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDY0NTcxMjJ9XSwic2Vzc2lvbl9pZCI6IjQ4ZDQwMTk3LWJkODMtNDRjNC05N2RlLWU4ZmQ3MDcwZWRkOSIsImlzX2Fub255bW91cyI6ZmFsc2V9.CwzQcwAoLa1UI0PLPxWPaI5q2VLn5o-fFNuNslVgVA8"
}

```

```typescript

GET /me // authenticated

{
	"message": "success on get user",
	"status": 200,
	"user": {
		"id": "87dd95b8-9b19-4e8d-ab86-58f9621100b5",
		"aud": "authenticated",
		"role": "authenticated",
		"email": "exemple@gmail.com",
		"email_confirmed_at": "2025-05-05T14:54:50.77721Z",
		"phone": "",
		"confirmation_sent_at": "2025-05-05T14:54:30.690231Z",
		"confirmed_at": "2025-05-05T14:54:50.77721Z",
		"last_sign_in_at": "2025-05-05T14:56:10.635839Z",
		"app_metadata": {
			"provider": "email",
			"providers": [
				"email"
			]
		},
		"user_metadata": {
			"email": "exemple@gmail.com",
			"email_verified": true,
			"phone_verified": false,
			"sub": "87dd95b8-9b19-4e8d-ab86-58f9621100b5"
		},
		"identities": [
			{
				"identity_id": "a3ede16d-83ce-47c4-b9b5-c118dbee8243",
				"id": "87dd95b8-9b19-4e8d-ab86-58f9621100b5",
				"user_id": "87dd95b8-9b19-4e8d-ab86-58f9621100b5",
				"identity_data": {
					"email": "exemple@gmail.com",
					"email_verified": true,
					"phone_verified": false,
					"sub": "87dd95b8-9b19-4e8d-ab86-58f9621100b5"
				},
				"provider": "email",
				"last_sign_in_at": "2025-05-05T14:54:30.687806Z",
				"created_at": "2025-05-05T14:54:30.687858Z",
				"updated_at": "2025-05-05T14:54:30.687858Z",
				"email": "exemple@gmail.com"
			}
		],
		"created_at": "2025-05-05T14:54:30.685539Z",
		"updated_at": "2025-05-05T14:56:10.638484Z",
		"is_anonymous": false
	}
}
```

## Rotas do profile do usuário

```typescript
GET /users/:username 

param : string //exempleusername

{
	"message": "success on get user",
	"status": 200,
	"user": {
		"id": "87dd95b8-9b19-4e8d-ab86-58f9621100b5",
		"aud": "authenticated",
		"role": "authenticated",
		"email": "exemple@gmail.com",
		"email_confirmed_at": "2025-05-05T14:54:50.77721Z",
		"phone": "",
		"confirmation_sent_at": "2025-05-05T14:54:30.690231Z",
		"confirmed_at": "2025-05-05T14:54:50.77721Z",
		"last_sign_in_at": "2025-05-05T14:56:10.635839Z",
		"app_metadata": {
			"provider": "email",
			"providers": [
				"email"
			]
		},
		"user_metadata": {
			"email": "exemple@gmail.com",
			"email_verified": true,
			"phone_verified": false,
			"sub": "87dd95b8-9b19-4e8d-ab86-58f9621100b5"
		},
		"identities": [
			{
				"identity_id": "a3ede16d-83ce-47c4-b9b5-c118dbee8243",
				"id": "87dd95b8-9b19-4e8d-ab86-58f9621100b5",
				"user_id": "87dd95b8-9b19-4e8d-ab86-58f9621100b5",
				"identity_data": {
					"email": "exemple@gmail.com",
					"email_verified": true,
					"phone_verified": false,
					"sub": "87dd95b8-9b19-4e8d-ab86-58f9621100b5"
				},
				"provider": "email",
				"last_sign_in_at": "2025-05-05T14:54:30.687806Z",
				"created_at": "2025-05-05T14:54:30.687858Z",
				"updated_at": "2025-05-05T14:54:30.687858Z",
				"email": "exemple@gmail.com"
			}
		],
		"created_at": "2025-05-05T14:54:30.685539Z",
		"updated_at": "2025-05-05T14:56:10.638484Z",
		"is_anonymous": false
	}
}
```

```typescript
GET /users/follow/:username // authenticated 

param : string //exempleusername

{
	"message": "profile followed",
	"status": 200
}


```

```typescript
GET /users/unfollow/:username // authenticated 

param : string //exempleusername

{
	"message": "profile unfollowed",
	"status": 200
}


```