package com.collectzone.service;

import com.collectzone.model.Intercambio;
import com.collectzone.model.Intercambio.EstadoIntercambio;
import com.collectzone.repository.IntercambioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IntercambioService {

    private final IntercambioRepository intercambioRepository;

    public Intercambio crearIntercambio(Intercambio intercambio) {
        intercambio.setEstado(EstadoIntercambio.PENDIENTE);
        intercambio.setFechaSolicitud(LocalDateTime.now());
        return intercambioRepository.save(intercambio);
    }

    public Optional<Intercambio> obtenerPorId(Long id) {
        return intercambioRepository.findById(id);
    }

    // Intercambios enviados por el usuario (él es el solicitante)
    public List<Intercambio> obtenerEnviados(Long usuarioId) {
        return intercambioRepository.findBySolicitanteId(usuarioId);
    }

    // Intercambios recibidos (alguien quiere un artículo del usuario)
    public List<Intercambio> obtenerRecibidos(Long usuarioId) {
        return intercambioRepository.findByArticuloDeseadoId_UsuarioId(usuarioId);
    }

    // Intercambios pendientes recibidos
    public List<Intercambio> obtenerPendientes(Long usuarioId) {
        return obtenerRecibidos(usuarioId).stream()
                .filter(i -> i.getEstado() == EstadoIntercambio.PENDIENTE)
                .collect(Collectors.toList());
    }

    public Intercambio aceptarIntercambio(Long id) {
        return intercambioRepository.findById(id)
                .map(intercambio -> {
                    intercambio.setEstado(EstadoIntercambio.ACEPTADO);
                    intercambio.setFechaRespuesta(LocalDateTime.now());
                    return intercambioRepository.save(intercambio);
                })
                .orElseThrow(() -> new RuntimeException("Intercambio no encontrado"));
    }

    public Intercambio rechazarIntercambio(Long id) {
        return intercambioRepository.findById(id)
                .map(intercambio -> {
                    intercambio.setEstado(EstadoIntercambio.RECHAZADO);
                    intercambio.setFechaRespuesta(LocalDateTime.now());
                    return intercambioRepository.save(intercambio);
                })
                .orElseThrow(() -> new RuntimeException("Intercambio no encontrado"));
    }
}