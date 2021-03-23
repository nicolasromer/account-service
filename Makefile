start:
	docker-compose up -d

stop:
	docker-compose down

build:
	cd ./e2e && npm install


test:
	node ./e2e/payments.e2e.js
	node ./services/accounts/repository.test.js
	node ./services/accounts/Account.test.js