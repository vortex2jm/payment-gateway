package repository

import (
	"database/sql"
	"time"

	"github.com/vortex2jm/go-payment-gateway/internal/domain"
)

type AccountRepository struct {
	db *sql.DB
}

// NewAccountRepository creates a new instance of AccountRepository with the given database connection.
// Parameters:
// - db: A pointer to an sql.DB instance representing the database connection.
// Returns:
// - A pointer to an AccountRepository instance.
func NewAccountRepository(db *sql.DB) *AccountRepository {
	return &AccountRepository{db: db}
}

// Save inserts a new account record into the database.
// Parameters:
// - account: A pointer to a domain.Account instance containing the account details to be saved.
// Returns:
// - An error if the operation fails, otherwise nil.
func (r *AccountRepository) Save(account *domain.Account) error {
	stmt, err := r.db.Prepare(`
		INSERT INTO accounts (id, name, email, api_key, balance, created_at, updated_at)
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

// FindByAPIKey retrieves an account from the database using the provided API key.
// Parameters:
// - apiKey: A string representing the API key of the account to be retrieved.
// Returns:
// - A pointer to a domain.Account instance if found, or nil if not found.
// - An error if the operation fails or if the account is not found.
func (r *AccountRepository) FindByAPIKey(apiKey string) (*domain.Account, error) {
	var account domain.Account
	var createdAt, updatedAt time.Time

	err := r.db.QueryRow(`
		SELECT id, name, email, api_key, balance, created_at, updated_at
		FROM accounts 
		WHERE api_key = $1
	`, apiKey).Scan(
		&account.ID,
		&account.Name,
		&account.Email,
		&account.APIKey,
		&account.Balance,
		&createdAt,
		&updatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, domain.ErrAccountNotFound
	}
	if err != nil {
		return nil, err
	}
	account.CreatedAt = createdAt
	account.UpdatedAt = updatedAt

	return &account, nil
}

// FindByID retrieves an account from the database using the provided account ID.
// Parameters:
// - id: A string representing the ID of the account to be retrieved.
// Returns:
// - A pointer to a domain.Account instance if found, or nil if not found.
// - An error if the operation fails or if the account is not found.
func (r *AccountRepository) FindByID(id string) (*domain.Account, error) {
	var account domain.Account
	var createdAt, updatedAt time.Time
	err := r.db.QueryRow(`
		SELECT id, name, email, api_key, balance, created_at, updated_at
		FROM accounts
		WHERE id = $1
	`, id).Scan( // maps values to struct
		&account.ID,
		&account.Name,
		&account.Email,
		&account.APIKey,
		&account.Balance,
		&createdAt,
		&updatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, domain.ErrAccountNotFound
	}
	if err != nil {
		return nil, err
	}
	account.CreatedAt = createdAt
	account.UpdatedAt = updatedAt
	return &account, nil
}

// UpdateBalance updates the balance of an account in the database.
// This operation is performed within a transaction to ensure consistency.
// Parameters:
// - account: A pointer to a domain.Account instance containing the account ID and the balance to be updated.
// Returns:
// - An error if the operation fails, otherwise nil.
func (r *AccountRepository) UpdateBalance(account *domain.Account) error {
	tx, err := r.db.Begin() // Begining transaction

	if err != nil {
		return err
	}
	defer tx.Rollback() // rollbacks if transaction fails

	var currentBalance float64
	err = tx.QueryRow(`	
		SELECT balance
		FROM accounts
		WHERE id = $1
		FOR UPDATE
	`, account.ID).Scan(&currentBalance) // Query to lock row for update

	if err == sql.ErrNoRows {
		return domain.ErrAccountNotFound
	}

	if err != nil {
		return err
	}

	_, err = tx.Exec(`
		UPDATE accounts	
		SET balance = $1, updated_at = $2
		WHERE id = $3
		`, currentBalance+account.Balance, time.Now(), account.ID)
	if err != nil {
		return err
	}

	return tx.Commit() // Commit transaction
}
