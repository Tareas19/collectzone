package com.collectzone.service;

import com.collectzone.model.Articulo;
import com.collectzone.model.Carrito;
import com.collectzone.model.Compra;
import com.collectzone.model.Usuario;
import com.collectzone.repository.ArticuloRepository;
import com.collectzone.repository.CarritoRepository;
import com.collectzone.repository.CompraRepository;
import com.collectzone.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarritoService {

    private final CarritoRepository carritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ArticuloRepository articuloRepository;
    private final CompraRepository compraRepository;

    public List<Carrito> obtenerCarrito(Long usuarioId) {
        return carritoRepository.findByUsuarioId(usuarioId);
    }

    public long contarItems(Long usuarioId) {
        return carritoRepository.countByUsuarioId(usuarioId);
    }

    public Carrito agregarAlCarrito(Long usuarioId, Long articuloId) {
        if (carritoRepository.existsByUsuarioIdAndArticuloId(usuarioId, articuloId)) {
            throw new RuntimeException("Este artículo ya está en el carrito");
        }

        Articulo articulo = articuloRepository.findById(articuloId)
                .orElseThrow(() -> new RuntimeException("Artículo no encontrado"));

        if (articulo.getEstado() != Articulo.Estado.DISPONIBLE) {
            throw new RuntimeException("Este artículo no está disponible");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (articulo.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No puedes comprar tu propio artículo");
        }

        Carrito item = Carrito.builder()
                .usuario(usuario)
                .articulo(articulo)
                .fechaAgregado(LocalDateTime.now())
                .build();

        return carritoRepository.save(item);
    }

    @Transactional
    public void eliminarDelCarrito(Long usuarioId, Long articuloId) {
        if (!carritoRepository.existsByUsuarioIdAndArticuloId(usuarioId, articuloId)) {
            throw new RuntimeException("Este artículo no está en tu carrito");
        }
        carritoRepository.deleteByUsuarioIdAndArticuloId(usuarioId, articuloId);
    }

    @Transactional
    public List<Compra> procesarCompra(Long usuarioId) {
        List<Carrito> items = carritoRepository.findByUsuarioId(usuarioId);

        if (items.isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        Usuario comprador = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Compra> compras = new ArrayList<>();

        for (Carrito item : items) {
            Articulo articulo = item.getArticulo();

            if (articulo.getEstado() != Articulo.Estado.DISPONIBLE) {
                continue;
            }

            articulo.setEstado(Articulo.Estado.VENDIDO);
            articuloRepository.save(articulo);

            Compra compra = Compra.builder()
                    .comprador(comprador)
                    .articulo(articulo)
                    .precioCompra(articulo.getPrecio())
                    .fechaCompra(LocalDateTime.now())
                    .build();

            compras.add(compraRepository.save(compra));
        }

        carritoRepository.deleteByUsuarioId(usuarioId);
        return compras;
    }

    public List<Compra> obtenerHistorialCompras(Long usuarioId) {
        return compraRepository.findByCompradorIdOrderByFechaCompraDesc(usuarioId);
    }
}