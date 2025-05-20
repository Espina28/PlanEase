package com.Project.Backend.Service;

import com.Project.Backend.DTO.TransactionDTO;
import com.Project.Backend.Entity.EventEntity;
import com.Project.Backend.Entity.TransactionsEntity;
import com.Project.Backend.Repository.EventRepository;
import com.Project.Backend.Repository.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;
    
    @Autowired
    private EventRepository eventRepository;

    // Create a new transaction
    public TransactionDTO create(TransactionDTO transactionDTO) {
        TransactionsEntity transaction = convertToEntity(transactionDTO);
        TransactionsEntity savedTransaction = transactionRepo.save(transaction);
        return TransactionDTO.fromEntity(savedTransaction);
    }

    // Get transaction by ID
    public TransactionDTO getById(int id) {
        TransactionsEntity transaction = transactionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction with id " + id + " not found"));
        return TransactionDTO.fromEntity(transaction);
    }

    // Get all transactions
    public List<TransactionDTO> getAll() {
        List<TransactionsEntity> transactions = transactionRepo.findAll();
        return transactions.stream()
                .map(TransactionDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Update transaction
    public TransactionDTO update(TransactionDTO transactionDTO) {
        if (transactionDTO.getTransactionId() == null) {
            throw new RuntimeException("Transaction ID cannot be null for update operation");
        }
        
        // Check if transaction exists
        transactionRepo.findById(transactionDTO.getTransactionId())
                .orElseThrow(() -> new RuntimeException("Transaction with id " + transactionDTO.getTransactionId() + " not found"));
        
        TransactionsEntity transaction = convertToEntity(transactionDTO);
        TransactionsEntity updatedTransaction = transactionRepo.save(transaction);
        return TransactionDTO.fromEntity(updatedTransaction);
    }

    // Delete transaction
    public void delete(int id) {
        if (!transactionRepo.existsById(id)) {
            throw new RuntimeException("Transaction with id " + id + " not found");
        }
        transactionRepo.deleteById(id);
    }
    
    // Get transactions by event ID
    public List<TransactionDTO> getByEventId(int eventId) {
        List<TransactionsEntity> transactions = transactionRepo.findByEventEntityId(eventId);
        return transactions.stream()
                .map(TransactionDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    // Get transactions by status
    public List<TransactionDTO> getByStatus(TransactionsEntity.Status status) {
        List<TransactionsEntity> transactions = transactionRepo.findByTransactionStatus(status);
        return transactions.stream()
                .map(TransactionDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    // Helper method to convert DTO to Entity
    private TransactionsEntity convertToEntity(TransactionDTO dto) {
        TransactionsEntity entity = new TransactionsEntity();
        
        if (dto.getTransactionId() != null) {
            entity.setTransaction_Id(dto.getTransactionId());
        }
        
        if (dto.getEventId() != null) {
            EventEntity eventEntity = eventRepository.findById(dto.getEventId())
                .orElseThrow(() -> new RuntimeException("Event with id " + dto.getEventId() + " not found"));
            entity.setEvent(eventEntity);
        }
        
        entity.setTransactionVenue(dto.getVenue());
        entity.setTransactionStatus(dto.getStatus());
        entity.setTransactionDate(dto.getDate());
        entity.setTransactionIsActive(dto.getIsActive());
        
        return entity;
    }
}
