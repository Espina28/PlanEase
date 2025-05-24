package com.Project.Backend.Controller;

import com.Project.Backend.DTO.CreateTransactionDTO;
import com.Project.Backend.DTO.GetTransactionDTO;
import com.Project.Backend.Entity.TransactionsEntity;
import com.Project.Backend.Entity.UserEntity;
import com.Project.Backend.Service.TransactionService;
import com.Project.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    @Autowired
    private UserService userService;


    @PostMapping("/createTransaction")
    public ResponseEntity<TransactionsEntity> createTransaction(@RequestBody CreateTransactionDTO createTransactionDTO) {
        TransactionsEntity createdTransaction = transactionService.create(createTransactionDTO);
        return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
    }

    @PutMapping("/validateTransaction")
    public ResponseEntity<?> validateTransaction(@RequestParam int transactionId,
                                                 @RequestParam String status) {
        TransactionsEntity transactionsEntity = transactionService.validateTransaction(transactionId, status);
        if(transactionsEntity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(transactionsEntity);
    }

    @GetMapping("/getAllPendingTransactions")
    public ResponseEntity<?> getAllTransactions() {
        List<GetTransactionDTO> transactions = transactionService.getAllPendingTransactions();
        if(transactions.isEmpty()){
            return ResponseEntity.status(404).body(Map.of("error", "No Transactions Found"));
        }
        return ResponseEntity.ok(transactions);
    }

   
    @GetMapping("/getTransactionById/{id}")
    public ResponseEntity<TransactionsEntity> getTransactionById(@PathVariable int id) {
        try {
            TransactionsEntity transaction = transactionService.getById(id);
            return ResponseEntity.ok(transaction);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getAllTransactions")
    public ResponseEntity<?> getAllTranscations() {
        List<GetTransactionDTO> transactions = transactionService.getAllTransactions();
        if (transactions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(transactions);
    }

   
//    @PutMapping("/{id}")
//    public ResponseEntity<TransactionsEntity> updateTransaction(@PathVariable int id, @RequestBody CreateTransactionDTO transactionDTO) {
//        try {
//            // Make sure the path ID and the DTO ID match
//            transactionDTO.setTransaction_Id(id);
//            CreateTransactionDTO updatedTransaction = transactionService.update(transactionDTO);
//            return ResponseEntity.ok(updatedTransaction);
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }

   
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
    public ResponseEntity<List<TransactionsEntity>> getTransactionsByEventId(@PathVariable int eventId) {
        List<TransactionsEntity> transactions = transactionService.getByEventId(eventId);
        return ResponseEntity.ok(transactions);
    }
    
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<TransactionsEntity>> getTransactionsByStatus(@PathVariable String status) {
        try {
            List<TransactionsEntity> transactions = transactionService.getByStatus(status.toUpperCase());
            return ResponseEntity.ok(transactions);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
