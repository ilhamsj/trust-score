HQ := ~/github/trust-score

up:
	cd $(HQ)/workspace/mongodb && docker compose up -d
	cd $(HQ)/workspace/clickhouse && docker compose up -d
	cd $(HQ)/workspace/mailpit && docker compose up -d
	cd $(HQ) && docker compose up -d