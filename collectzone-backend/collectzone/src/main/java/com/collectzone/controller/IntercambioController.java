package com.collectzone.controller;

import com.collectzone.model.Intercambio;
import com.collectzone.service.IntercambioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/intercambios")
@RequiredArgsConstructor
public class IntercambioController {

    private final IntercambioService intercambioService;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Intercambio intercambio) {
        try {
            Intercambio nuevo = intercambioService.crearIntercambio(intercambio);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        return intercambioService.obtenerPorId(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> {
                    Map<String, Object> error = new HashMap<>();
                    error.put("error", "Intercambio no encontrado");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
                });
    }

    @GetMapping("/enviados/{usuarioId}")
    public ResponseEntity<?> enviados(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(intercambioService.obtenerEnviados(usuarioId));
    }

    @GetMapping("/recibidos/{usuarioId}")
    public ResponseEntity<?> recibidos(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(intercambioService.obtenerRecibidos(usuarioId));
    }

    @GetMapping("/pendientes/{usuarioId}")
    public ResponseEntity<?> pendientes(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(intercambioService.obtenerPendientes(usuarioId));
    }

    @PutMapping("/{id}/aceptar")
    public ResponseEntity<?> aceptar(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(intercambioService.aceptarIntercambio(id));
        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @PutMapping("/{id}/rechazar")
    public ResponseEntity<?> rechazar(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(intercambioService.rechazarIntercambio(id));
        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
}