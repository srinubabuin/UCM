/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.app.db.util;

import java.util.Collections;
import java.util.Enumeration;
import java.util.LinkedHashSet;
import java.util.Properties;

/**
 *
 * @author Srinu Babu
 */
public class LinkedProperties extends Properties {
   
    private final LinkedHashSet<Object> keys = new LinkedHashSet<>(); 
 
    @Override
    public Enumeration<Object> keys() { 
        return Collections.<Object>enumeration(keys); 
    } 
 
    @Override
    public Object put(Object key, Object value) { 
        keys.add(key); 
        return super.put(key, value); 
    } 

}
