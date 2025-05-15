package com.Project.Backend.Repository;

import com.Project.Backend.Entity.TransactionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepo extends JpaRepository<TransactionsEntity, Integer> {
    
    // Change from findByEventEntity_Event_id to findByEventEntityId
    List<TransactionsEntity> findByEventEntityId(int eventId);
    
    // Change from findByTransaction_status to findByTransactionStatus
    List<TransactionsEntity> findByTransactionStatus(TransactionsEntity.Status status);
    
    // Change from findByTransaction_isActiveTrue to findByTransactionIsActiveTrue
    List<TransactionsEntity> findByTransactionIsActiveTrue();
}