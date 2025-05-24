package com.Project.Backend.Service;

import com.Project.Backend.DTO.CreateTransactionDTO;
import com.Project.Backend.DTO.GetTransactionDTO;
import com.Project.Backend.Entity.*;
import com.Project.Backend.Repository.EventRepository;
import com.Project.Backend.Repository.TransactionRepo;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;
    
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private SubcontractorService subcontractorService;
    @Autowired
    private PackagesService packagesService;
    @Autowired
    private  EventServiceService eventServiceService;
    @Autowired
    private EventService eventService;
    @Autowired
    UserService userService;


    // Create a new transaction
    public TransactionsEntity create(CreateTransactionDTO createTransactionDTO) {
        try{
            TransactionsEntity transactions = new TransactionsEntity();
            transactions.setTransactionVenue(createTransactionDTO.getVenue());
            transactions.setTransactionStatus(TransactionsEntity.Status.PENDING);
            transactions.setTransactionDate(createTransactionDTO.getEventDate());
            transactions.setTransactionNote(createTransactionDTO.getUserNote());
            transactions.setTransactionIsActive(true);
            transactions.setTransactionisApprove(false);
            transactions = transactionRepo.save(transactions);

            if(createTransactionDTO.getPackageName() != null){
                transactions.setPackages(packagesService.findByName(createTransactionDTO.getPackageName()));
            }

            transactions.setEvent(eventService.getEventByEventName(createTransactionDTO.getEventName()));
            transactions.setUser(userService.getUserByEmail(createTransactionDTO.getUserEmail()));
            transactionRepo.save(transactions);
            assignedEventService(createTransactionDTO.getServices(), transactions);

            return transactions;
        }catch(Exception e){
            throw new RuntimeException("Failed to create transaction: ", e);
        }
    }

    //connecting the transactions and the chosen services of subcontractors in event_service table;
    public List<SubcontractorEntity> assignedEventService(List<Integer> sucontractorsId, TransactionsEntity transactions){
        List<SubcontractorEntity> subcontractors = new ArrayList<>();

        for(int subcontractorid: sucontractorsId){
            SubcontractorEntity subcontractorEntity = subcontractorService.getSubcontractorById(subcontractorid);
            if(subcontractorEntity == null){
                throw new RuntimeException("Subcontractor with id " + subcontractorid + " not found");
            }
            EventServiceEntity eventServiceEntity = new EventServiceEntity();
            eventServiceEntity.setTransactionsId(transactions);
            eventServiceEntity.setSubcontractor(subcontractorEntity);
            eventServiceService.create(eventServiceEntity);
            subcontractors.add(subcontractorService.getSubcontractorById(subcontractorid));
        }
        return subcontractors;
    };

    public TransactionsEntity validateTransaction(int id, String status){
        TransactionsEntity transaction = transactionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction with id " + id + " not found"));
        switch (status){
            case "APPROVED":
                    transaction.setTransactionStatus(TransactionsEntity.Status.ONGOING);
                    transaction.setTransactionisApprove(true);
                    break;
            case "CANCELLED":
                    transaction.setTransactionStatus(TransactionsEntity.Status.CANCELLED);
                    transaction.setTransactionisApprove(false);
                    break;
            case "COMPLETED":
                    transaction.setTransactionStatus(TransactionsEntity.Status.COMPLETED);
                    break;
            default:
                    throw new RuntimeException("Invalid transaction status: " + status);
        }
        return transactionRepo.save(transaction);
    }

    // Get transaction by ID
    public TransactionsEntity getById(int id) {
        return transactionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction with id " + id + " not found"));
    }

    // Get all transactions.findAll();
    public List<GetTransactionDTO> getAllPendingTransactions() {
        List<TransactionsEntity> existingTransactions = transactionRepo.findByTransactionStatusAndIsActive(TransactionsEntity.Status.PENDING, true);
        List<GetTransactionDTO> result = new ArrayList<>();


        for(TransactionsEntity transaction : existingTransactions){
            GetTransactionDTO getTransactionDTO = new GetTransactionDTO();
            getTransactionDTO.setTransaction_Id(transaction.getTransaction_Id());
            getTransactionDTO.setUserEmail(transaction.getUser().getEmail());
            getTransactionDTO.setUserName(transaction.getUser().getFirstname() + " " + transaction.getUser().getLastname());
            getTransactionDTO.setPhoneNumber(transaction.getUser().getPhoneNumber());
            getTransactionDTO.setUserAddress(transaction.getUser().getProvince() + " " + transaction.getUser().getBarangay());
            getTransactionDTO.setEventName(transaction.getEvent().getEvent_name());
            getTransactionDTO.setTransactionVenue(transaction.getTransactionVenue());
            getTransactionDTO.setTransactionStatus(transaction.getTransactionStatus().toString());
            getTransactionDTO.setTransactionDate(transaction.getTransactionDate());
            getTransactionDTO.setTransactionNote(transaction.getTransactionNote());
            getTransactionDTO.setPayment(transaction.getPayment());
            if(transaction.getPackages() != null){
                getTransactionDTO.setPackages(transaction.getPackages().getPackageName());
            }

            if (transaction.getEventServices() != null) {
                getTransactionDTO.setSubcontractors(getSubcontractors(transaction.getEventServices()));
            }
            result.add(getTransactionDTO);
        }
        return result;
    }



    private List<Map<String, Object>>  getSubcontractors(List<EventServiceEntity> eventServices){
       return eventServices.stream()
               .map(eventService -> {
                   SubcontractorEntity subcontractor = subcontractorService.getSubcontractorById(
                           eventService.getSubcontractor().getSubcontractor_Id()
                   );

                   Map<String, Object> subcontractorDetails = new HashMap<>();
                   subcontractorDetails.put("subcontractorId", subcontractor.getSubcontractor_Id());
                   subcontractorDetails.put("subcontractorName", subcontractor.getUserId().getFirstname() + " " + subcontractor.getUserId().getLastname());
                   subcontractorDetails.put("subcontractorEmail", subcontractor.getUserId().getEmail());
                   subcontractorDetails.put("serviceName", subcontractor.getSubcontractor_serviceName());
                   subcontractorDetails.put("serviceCategory", subcontractor.getSubcontractor_serviceCategory());
                   //add the category here
                   return subcontractorDetails;
               })
               .collect(Collectors.toList());
    }

    public List<GetTransactionDTO>getAllTransactions() {
        List<TransactionsEntity> existingTransactions = transactionRepo.findAll();
        List<GetTransactionDTO> result = new ArrayList<>();


        for(TransactionsEntity transaction : existingTransactions){
            GetTransactionDTO getTransactionDTO = new GetTransactionDTO();
            getTransactionDTO.setTransaction_Id(transaction.getTransaction_Id());
            getTransactionDTO.setUserEmail(transaction.getUser().getEmail());
            getTransactionDTO.setUserName(transaction.getUser().getFirstname() + " " + transaction.getUser().getLastname());
            getTransactionDTO.setPhoneNumber(transaction.getUser().getPhoneNumber());
            getTransactionDTO.setUserAddress(transaction.getUser().getProvince() + " " + transaction.getUser().getBarangay());
            getTransactionDTO.setEventName(transaction.getEvent().getEvent_name());
            getTransactionDTO.setTransactionVenue(transaction.getTransactionVenue());
            getTransactionDTO.setTransactionStatus(transaction.getTransactionStatus().toString());
            getTransactionDTO.setTransactionDate(transaction.getTransactionDate());
            getTransactionDTO.setTransactionNote(transaction.getTransactionNote());
            getTransactionDTO.setPayment(transaction.getPayment());
            if(transaction.getPackages() != null){
                getTransactionDTO.setPackages(transaction.getPackages().getPackageName());
            }

            if (transaction.getEventServices() != null) {
                getTransactionDTO.setSubcontractors(getSubcontractors(transaction.getEventServices()));
            }
            result.add(getTransactionDTO);
        }
        return result;

    }

    // Update transaction
//    public CreateTransactionDTO update(CreateTransactionDTO transactionDTO) {
//        if (transactionDTO.getTransaction_Id() == null) {
//            throw new RuntimeException("Transaction ID cannot be null for update operation");
//        }
//
//        // Check if transaction exists
//        transactionRepo.findById(transactionDTO.getTransaction_Id())
//                .orElseThrow(() -> new RuntimeException("Transaction with id " + transactionDTO.getTransactionId() + " not found"));
//
//        TransactionsEntity transaction = convertToEntity(transactionDTO);
//        TransactionsEntity updatedTransaction = transactionRepo.save(transaction);
//        return CreateTransactionDTO.fromEntity(updatedTransaction);
//    }

    // Delete transaction
    public void delete(int id) {
        if (!transactionRepo.existsById(id)) {
            throw new RuntimeException("Transaction with id " + id + " not found");
        }
        transactionRepo.deleteById(id);
    }

    // Get transactions by event ID
    public List<TransactionsEntity> getByEventId(int eventId) {
        return transactionRepo.findByEventEntityId(eventId);
    }
    
    // Get transactions by status
    public List<TransactionsEntity> getByStatus(String status) {
        return transactionRepo.findByTransactionStatusAndIsActive(TransactionsEntity.Status.valueOf(status), true);
    }

}
