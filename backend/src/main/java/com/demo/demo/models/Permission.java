package com.demo.demo.models;

import lombok.Data;


import javax.persistence.*;
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

}
