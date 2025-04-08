## Payment Gateway

```bash
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
```
```bash
migrate -path db/migrations -database "postgresql://postgres:postgres@localhost:5432/gateway?sslmode=disable" up
```
