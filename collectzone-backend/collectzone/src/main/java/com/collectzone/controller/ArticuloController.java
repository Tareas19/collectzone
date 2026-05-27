package com.collectzone.controller;

import com.collectzone.model.Articulo;
import com.collectzone.model.Articulo.Categoria;
import com.collectzone.model.Articulo.Estado;
import com.collectzone.service.ArticuloService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/articulos")
@RequiredArgsConstructor
public class ArticuloController {

    private final ArticuloService articuloService;

    @GetMapping
    public ResponseEntity<?> obtenerTodos() {
        return ResponseEntity.ok(articuloService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        return articuloService.obtenerPorId(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> {
                    Map<String, Object> error = new HashMap<>();
                    error.put("error", "Artículo no encontrado");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
                });
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> obtenerPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(articuloService.obtenerPorUsuario(usuarioId));
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<?> obtenerPorCategoria(@PathVariable Categoria categoria) {
        return ResponseEntity.ok(articuloService.obtenerPorCategoria(categoria));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<?> obtenerPorEstado(@PathVariable Estado estado) {
        return ResponseEntity.ok(articuloService.obtenerPorEstado(estado));
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscar(@RequestParam String nombre) {
        return ResponseEntity.ok(articuloService.buscarPorNombre(nombre));
    }
    // Añade este método junto a los demás
@PostMapping
public ResponseEntity<?> crearConQueryParam(@RequestParam Long usuarioId, @RequestBody Articulo articulo) {
    try {
        Articulo nuevo = articuloService.crear(articulo, usuarioId);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    } catch (RuntimeException e) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", e.getMessage());
        return ResponseEntity.badRequest().body(error);
    }
}

    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> crear(@PathVariable Long usuarioId, @RequestBody Articulo articulo) {
        try {
            Articulo nuevo = articuloService.crear(articulo, usuarioId);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Articulo articulo) {
        try {
            Articulo actualizado = articuloService.actualizar(id, articulo);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            articuloService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
}