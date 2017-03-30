package com.app.util;

import com.ucm.model.AppUser;
import java.util.HashMap;
import java.util.Map;

public class AppSessionUtil {

    public static Map<String, AppUser> appSessions = new HashMap();

    public static AppUser getAuthoriztionUser(String authorization) {
        return appSessions.get(authorization);
    }

    public static void setAuthoriztionUser(String authorization, AppUser appUser) {
        appSessions.put(authorization, appUser);
    }

    public static AppUser removeAuthoriztionUser(String authorization) {
        return appSessions.remove(authorization);
    }

}
