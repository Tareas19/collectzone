package com.collectzone.service;

import com.collectzone.model.Articulo;
import com.collectzone.model.Articulo.Categoria;
import com.collectzone.model.Articulo.Estado;
import com.collectzone.model.Usuario;
import com.collectzone.repository.ArticuloRepository;
import com.collectzone.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticuloService {

    private final ArticuloRepository articuloRepository;
    private final UsuarioRepository usuarioRepository;

    public List<Articulo> obtenerTodos() {
        return articuloRepository.findAll();
    }

    public Optional<Articulo> obtenerPorId(Long id) {
        return articuloRepository.findById(id);
    }

    public List<Articulo> obtenerPorUsuario(Long usuarioId) {
        return articuloRepository.findByUsuarioId(usuarioId);
    }

    public List<Articulo> obtenerPorCategoria(Categoria categoria) {
        return articuloRepository.findByCategoria(categoria);
    }

    public List<Articulo> obtenerPorEstado(Estado estado) {
        return articuloRepository.findByEstado(estado);
    }

    public List<Articulo> buscarPorNombre(String nombre) {
        return articuloRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public Articulo crear(Articulo articulo, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (articulo.getPrecio() < 0) {
            throw new RuntimeException("El precio no puede ser negativo");
        }
        if (articulo.getNombre() == null || articulo.getNombre().isBlank()) {
            throw new RuntimeException("El nombre es obligatorio");
        }
        if (articulo.getCategoria() == null) {
            throw new RuntimeException("La categoría es obligatoria");
        }
        if (articulo.getEstado() == null) {
            articulo.setEstado(Estado.DISPONIBLE);
        }

        articulo.setUsuario(usuario);
        articulo.setFechaPublicacion(LocalDateTime.now());
        return articuloRepository.save(articulo);
    }

    public Articulo actualizar(Long id, Articulo datosActualizados) {
        return articuloRepository.findById(id)
                .map(articulo -> {
                    if (datosActualizados.getNombre() != null)
                        articulo.setNombre(datosActualizados.getNombre());
                    if (datosActualizados.getDescripcion() != null)
                        articulo.setDescripcion(datosActualizados.getDescripcion());
                    if (datosActualizados.getPrecio() != null) {
                        if (datosActualizados.getPrecio() < 0)
                            throw new RuntimeException("El precio no puede ser negativo");
                        articulo.setPrecio(datosActualizados.getPrecio());
                    }
                    if (datosActualizados.getCategoria() != null)
                        articulo.setCategoria(datosActualizados.getCategoria());
                    if (datosActualizados.getEstado() != null)
                        articulo.setEstado(datosActualizados.getEstado());
                    if (datosActualizados.getImagenUrl() != null)
                        articulo.setImagenUrl(datosActualizados.getImagenUrl());
                    return articuloRepository.save(articulo);
                })
                .orElseThrow(() -> new RuntimeException("Artículo no encontrado con id: " + id));
    }

    public void eliminar(Long id) {
        if (!articuloRepository.existsById(id)) {
            throw new RuntimeException("Artículo no encontrado con id: " + id);
        }
        articuloRepository.deleteById(id);
    }
}