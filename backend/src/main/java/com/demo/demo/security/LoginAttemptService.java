package com.demo.demo.security;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptService {
    private static final int MAX_ATTEMPTS = 5;
    private static final long LOCK_TIME_DURATION = 10;
    private static final java.time.temporal.ChronoUnit LOCK_TIME_UNIT = java.time.temporal.ChronoUnit.MINUTES;

    private final Map<String, Integer> attemptsCache = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> lockoutCache = new ConcurrentHashMap<>();

    public void loginFailed(String key) {
        attemptsCache.compute(key, (k, v) -> v == null ? 1 : v + 1);

        if (attemptsCache.getOrDefault(key, 0) >= MAX_ATTEMPTS) {
            lockoutCache.put(key, LocalDateTime.now().plus(LOCK_TIME_DURATION, LOCK_TIME_UNIT));
        }
    }

    public void loginSucceeded(String key) {
        attemptsCache.remove(key);
        lockoutCache.remove(key);
    }

    public boolean isBlocked(String key) {
        LocalDateTime lockedUntil = lockoutCache.get(key);
        if (lockedUntil == null) {
            return false;
        }

        if (LocalDateTime.now().isAfter(lockedUntil)) {
            lockoutCache.remove(key);
            attemptsCache.remove(key);
            return false;
        }

        return true;
    }

    public int getRemainingAttempts(String key) {
        return Math.max(0, MAX_ATTEMPTS - attemptsCache.getOrDefault(key, 0));
    }

    public LocalDateTime getLockoutTime(String key) {
        return lockoutCache.get(key);
    }
}