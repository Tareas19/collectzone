package com.collectzone.repository;
import com.collectzone.model.Carrito;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    @EntityGraph(attributePaths = {"usuario", "articulo"})
    List<Carrito> findByUsuarioId(Long usuarioId);
    boolean existsByUsuarioIdAndArticuloId(Long usuarioId, Long articuloId);
    void deleteByUsuarioIdAndArticuloId(Long usuarioId, Long articuloId);
    void deleteByUsuarioId(Long usuarioId);
    long countByUsuarioId(Long usuarioId);
}