package service

import (
	"github.com/vortex2jm/go-payment-gateway/internal/domain"
	"github.com/vortex2jm/go-payment-gateway/internal/dto"
)

type AccountService struct {
	accountRepository domain.AccountRepository
}

func NewAccountService(repository domain.AccountRepository) *AccountService {
	return &AccountService{
		accountRepository: repository,
	}
}

func (s *AccountService) CreateAccount(input dto.CreateAccountInput) (*dto.AccountOutput, error) {
	account := dto.ToAccount(input)

	existingAccount, err := s.accountRepository.FindByAPIKey(account.APIKey)

	// If the account is not found, it means it's a new account
	if err != nil && err != domain.ErrAccountNotFound {
		return nil, err
	}

	// Check if the account already exists
	if existingAccount != nil {
		return nil, domain.ErrDuplicatedAPIKey
	}

	err = s.accountRepository.Save(account)
	if err != nil {
		return nil, err
	}

	output := dto.FromAccount(account)
	return &output, nil
}

func (s *AccountService) UpdateBalance(apiKey string, amount float64) (*dto.AccountOutput, error) {
	account, err := s.accountRepository.FindByAPIKey(apiKey)
	if err != nil {
		return nil, err
	}
	account.AddBalance(amount)
	err = s.accountRepository.UpdateBalance(account)
	if err != nil {
		return nil, err
	}
	output := dto.FromAccount(account)
	return &output, nil
}

func (s *AccountService) FindByAPIKey(apiKey string) (*dto.AccountOutput, error) {
	account, err := s.accountRepository.FindByAPIKey(apiKey)
	if err != nil {
		return nil, err
	}
	output := dto.FromAccount(account)
	return &output, nil
}

func (s *AccountService) FindByID(id string) (*dto.AccountOutput, error) {
	account, err := s.accountRepository.FindByID(id)
	if err != nil {
		return nil, err
	}
	output := dto.FromAccount(account)
	return &output, nil
}
