package com.ucm.model;

import com.app.util.Role;

import java.util.Objects;

public class AppAuth {

    private String token = null;
    private Role role = null;
    private String loginId = null;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String loginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AppAuth signinToken = (AppAuth) o;
        return Objects.equals(token, signinToken.token);
    }

    @Override
    public int hashCode() {
        return Objects.hash(token);
    }

    @Override
    public String toString() {
//        StringBuilder sb = new StringBuilder();
//        sb.append("class SigninToken {\n");
//
//        sb.append("    token: ").append(toIndentedString(token)).append("\n");
//        sb.append("}");
        return "{\"token\":\"" + this.token + "\", \"role\": \"" + role.toString() + "\"}";
    }

    /**
     * Convert the given object to string with each line indented by 4 spaces
     * (except the first line).
     */
    private String toIndentedString(Object o) {
        if (o == null) {
            return "null";
        }
        return o.toString().replace("\n", "\n    ");
    }
}
