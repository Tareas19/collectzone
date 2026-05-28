const API_URL = "https://collectzone-production.up.railway.app/api";

// ===== TOKEN =====
function getToken() {
    return localStorage.getItem("token");
}

function authHeaders() {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": "Bearer " + token } : {})
    };
}

// ===== SAFE PARSER =====
async function parseRes(res) {
    const text = await res.text();

    let data = {};
    try {
        data = text ? JSON.parse(text) : {};
    } catch (e) {
        data = { raw: text };
    }

    if (!res.ok) {
        throw new Error(
            data.error ||
            data.mensaje ||
            data.message ||
            `Error ${res.status}`
        );
    }

    return data;
}

// ===================== AUTH API =====================
const AuthAPI = {
    login: async (email, password) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        return parseRes(res);
    },

    registro: async (usuario) => {
        const res = await fetch(`${API_URL}/auth/registro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        return parseRes(res);
    },

    verificar: async () => {
        const res = await fetch(`${API_URL}/auth/verificar`, {
            headers: authHeaders()
        });
        return parseRes(res);
    }
};
// ===================== USUARIOS API =====================
const UsuarioAPI = {
    obtenerTodos: async () => {
        const res = await fetch(`${API_URL}/usuarios`, {
            headers: authHeaders()
        });
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
    },

    obtenerPorId: async (id) => {
        const res = await fetch(`${API_URL}/usuarios/${id}`, {
            headers: authHeaders()
        });
        if (!res.ok) throw new Error("Usuario no encontrado");
        return res.json();
    },

    crear: async (usuario) => {
        const res = await fetch(`${API_URL}/usuarios`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(usuario)
        });
        return parseRes(res);
    },

    actualizar: async (id, usuario) => {
        const res = await fetch(`${API_URL}/usuarios/${id}`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify(usuario)
        });
        return parseRes(res);
    },

    actualizarPerfil: async (id, datos) => {
        const res = await fetch(`${API_URL}/usuarios/${id}/perfil`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify(datos)
        });
        return parseRes(res);
    },

    eliminar: async (id) => {
        const res = await fetch(`${API_URL}/usuarios/${id}`, {
            method: "DELETE",
            headers: authHeaders()
        });
        if (!res.ok) throw new Error("Error al eliminar usuario");
        return true;
    }
};

// ===================== ARTICULOS API =====================
const ArticuloAPI = {
    obtenerTodos: async () => {
        const res = await fetch(`${API_URL}/articulos`, {
            headers: authHeaders()
        });
        if (!res.ok) throw new Error("Error al obtener artÃ­culos");
        return res.json();
    },

    obtenerPorId: async (id) => {
        const res = await fetch(`${API_URL}/articulos/${id}`, {
            headers: authHeaders()
        });
        if (!res.ok) throw new Error("ArtÃ­culo no encontrado");
        return res.json();
    },

    obtenerPorUsuario: async (usuarioId) => {
        const res = await fetch(`${API_URL}/articulos/usuario/${usuarioId}`, {
            headers: authHeaders()
        });
        return res.json();
    },

    obtenerPorCategoria: async (categoria) => {
        const res = await fetch(`${API_URL}/articulos/categoria/${categoria}`, {
            headers: authHeaders()
        });
        return res.json();
    },

    buscar: async (nombre) => {
        const res = await fetch(
            `${API_URL}/articulos/buscar?nombre=${encodeURIComponent(nombre)}`,
            { headers: authHeaders() }
        );
        return res.json();
    },

    crear: async (articulo) => {
        const usuarioId = articulo.usuario?.id;
        const url = usuarioId
            ? `${API_URL}/articulos?usuarioId=${usuarioId}`
            : `${API_URL}/articulos`;

        const res = await fetch(url, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(articulo)
        });

        return parseRes(res);
    },

    actualizar: async (id, articulo) => {
        const res = await fetch(`${API_URL}/articulos/${id}`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify(articulo)
        });
        return parseRes(res);
    },

    eliminar: async (id) => {
        const res = await fetch(`${API_URL}/articulos/${id}`, {
            method: "DELETE",
            headers: authHeaders()
        });
        if (!res.ok) throw new Error("Error al eliminar artÃ­culo");
        return true;
    }
};

// ===================== FAVORITOS API =====================
const FavoritoAPI = {
    obtenerDeUsuario: async (usuarioId) => {
        const res = await fetch(
            `${API_URL}/favoritos/usuario/${usuarioId}`,
            { headers: authHeaders() }
        );
        return res.json();
    },

    esFavorito: async (usuarioId, articuloId) => {
        const res = await fetch(
            `${API_URL}/favoritos/check?usuarioId=${usuarioId}&articuloId=${articuloId}`,
            { headers: authHeaders() }  // ðŸ‘ˆ esto falta
        );
        const data = await res.json();
        return data.esFavorito;
    },

    contarFavoritos: async (articuloId) => {
        const res = await fetch(
            `${API_URL}/favoritos/contar/${articuloId}`,
            { headers: authHeaders() }  // ðŸ‘ˆ esto falta
        );
        const data = await res.json();
        return data.total;
    },

    agregar: async (usuarioId, articuloId) => {
        const res = await fetch(`${API_URL}/favoritos`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({ usuarioId, articuloId })
        });
        return parseRes(res);
    },

    eliminar: async (usuarioId, articuloId) => {
        const res = await fetch(
            `${API_URL}/favoritos?usuarioId=${usuarioId}&articuloId=${articuloId}`,
            { method: "DELETE", headers: authHeaders() }
        );
        if (!res.ok) throw new Error("Error al eliminar favorito");
        return true;
    }
};


// ===================== CARRITO API =====================
const CarritoAPI = {
    obtener: async (usuarioId) => {
        const res = await fetch(`${API_URL}/carrito/${usuarioId}`, {
            headers: authHeaders()
        });
        return res.json();
    },

    contar: async (usuarioId) => {
        const res = await fetch(`${API_URL}/carrito/${usuarioId}/count`, {
            headers: authHeaders()
        });
        const data = await res.json();
        return data.total;
    },

    agregar: async (usuarioId, articuloId) => {
        const res = await fetch(`${API_URL}/carrito`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({ usuarioId, articuloId })
        });
        return parseRes(res);
    },

    eliminar: async (usuarioId, articuloId) => {
        const res = await fetch(
            `${API_URL}/carrito?usuarioId=${usuarioId}&articuloId=${articuloId}`,
            { method: "DELETE", headers: authHeaders() }
        );
        if (!res.ok) throw new Error("Error al eliminar del carrito");
        return true;
    },

    checkout: async (usuarioId) => {
        const res = await fetch(`${API_URL}/carrito/checkout/${usuarioId}`, {
            method: "POST",
            headers: authHeaders()
        });
        return parseRes(res);
    },

    historial: async (usuarioId) => {
        const res = await fetch(`${API_URL}/carrito/historial/${usuarioId}`, {
            headers: authHeaders()
        });
        return res.json();
    }
};

// ===================== INTERCAMBIOS API =====================
const IntercambioAPI = {
    proponer: async (solicitanteId, articuloDeseadoId, articuloOfrecidoId, mensaje) => {
        const res = await fetch(`${API_URL}/intercambios`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({
                solicitante: { id: solicitanteId },
                articuloDeseado: { id: articuloDeseadoId },
                articuloOfrecido: { id: articuloOfrecidoId },
                mensaje
            })
        });
        return parseRes(res);
    },

    aceptar: async (intercambioId, usuarioId) => {
        const res = await fetch(
            `${API_URL}/intercambios/${intercambioId}/aceptar?usuarioId=${usuarioId}`,
            { method: "PUT", headers: authHeaders() }
        );
        return parseRes(res);
    },

    rechazar: async (intercambioId, usuarioId) => {
        const res = await fetch(
            `${API_URL}/intercambios/${intercambioId}/rechazar?usuarioId=${usuarioId}`,
            { method: "PUT", headers: authHeaders() }
        );
        return parseRes(res);
    },

    enviados: async (usuarioId) => {
        const res = await fetch(`${API_URL}/intercambios/enviados/${usuarioId}`, {
            headers: authHeaders()
        });
        return res.json();
    },

    recibidos: async (usuarioId) => {
        const res = await fetch(`${API_URL}/intercambios/recibidos/${usuarioId}`, {
            headers: authHeaders()
        });
        return res.json();
    },

    pendientes: async (usuarioId) => {
        const res = await fetch(`${API_URL}/intercambios/pendientes/${usuarioId}`, {
            headers: authHeaders()
        });
        return res.json();
    }
};




