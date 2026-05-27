package com.collectzone.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;

@Entity
@Table(name = "compras")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comprador_id", nullable = false)
    @JsonIgnoreProperties({"articulos", "password"})
    private Usuario comprador;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "articulo_id", nullable = false)
    @JsonIgnoreProperties({"usuario"})
    private Articulo articulo;

    @Column(nullable = false)
    private Double precioCompra;

    @Column(name = "fecha_compra")
    @Builder.Default
    private LocalDateTime fechaCompra = LocalDateTime.now();
}