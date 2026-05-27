package com.collectzone.controller;
import com.collectzone.config.JwtUtil;
import com.collectzone.model.Usuario;
import com.collectzone.service.EmailService;
import com.collectzone.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final BCryptPasswordEncoder encoder;
    // =========================
    // 🔐 LOGIN
    // =========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        if (email == null || password == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Email y password obligatorios"));
        }
        Optional<Usuario> userOpt = usuarioService.obtenerPorEmail(email);
        if (userOpt.isEmpty() ||
                !encoder.matches(password, userOpt.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Credenciales incorrectas"));
        }
        Usuario user = userOpt.get();
        String token = jwtUtil.generarToken(
                user.getId(),
                user.getEmail(),
                user.getRol().name()
        );
        return ResponseEntity.ok(Map.of(
                "token", token,
                "usuario", Map.of(
                        "id", user.getId(),
                        "nombre", user.getNombre(),
                        "email", user.getEmail(),
                        "rol", user.getRol().name()
                )
        ));
    }
    // =========================
    // 🟢 REGISTRO (PÚBLICO)
    // =========================
    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody Usuario usuario) {
        if (usuarioService.existeEmail(usuario.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Email ya registrado"));
        }
        usuario.setRol(Usuario.Rol.USER);
        usuario.setPassword(encoder.encode(usuario.getPassword()));
        Usuario saved = usuarioService.crear(usuario);
        try {
            emailService.enviarEmailBienvenidaAsync(
                    saved.getEmail(),
                    saved.getNombre()
            );
        } catch (Exception e) {
            System.err.println("Error enviando email de bienvenida: " + e.getMessage());
        }
        String token = jwtUtil.generarToken(
                saved.getId(),
                saved.getEmail(),
                saved.getRol().name()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "mensaje", "Usuario creado correctamente",
                "token", token,
                "usuario", Map.of(
                        "id", saved.getId(),
                        "nombre", saved.getNombre(),
                        "email", saved.getEmail(),
                        "rol", saved.getRol().name()
                )
        ));
    }
    // =========================
    // 🔎 VERIFICAR TOKEN
    // =========================
    @GetMapping("/verificar")
    public ResponseEntity<?> verificar(@RequestHeader("Authorization") String auth) {
        try {
            String token = auth.replace("Bearer ", "");
            if (!jwtUtil.validarToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token inválido"));
            }
            Long id = jwtUtil.obtenerUserId(token);
            Usuario user = usuarioService.obtenerPorId(id)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "nombre", user.getNombre(),
                    "email", user.getEmail(),
                    "rol", user.getRol().name()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Token inválido"));
        }
    }
}