package com.demo.demo.models;

import lombok.Data;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Entity
@Data
@Table(name = "permission")
public class Permission {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

        private Date startdate;
        private Date enddate;
        private String description;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private EIsActive is_active = EIsActive.WAIT;

        private long daysBetweenDates;

        private LocalDateTime created_at;

    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
    }


    public void calculateDaysBetweenDates() {
        this.daysBetweenDates = ChronoUnit.DAYS.between(startdate.toInstant(), enddate.toInstant()) + 1;
        }


    // Constructors
        public Permission() {
        }

        public Permission(Date startdate, Date enddate, String description, User user) {
            this.startdate = startdate;
            this.enddate = enddate;
            this.description = description;
            this.user = user;
            this.is_active = EIsActive.WAIT;

        }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getStartdate() {
        return startdate;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }

    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EIsActive getIs_active() {
        return is_active;
    }

    public void setIs_active(EIsActive is_active) {
        this.is_active = is_active;
    }
}
