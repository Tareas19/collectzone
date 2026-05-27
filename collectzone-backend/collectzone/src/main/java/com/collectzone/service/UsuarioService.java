package com.collectzone.service;

import com.collectzone.model.Usuario;
import com.collectzone.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Usuario> obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Usuario crear(Usuario usuario) {

        if (usuario == null) {
            throw new IllegalArgumentException("El usuario no puede ser null");
        }

        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("Ya existe un usuario con ese email");
        }

        usuario.setFechaRegistro(LocalDateTime.now());

        return usuarioRepository.save(usuario);
    }

    public Usuario actualizar(Long id, Usuario datosActualizados) {

        return usuarioRepository.findById(id)
                .map(usuario -> {

                    // Validar email duplicado
                    if (!usuario.getEmail().equals(datosActualizados.getEmail())
                            && usuarioRepository.existsByEmail(datosActualizados.getEmail())) {

                        throw new IllegalArgumentException("El email ya está en uso");
                    }

                    usuario.setNombre(datosActualizados.getNombre());
                    usuario.setEmail(datosActualizados.getEmail());

                    // Actualizar password solo si viene informado
                    if (datosActualizados.getPassword() != null
                            && !datosActualizados.getPassword().isBlank()) {

                        usuario.setPassword(datosActualizados.getPassword());
                    }

                    usuario.setRol(datosActualizados.getRol());

                    return usuarioRepository.save(usuario);
                })
                .orElseThrow(() ->
                        new IllegalArgumentException("Usuario no encontrado con id: " + id));
    }

    public void eliminar(Long id) {

        if (!usuarioRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Usuario no encontrado con id: " + id);
        }

        usuarioRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public boolean existeEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }
}