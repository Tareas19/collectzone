package com.collectzone.repository;

import com.collectzone.model.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    List<Favorito> findByUsuarioId(Long usuarioId);
    boolean existsByUsuarioIdAndArticuloId(Long usuarioId, Long articuloId);
    void deleteByUsuarioIdAndArticuloId(Long usuarioId, Long articuloId);
    long countByArticuloId(Long articuloId);
}