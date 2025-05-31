package org.example;

public record Customer(
        long customerId,
        String emailAddress,
        String fullName
) {
}

