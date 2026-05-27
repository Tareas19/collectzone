package com.collectzone.repository;

import com.collectzone.model.Intercambio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IntercambioRepository extends JpaRepository<Intercambio, Long> {
    List<Intercambio> findBySolicitanteId(Long solicitanteId);
    List<Intercambio> findByArticuloDeseadoId(Long articuloId);
    List<Intercambio> findByArticuloOfrecidoId(Long articuloId);

    @Query("SELECT i FROM Intercambio i WHERE i.articuloDeseado.usuario.id = :usuarioId")
    List<Intercambio> findByArticuloDeseadoId_UsuarioId(Long usuarioId);
}