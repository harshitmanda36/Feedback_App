package com.example.feedback;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@Validated
@CrossOrigin(origins = "${app.cors.allowedOrigin:http://localhost:5173}")
public class FeedbackController {

    private final FeedbackRepository repo;

    public FeedbackController(FeedbackRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Feedback> list() {
        return repo.findAllByNewest();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Feedback create(@Valid @RequestBody Feedback feedback) {
        return repo.save(feedback);
    }
}
