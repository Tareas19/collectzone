package com.collectzone.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;

@Entity
@Table(name = "intercambios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Intercambio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitante_id", nullable = false)
    @JsonIgnoreProperties({"articulos", "password"})
    private Usuario solicitante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "articulo_deseado_id", nullable = false)
    @JsonIgnoreProperties({"usuario"})
    private Articulo articuloDeseado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "articulo_ofrecido_id", nullable = false)
    @JsonIgnoreProperties({"usuario"})
    private Articulo articuloOfrecido;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EstadoIntercambio estado = EstadoIntercambio.PENDIENTE;

    private String mensaje;

    @Column(name = "fecha_solicitud")
    @Builder.Default
    private LocalDateTime fechaSolicitud = LocalDateTime.now();

    @Column(name = "fecha_respuesta")
    private LocalDateTime fechaRespuesta;

    public enum EstadoIntercambio {
        PENDIENTE, ACEPTADO, RECHAZADO
    }
}