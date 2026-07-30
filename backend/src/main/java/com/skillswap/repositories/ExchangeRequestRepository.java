package com.skillswap.repositories;

import com.skillswap.models.ExchangeRequest;
import com.skillswap.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExchangeRequestRepository extends JpaRepository<ExchangeRequest, Long> {
    List<ExchangeRequest> findBySenderOrderByCreatedAtDesc(User sender);
    List<ExchangeRequest> findByReceiverOrderByCreatedAtDesc(User receiver);
}
