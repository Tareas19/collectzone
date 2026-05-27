/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.collectzone.controller;

import com.collectzone.service.FavoritoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/favoritos")
@RequiredArgsConstructor
public class FavoritoController {

    private final FavoritoService favoritoService;

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> obtenerFavoritos(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(favoritoService.obtenerFavoritosDeUsuario(usuarioId));
    }

    @GetMapping("/check")
    public ResponseEntity<?> esFavorito(@RequestParam Long usuarioId, @RequestParam Long articuloId) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("esFavorito", favoritoService.esFavorito(usuarioId, articuloId));
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/contar/{articuloId}")
    public ResponseEntity<?> contarFavoritos(@PathVariable Long articuloId) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("total", favoritoService.contarFavoritos(articuloId));
        return ResponseEntity.ok(resp);
    }

    @PostMapping
    public ResponseEntity<?> agregar(@RequestBody Map<String, Long> datos) {
        try {
            favoritoService.agregarFavorito(datos.get("usuarioId"), datos.get("articuloId"));
            Map<String, Object> resp = new HashMap<>();
            resp.put("mensaje", "Agregado a favoritos");
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> eliminar(@RequestParam Long usuarioId, @RequestParam Long articuloId) {
        favoritoService.eliminarFavorito(usuarioId, articuloId);
        Map<String, Object> resp = new HashMap<>();
        resp.put("mensaje", "Eliminado de favoritos");
        return ResponseEntity.ok(resp);
    }
}