/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.encryption;

import com.ucm.exception.AppException;
import com.ucm.exception.EncryptedTokenNotValidExcepton;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;

public class AppDataEncryptorDecryptor {

    private static final String UNICODE_FORMAT = "UTF8";
    public static final String DESEDE_ENCRYPTION_SCHEME = "DESede";
    private KeySpec keySpec;
    private SecretKeyFactory secretKeyFactory;
    private Cipher cipher;
    byte[] arrayBytes;
    private String arEncryptionKey;
    private String arEncryptionScheme;
    SecretKey key;

    public AppDataEncryptorDecryptor() throws AppException {
        try {
            arEncryptionKey = "1vgnirtscedcnedrowssapmcu";
            arEncryptionScheme = DESEDE_ENCRYPTION_SCHEME;
            arrayBytes = arEncryptionKey.getBytes(UNICODE_FORMAT);
            keySpec = new DESedeKeySpec(arrayBytes);
            secretKeyFactory = SecretKeyFactory.getInstance(arEncryptionScheme);
            cipher = Cipher.getInstance(arEncryptionScheme);
            key = secretKeyFactory.generateSecret(keySpec);
        } catch (UnsupportedEncodingException | InvalidKeyException | NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException e) {
            throw new AppException("Unable to encrypt the string");
        }
    }

    public String encrypt(String unencryptedString) throws AppException {
        String encryptedString = null;
        try {
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] plainText = unencryptedString.getBytes(UNICODE_FORMAT);
            byte[] encryptedText = cipher.doFinal(plainText);
            encryptedString = new String(Base64.getEncoder().encode(encryptedText));
        } catch (UnsupportedEncodingException | InvalidKeyException | BadPaddingException | IllegalBlockSizeException e) {
            throw new AppException("Unable to encrypt the string");
        }
        return encryptedString;
    }

    public String decrypt(String encryptedString) throws EncryptedTokenNotValidExcepton {
        String decryptedText = null;
        try {
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] encryptedText = Base64.getDecoder().decode(encryptedString);
            byte[] plainText = cipher.doFinal(encryptedText);
            decryptedText = new String(plainText);
        } catch (InvalidKeyException | BadPaddingException | IllegalBlockSizeException e) {
            throw new EncryptedTokenNotValidExcepton("Reset Token is not valid");
        }
        return decryptedText;
    }

    public static void main(String[] args) throws Exception {

        AppDataEncryptorDecryptor td = new AppDataEncryptorDecryptor();
        String target = "admin";
        String encrypted = td.encrypt(target);
        String decrypted = td.decrypt(encrypted);
        System.out.println(td.decrypt("I9u6Hpeuho4QdvC/As/Vjg=="));
        System.out.println("String To Encrypt: " + target);
        System.out.println("Encrypted String:" + encrypted);
        System.out.println("Decrypted String:" + decrypted);
    }
}
