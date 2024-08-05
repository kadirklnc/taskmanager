package com.demo.demo.payload.request;

public class UpdateTotalLeaveDays {

    private int id;
    private int newTotalLeaveDays;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNewTotalLeaveDays() {
        return newTotalLeaveDays;
    }

    public void setNewTotalLeaveDays(int newTotalLeaveDays) {
        this.newTotalLeaveDays = newTotalLeaveDays;
    }
}
