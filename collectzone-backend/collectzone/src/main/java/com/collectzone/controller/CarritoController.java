package com.collectzone.controller;

import com.collectzone.model.Compra;
import com.collectzone.service.CarritoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/carrito")
@RequiredArgsConstructor
public class CarritoController {

    private final CarritoService carritoService;

    @GetMapping("/{usuarioId}")
    public ResponseEntity<?> obtenerCarrito(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(carritoService.obtenerCarrito(usuarioId));
    }

    @GetMapping("/{usuarioId}/count")
    public ResponseEntity<?> contarItems(@PathVariable Long usuarioId) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("total", carritoService.contarItems(usuarioId));
        return ResponseEntity.ok(resp);
    }

    @PostMapping
    public ResponseEntity<?> agregar(@RequestBody Map<String, Long> datos) {
        try {
            carritoService.agregarAlCarrito(datos.get("usuarioId"), datos.get("articuloId"));
            Map<String, Object> resp = new HashMap<>();
            resp.put("mensaje", "Agregado al carrito");
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> eliminar(@RequestParam Long usuarioId, @RequestParam Long articuloId) {
        carritoService.eliminarDelCarrito(usuarioId, articuloId);
        Map<String, Object> resp = new HashMap<>();
        resp.put("mensaje", "Eliminado del carrito");
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/checkout/{usuarioId}")
    public ResponseEntity<?> checkout(@PathVariable Long usuarioId) {
        try {
            List<Compra> compras = carritoService.procesarCompra(usuarioId);
            Map<String, Object> resp = new HashMap<>();
            resp.put("mensaje", "Compra realizada correctamente");
            resp.put("totalCompras", compras.size());
            return ResponseEntity.ok(resp);
        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/historial/{usuarioId}")
    public ResponseEntity<?> historial(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(carritoService.obtenerHistorialCompras(usuarioId));
    }
}