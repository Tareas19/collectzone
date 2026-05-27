package com.collectzone.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;

@Entity
@Table(name = "carrito", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"usuario_id", "articulo_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"articulos", "password"})
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "articulo_id", nullable = false)
    @JsonIgnoreProperties({"usuario"})
    private Articulo articulo;

    @Column(name = "fecha_agregado")
    @Builder.Default
    private LocalDateTime fechaAgregado = LocalDateTime.now();
}