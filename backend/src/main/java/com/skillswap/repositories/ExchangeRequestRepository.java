package com.skillswap.repositories;

import com.skillswap.models.ExchangeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExchangeRequestRepository extends JpaRepository<ExchangeRequest, Long> {
    List<ExchangeRequest> findByReceiverId(Long receiverId);
    List<ExchangeRequest> findByRequesterId(Long requesterId);
}
