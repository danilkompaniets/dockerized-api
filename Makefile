DEV_COMPOSE_FILE=docker-compose.dev.yml
PROD_COMPOSE_FILE=docker-compose.prod.yml

.PHONY: build-dev
build-dev:
	docker-compose -f docker-compose.yml -f $(DEV_COMPOSE_FILE) up -d --build

.PHONY: build-prod
build-prod:
	docker-compose -f docker-compose.yml -f $(PROD_COMPOSE_FILE) up -d --build