package repository

import (
	"database/sql"

	"github.com/vortex2jm/go-payment-gateway/internal/domain"
)

type AccountRepository struct {
	db *sql.DB
}

func NewAccountRepository(db *sql.DB) *AccountRepository {
	return &AccountRepository{db: db}
}

func (r *AccountRepository) Save(account *domain.Account) error {
	stmt, err := r.db.Prepare(`
		INSERT INTO accounts (id, name, email, api_ke, balance, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(
		account.ID,
		account.Name,
		account.Email,
		account.APIKey,
		account.Balance,
		account.CreatedAt,
		account.UpdatedAt,
	)
	if err != nil {
		return err
	}
	return nil
}
