package com.Project.Backend.Controller;

import com.Project.Backend.DTO.TransactionDTO;
import com.Project.Backend.Entity.TransactionsEntity;
import com.Project.Backend.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    
    @PostMapping("/createTransaction")
    public ResponseEntity<TransactionDTO> createTransaction(@RequestBody TransactionDTO transactionDTO) {
        TransactionDTO createdTransaction = transactionService.create(transactionDTO);
        return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
    }

   
    @GetMapping("/getAllTransactions")
    public ResponseEntity<List<TransactionDTO>> getAllTransactions() {
        List<TransactionDTO> transactions = transactionService.getAll();
        return ResponseEntity.ok(transactions);
    }

   
    @GetMapping("/getTransactionById/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable int id) {
        try {
            TransactionDTO transaction = transactionService.getById(id);
            return ResponseEntity.ok(transaction);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

   
    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(@PathVariable int id, @RequestBody TransactionDTO transactionDTO) {
        try {
            // Make sure the path ID and the DTO ID match
            transactionDTO.setTransactionId(id);
            TransactionDTO updatedTransaction = transactionService.update(transactionDTO);
            return ResponseEntity.ok(updatedTransaction);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

   
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable int id) {
        try {
            transactionService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
   
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<TransactionDTO>> getTransactionsByEventId(@PathVariable int eventId) {
        List<TransactionDTO> transactions = transactionService.getByEventId(eventId);
        return ResponseEntity.ok(transactions);
    }
    
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<TransactionDTO>> getTransactionsByStatus(@PathVariable String status) {
        try {
            TransactionsEntity.Status transactionStatus = TransactionsEntity.Status.valueOf(status.toUpperCase());
            List<TransactionDTO> transactions = transactionService.getByStatus(transactionStatus);
            return ResponseEntity.ok(transactions);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
