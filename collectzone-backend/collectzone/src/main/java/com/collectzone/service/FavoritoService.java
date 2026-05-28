package com.collectzone.service;

import com.collectzone.model.Articulo;
import com.collectzone.model.Favorito;
import com.collectzone.model.Usuario;
import com.collectzone.repository.ArticuloRepository;
import com.collectzone.repository.FavoritoRepository;
import com.collectzone.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoritoService {

    private final FavoritoRepository favoritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ArticuloRepository articuloRepository;

    @Transactional
    @Transactional
    public List<Favorito> obtenerFavoritosDeUsuario(Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId);
    }

    public boolean esFavorito(Long usuarioId, Long articuloId) {
        return favoritoRepository.existsByUsuarioIdAndArticuloId(usuarioId, articuloId);
    }

    public long contarFavoritos(Long articuloId) {
        return favoritoRepository.countByArticuloId(articuloId);
    }

    public Favorito agregarFavorito(Long usuarioId, Long articuloId) {
        if (favoritoRepository.existsByUsuarioIdAndArticuloId(usuarioId, articuloId)) {
            throw new RuntimeException("Este artÃƒÂ­culo ya estÃƒÂ¡ en tus favoritos");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Articulo articulo = articuloRepository.findById(articuloId)
                .orElseThrow(() -> new RuntimeException("ArtÃƒÂ­culo no encontrado"));

        Favorito favorito = Favorito.builder()
                .usuario(usuario)
                .articulo(articulo)
                .fechaAgregado(LocalDateTime.now())
                .build();

        return favoritoRepository.save(favorito);
    }

    @Transactional
    public void eliminarFavorito(Long usuarioId, Long articuloId) {
        if (!favoritoRepository.existsByUsuarioIdAndArticuloId(usuarioId, articuloId)) {
            throw new RuntimeException("Este articulo no esta en tus favoritos");
        }
        favoritoRepository.deleteByUsuarioIdAndArticuloId(usuarioId, articuloId);
    }
}

