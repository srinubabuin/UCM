package com.app.util;

import org.codehaus.jackson.annotate.JsonProperty;

public enum Role {
    @JsonProperty("ADMIN")
    ADMIN("Admin"),
    @JsonProperty("DIRECTOR")
    DIRECTOR("Director"),
    @JsonProperty("ADVISOR")
    ADVISOR("Advisor"),
    @JsonProperty("STUDENT")
    STUDENT("Student");

    Role(String name) {
        this.name = name;
    }

    String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
