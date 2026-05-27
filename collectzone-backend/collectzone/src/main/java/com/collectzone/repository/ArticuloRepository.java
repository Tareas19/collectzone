package com.collectzone.repository;

import com.collectzone.model.Articulo;
import com.collectzone.model.Articulo.Categoria;
import com.collectzone.model.Articulo.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Long> {
    List<Articulo> findByUsuarioId(Long usuarioId);
    List<Articulo> findByCategoria(Categoria categoria);
    List<Articulo> findByEstado(Estado estado);
    List<Articulo> findByCategoriaAndEstado(Categoria categoria, Estado estado);
    List<Articulo> findByNombreContainingIgnoreCase(String nombre);
}