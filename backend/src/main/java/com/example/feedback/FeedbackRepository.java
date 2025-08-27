package com.example.feedback;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    default List<Feedback> findAllByNewest() {
        return findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
}
