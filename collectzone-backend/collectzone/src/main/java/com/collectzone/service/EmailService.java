package com.collectzone.service;

public interface EmailService {
    void enviarEmailBienvenidaAsync(String email, String nombre);
}