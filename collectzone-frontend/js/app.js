// ===== USUARIO ACTUAL =====
// Email exclusivo del superadministrador (root)
const ROOT_EMAIL = "root@collectzone.com";

function getUsuarioActual() {
    const user = localStorage.getItem("usuario");
    return user ? JSON.parse(user) : null;
}

function isAdmin() {
    const user = getUsuarioActual();
    return user && user.rol === "ADMIN";
}

function isRoot() {
    const user = getUsuarioActual();
    return user && user.email === ROOT_EMAIL && user.rol === "ADMIN";
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// ===== PROTECCION DE PAGINAS =====
function protegerPagina() {
    const usuario = getUsuarioActual();
    const token = localStorage.getItem("token");
    const paginaActual = window.location.pathname.split("/").pop();
    const paginasPublicas = ["login.html", "registro.html", "index.html", "", "articulos.html", "ranking.html", "detalle-articulo.html"];

    if (!usuario || !token) {
        if (!paginasPublicas.includes(paginaActual)) {
            window.location.href = "login.html";
            return false;
        }
    }
    return true;
}

function protegerPaginaAdmin() {
    if (!protegerPagina()) return false;
    if (!isRoot()) {
        alert("Acceso restringido al usuario root.");
        window.location.href = "index.html";
        return false;
    }
    return true;
}

// ===== ACTUALIZAR UI SEGUN USUARIO =====
function actualizarUIUsuario() {
    const usuario = getUsuarioActual();

    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const userInfo = document.getElementById("userInfo");
    const userName = document.getElementById("userName");
    const adminBtn = document.getElementById("adminBtn");
    const publicarBtn = document.getElementById("publicarBtn");
    const heroRegistroBtn = document.getElementById("heroRegistroBtn");
    const misArticulosBtn = document.getElementById("misArticulosBtn");
    const favoritosBtn = document.getElementById("favoritosBtn");
    const carritoBtn = document.getElementById("carritoBtn");
    const intercambiosBtn = document.getElementById("intercambiosBtn");

    if (usuario) {
        if (loginBtn) loginBtn.style.display = "none";
        if (registerBtn) registerBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "block";
        if (userInfo) userInfo.style.display = "flex";
        if (userName) userName.innerHTML = `<a href="perfil.html?id=${usuario.id}" class="text-decoration-none" style="color: inherit;">${usuario.nombre}</a>`;
        if (publicarBtn) publicarBtn.style.display = "block";
        if (heroRegistroBtn) heroRegistroBtn.style.display = "none";
        if (misArticulosBtn) misArticulosBtn.style.display = "block";
        if (favoritosBtn) favoritosBtn.style.display = "block";
        if (carritoBtn) carritoBtn.style.display = "block";
        if (intercambiosBtn) intercambiosBtn.style.display = "block";
        // Solo el usuario root ve el boton de admin
        if (adminBtn) adminBtn.style.display = isRoot() ? "block" : "none";
        actualizarContadorCarrito();
    } else {
        if (loginBtn) loginBtn.style.display = "block";
        if (registerBtn) registerBtn.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "none";
        if (userInfo) userInfo.style.display = "none";
        if (adminBtn) adminBtn.style.display = "none";
        if (publicarBtn) publicarBtn.style.display = "none";
        if (heroRegistroBtn) heroRegistroBtn.style.display = "inline-block";
        if (misArticulosBtn) misArticulosBtn.style.display = "none";
        if (favoritosBtn) favoritosBtn.style.display = "none";
        if (carritoBtn) carritoBtn.style.display = "none";
        if (intercambiosBtn) intercambiosBtn.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarUIUsuario();
    protegerPagina();
});

// ===== VER PERFIL DE USUARIO =====
function verPerfilUsuario(usuarioId) {
    window.location.href = "perfil.html?id=" + usuarioId;
}

// ===== IMAGENES REALES POR CATEGORIA =====
const IMAGENES_CATEGORIA = {
    CARTAS: [
        "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1628968434441-d9c61fcb3a56?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1647221598231-a2354519f91c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=600&h=400&fit=crop"
    ],
    MONEDAS: [
        "https://images.unsplash.com/photo-1621778454898-6c02e0f7a2a8?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1610375461369-d613b564f4c4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1624365169198-39c58f6d5d1c?w=600&h=400&fit=crop"
    ],
    FIGURAS: [
        "https://images.unsplash.com/photo-1608889825100-37a44d8de46c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1611419010196-a360856fc42f?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1559981421-3e0c0d712dac?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&h=400&fit=crop"
    ],
    SELLOS: [
        "https://images.unsplash.com/photo-1579033385971-a7bc023a7298?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1586074299757-dc655f18518c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=400&fit=crop"
    ],
    OTROS: [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&h=400&fit=crop"
    ]
};

function getImagenArticulo(art) {
    if (art.imagen_url && art.imagen_url.trim() !== "") {
        return art.imagen_url;
    }

    if (art.imagenUrl && art.imagenUrl.trim() !== "") {
        return art.imagenUrl;
    }

    const pool = IMAGENES_CATEGORIA[art.categoria] || IMAGENES_CATEGORIA.OTROS;
    const idx = Math.abs((art.id || 0)) % pool.length;

    return pool[idx];
}
// ===== CARGAR ARTICULOS =====
async function cargarArticulos() {
    try {
        const articulos = await ArticuloAPI.obtenerTodos();
        mostrarArticulos(articulos);
    } catch(e) { console.error(e); }
}

function mostrarArticulos(articulos) {
    const container = document.getElementById("articulosContainer");
    const tabla = document.getElementById("tablaArticulos");

    if (container) {
        container.innerHTML = "";
        if (articulos.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-box-open fa-3x text-muted d-block mb-3"></i>
                    <h4 class="text-muted">No hay articulos disponibles</h4>
                    <p class="text-muted">Se el primero en publicar un coleccionable</p>
                    <a href="crear-articulo.html" class="btn-accent mt-3">Publicar articulo</a>
                </div>`;
            return;
        }
        articulos.forEach(art => { container.innerHTML += crearTarjetaArticulo(art); });
    }

    if (tabla) {
        tabla.innerHTML = "";
        articulos.forEach(art => { tabla.innerHTML += crearFilaArticulo(art); });
    }

    setTimeout(() => cargarEstadoFavoritos(), 50);
}

// ===== ORDENAR/FILTRAR/BUSCAR =====
async function ordenarArticulos() {
    try {
        const orden = document.getElementById("ordenar")?.value || "recientes";
        let articulos = await ArticuloAPI.obtenerTodos();
        const filtroCat = document.getElementById("filtroCategoria")?.value;
        if (filtroCat && filtroCat !== "TODOS") articulos = articulos.filter(a => a.categoria === filtroCat);
        switch (orden) {
            case "precio-asc": articulos.sort((a, b) => a.precio - b.precio); break;
            case "precio-desc": articulos.sort((a, b) => b.precio - a.precio); break;
            case "nombre": articulos.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
            default: articulos.reverse();
        }
        mostrarArticulos(articulos);
    } catch(e) { console.error(e); }
}

async function filtrarPorCategoria() { ordenarArticulos(); }

async function buscarArticulos() {
    try {
        const nombre = document.getElementById("buscarInput").value.trim();
        if (nombre === "") { cargarArticulos(); return; }
        const articulos = await ArticuloAPI.buscar(nombre);
        mostrarArticulos(articulos);
    } catch(e) { console.error(e); }
}

// ===== INDEX: DESTACADOS / STATS =====
async function cargarArticulosDestacados() {
    try {
        const articulos = await ArticuloAPI.obtenerTodos();
        const container = document.getElementById("articulosDestacados");
        if (!container) return;
        const ultimos = articulos.slice(-6).reverse();
        container.innerHTML = "";
        if (ultimos.length === 0) {
            container.innerHTML = '<div class="col-12 text-center py-4"><p class="text-muted">Aun no hay articulos</p></div>';
            return;
        }
        ultimos.forEach(art => { container.innerHTML += crearTarjetaArticulo(art); });
        setTimeout(() => cargarEstadoFavoritos(), 50);
    } catch(e) { console.error(e); }
}

async function cargarEstadisticas() {
    try {
        const articulos = await ArticuloAPI.obtenerTodos();
        animarNumero("statArticulos", articulos.length);
        animarNumero("statIntercambios", articulos.filter(a => a.estado === "VENDIDO" || a.estado === "INTERCAMBIO").length);

        const usuario = getUsuarioActual();
        if (usuario) {
            const usuarios = await UsuarioAPI.obtenerTodos();
            animarNumero("statUsuarios", usuarios.length);
        }
    } catch(e) { console.error(e); }
}

function animarNumero(elementId, objetivo) {
    const el = document.getElementById(elementId);
    if (!el) return;
    let actual = 0;
    const incremento = Math.max(1, Math.ceil(objetivo / 30));
    const intervalo = setInterval(() => {
        actual += incremento;
        if (actual >= objetivo) { actual = objetivo; clearInterval(intervalo); }
        el.textContent = actual;
    }, 40);
}

// ===== TARJETA ARTICULO =====
function crearTarjetaArticulo(art) {
    const estadoClass = art.estado === "DISPONIBLE" ? "badge-disponible"
                      : art.estado === "VENDIDO" ? "badge-vendido" : "badge-intercambio";
    const imagen = getImagenArticulo(art);
    const usuario = getUsuarioActual();
    const esPropio = usuario && art.usuario && art.usuario.id === usuario.id;
    const esAdmin = isAdmin();

    let acciones = "";
    if (esPropio || esAdmin) {
        acciones = `
            <div class="d-flex gap-1">
                <a href="editar-articulo.html?id=${art.id}" class="btn btn-sm btn-outline-warning" onclick="event.stopPropagation();" title="Editar"><i class="fas fa-edit"></i></a>
                <button onclick="event.stopPropagation(); eliminarArticulo(${art.id})" class="btn btn-sm btn-outline-danger" title="Eliminar"><i class="fas fa-trash"></i></button>
            </div>`;
    } else if (art.estado === "VENDIDO") {
        acciones = `<button class="btn btn-sm btn-secondary" disabled><i class="fas fa-ban me-1"></i>Vendido</button>`;
    } else if (usuario) {
        acciones = `
            <div class="d-flex gap-1">
                <button onclick="event.stopPropagation(); agregarAlCarrito(${art.id})" class="btn btn-sm btn-accent" title="Comprar">
                    <i class="fas fa-cart-plus"></i>
                </button>
                <button onclick="event.stopPropagation(); proponerIntercambio(${art.id})" class="btn btn-sm btn-blue" title="Intercambiar">
                    <i class="fas fa-exchange-alt"></i>
                </button>
            </div>`;
    } else {
        acciones = `<a href="login.html" class="btn btn-sm btn-outline-secondary" onclick="event.stopPropagation();"><i class="fas fa-sign-in-alt me-1"></i>Entrar</a>`;
    }

    const vendedorNombre = art.usuario ? art.usuario.nombre : "Anonimo";
    const vendedorId = art.usuario ? art.usuario.id : "";
    const favBtn = usuario ? `
        <button onclick="event.stopPropagation(); toggleFavorito(${art.id}, this)" class="btn btn-sm btn-outline-danger fav-btn" id="fav-${art.id}" title="Agregar a favoritos">
            <i class="far fa-heart"></i>
        </button>` : "";

    return `
        <div class="col-md-6 col-lg-4 mb-4 fade-in">
            <div class="articulo-card" style="cursor:pointer;" onclick="window.location.href='detalle-articulo.html?id=${art.id}'">
                <div style="position:relative;">
                    <img src="${imagen}" class="card-img-top" alt="${art.nombre}" style="height:220px; object-fit:cover;" onerror="this.src='https://via.placeholder.com/400x220?text=CollectZone'">
                    <div style="position:absolute; top:10px; right:10px;" onclick="event.stopPropagation();">${favBtn}</div>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge-categoria">${art.categoria}</span>
                        <span class="badge-estado ${estadoClass}">${art.estado}</span>
                    </div>
                    <h5 class="card-title">${art.nombre}</h5>
                    <p class="text-muted small mb-2">${art.descripcion ? art.descripcion.substring(0, 80) + "..." : "Sin descripcion"}</p>
                    <p class="text-muted small mb-1">
                        <a href="perfil.html?id=${vendedorId}" class="text-decoration-none text-muted" onclick="event.stopPropagation();">
                            <i class="fas fa-user me-1"></i>${vendedorNombre}
                        </a>
                    </p>
                    <div class="d-flex justify-content-between align-items-center mt-3" onclick="event.stopPropagation();">
                        <span class="precio">${art.precio.toFixed(2)} EUR</span>
                        ${acciones}
                    </div>
                </div>
            </div>
        </div>`;
}

// ===== FILA TABLA =====
function crearFilaArticulo(art) {
    const estadoClass = art.estado === "DISPONIBLE" ? "badge-disponible"
                      : art.estado === "VENDIDO" ? "badge-vendido" : "badge-intercambio";
    const usuario = getUsuarioActual();
    const esPropio = usuario && art.usuario && art.usuario.id === usuario.id;
    const esAdmin = isAdmin();

    let acciones = "";
    if (esPropio || esAdmin) {
        acciones = `<a href="editar-articulo.html?id=${art.id}" class="btn btn-warning btn-sm me-1">Editar</a><button onclick="eliminarArticulo(${art.id})" class="btn btn-danger btn-sm">Eliminar</button>`;
    } else if (art.estado === "VENDIDO") {
        acciones = '<span class="badge bg-secondary">Vendido</span>';
    } else if (usuario) {
        acciones = `
            <button onclick="agregarAlCarrito(${art.id})" class="btn btn-sm btn-accent me-1"><i class="fas fa-cart-plus me-1"></i>Comprar</button>
            <button onclick="proponerIntercambio(${art.id})" class="btn btn-sm btn-blue"><i class="fas fa-exchange-alt me-1"></i>Intercambiar</button>`;
    } else {
        acciones = '<a href="login.html" class="btn btn-sm btn-outline-secondary">Iniciar sesion</a>';
    }

    return `
        <tr>
            <td><a href="detalle-articulo.html?id=${art.id}" class="text-decoration-none fw-bold" style="color: var(--primary);">${art.nombre}</a></td>
            <td><span class="badge-categoria">${art.categoria}</span></td>
            <td class="precio">${art.precio.toFixed(2)} EUR</td>
            <td><span class="badge-estado ${estadoClass}">${art.estado}</span></td>
            <td>${art.usuario ? `<a href="perfil.html?id=${art.usuario.id}" class="text-decoration-none" style="color:var(--primary);">${art.usuario.nombre}</a>` : "-"}</td>
            <td>${acciones}</td>
        </tr>`;
}

// ===== FAVORITOS =====
async function toggleFavorito(articuloId, btn) {
    const usuario = getUsuarioActual();
    if (!usuario) { alert("Inicia sesion para agregar favoritos"); return; }
    const icono = btn.querySelector("i");
    const esFav = icono.classList.contains("fas");
    try {
        if (esFav) {
            await FavoritoAPI.eliminar(usuario.id, articuloId);
            icono.classList.remove("fas"); icono.classList.add("far");
            btn.title = "Agregar a favoritos";
        } else {
            await FavoritoAPI.agregar(usuario.id, articuloId);
            icono.classList.remove("far"); icono.classList.add("fas");
            btn.title = "Quitar de favoritos";
        }
    } catch(e) { alert("Error: " + e.message); }
}

async function cargarEstadoFavoritos() {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    try {
        const favoritos = await FavoritoAPI.obtenerDeUsuario(usuario.id);
        const ids = favoritos.map(f => f.articulo.id);
        ids.forEach(id => {
            const btn = document.getElementById("fav-" + id);
            if (btn) {
                const icono = btn.querySelector("i");
                icono.classList.remove("far"); icono.classList.add("fas");
                btn.title = "Quitar de favoritos";
            }
        });
    } catch(e) {}
}

async function cargarMisFavoritos() {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    try {
        const favoritos = await FavoritoAPI.obtenerDeUsuario(usuario.id);
        const container = document.getElementById("articulosContainer");
        if (!container) return;
        container.innerHTML = "";
        if (favoritos.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="far fa-heart fa-3x text-muted d-block mb-3"></i>
                    <h4 class="text-muted">No tienes favoritos</h4>
                    <a href="articulos.html" class="btn-accent mt-3">Explorar</a>
                </div>`;
            return;
        }
        favoritos.forEach(fav => { container.innerHTML += crearTarjetaArticulo(fav.articulo); });
        setTimeout(() => cargarEstadoFavoritos(), 100);
    } catch(e) { console.error(e); }
}

// ===== MIS ARTICULOS =====
async function cargarMisArticulos() {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    try {
        const articulos = await ArticuloAPI.obtenerPorUsuario(usuario.id);
        if (document.getElementById("misStats")) {
            const disp = articulos.filter(a => a.estado === "DISPONIBLE").length;
            const vend = articulos.filter(a => a.estado === "VENDIDO").length;
            const inter = articulos.filter(a => a.estado === "INTERCAMBIO").length;
            const valor = articulos.reduce((s, a) => s + a.precio, 0);
            document.getElementById("misTotalArticulos").textContent = articulos.length;
            document.getElementById("misDisponibles").textContent = disp;
            document.getElementById("misVendidos").textContent = vend;
            document.getElementById("misIntercambios").textContent = inter;
            document.getElementById("misValorTotal").textContent = valor.toFixed(2) + " EUR";
        }
        const container = document.getElementById("articulosContainer");
        if (!container) return;
        container.innerHTML = "";
        if (articulos.length === 0) {
            container.innerHTML = `<div class="col-12 text-center py-5"><i class="fas fa-box-open fa-3x text-muted d-block mb-3"></i><h4 class="text-muted">No tienes articulos</h4><a href="crear-articulo.html" class="btn-accent mt-3">Publicar</a></div>`;
            return;
        }
        articulos.forEach(art => { container.innerHTML += crearTarjetaArticulo(art); });
    } catch(e) { console.error(e); }
}

// ===== DETALLE ARTICULO =====
async function cargarDetalleArticulo() {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return;
    try {
        const art = await ArticuloAPI.obtenerPorId(id);
        const container = document.getElementById("detalleContainer");
        if (!container) return;
        const estadoClass = art.estado === "DISPONIBLE" ? "badge-disponible" : art.estado === "VENDIDO" ? "badge-vendido" : "badge-intercambio";
        const imagen = getImagenArticulo(art);
        const vendedor = art.usuario ? art.usuario.nombre : "Anonimo";
        const vendedorId = art.usuario ? art.usuario.id : "";
        const fecha = art.fechaPublicacion ? new Date(art.fechaPublicacion).toLocaleDateString("es-ES") : "-";
        const inicial = vendedor.charAt(0).toUpperCase();
        const usuario = getUsuarioActual();
        const esPropio = usuario && art.usuario && art.usuario.id === usuario.id;
        const esAdmin = isAdmin();

        let totalFavs = 0;
        try { totalFavs = await FavoritoAPI.contarFavoritos(id); } catch(e) {}
        let esFav = false;
        if (usuario) { try { esFav = await FavoritoAPI.esFavorito(usuario.id, id); } catch(e) {} }
        const favIcon = esFav ? "fas" : "far";

        let botones = "";
        if (esPropio || esAdmin) {
            botones = `<div class="d-flex gap-2 mt-3"><a href="editar-articulo.html?id=${art.id}" class="btn-accent flex-grow-1 text-center"><i class="fas fa-edit me-2"></i>Editar</a><button onclick="eliminarArticulo(${art.id})" class="btn btn-outline-danger px-4"><i class="fas fa-trash me-2"></i>Eliminar</button></div>`;
        } else if (art.estado === "VENDIDO") {
            botones = `<button class="btn btn-secondary w-100 mt-3" disabled><i class="fas fa-ban me-2"></i>Articulo vendido</button>`;
        } else if (usuario) {
            botones = `
                <div class="d-flex gap-2 mt-3">
                    <button onclick="agregarAlCarrito(${art.id})" class="btn-accent flex-grow-1"><i class="fas fa-cart-plus me-2"></i>Comprar</button>
                    <button onclick="proponerIntercambio(${art.id})" class="btn-blue flex-grow-1"><i class="fas fa-exchange-alt me-2"></i>Intercambiar</button>
                </div>`;
        }

        const favButton = usuario ? `<button onclick="toggleFavorito(${art.id}, this)" class="btn-outline-spider w-100 mt-3" id="fav-${art.id}"><i class="${favIcon} fa-heart me-2"></i>${esFav ? "Quitar de favoritos" : "Agregar a favoritos"}</button>` : "";

        container.innerHTML = `
            <div class="col-lg-6 fade-in">
                <div class="detalle-imagen"><img src="${imagen}" alt="${art.nombre}" onerror="this.src='https://via.placeholder.com/600x400?text=CollectZone'"></div>
            </div>
            <div class="col-lg-6 slide-in-left">
                <div class="detalle-info">
                    <div class="d-flex gap-2 mb-3"><span class="badge-categoria">${art.categoria}</span><span class="badge-estado ${estadoClass}">${art.estado}</span></div>
                    <h2 class="fw-bold mb-3" style="color:var(--primary);">${art.nombre}</h2>
                    <p class="detalle-precio mb-3">${art.precio.toFixed(2)} EUR</p>
                    <p class="text-muted">${art.descripcion || "Sin descripcion"}</p>
                    <p class="text-muted small"><i class="fas fa-calendar me-1"></i>${fecha}<span class="ms-3"><i class="fas fa-heart me-1" style="color:var(--accent);"></i>${totalFavs} favoritos</span></p>
                    <div class="detalle-vendedor" style="cursor:pointer;" onclick="verPerfilUsuario(${vendedorId})">
                        <div class="d-flex align-items-center gap-3">
                            <div style="width:50px;height:50px;border-radius:50%;background:var(--accent);color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.2rem;">${inicial}</div>
                            <div class="flex-grow-1">
                                <h6 class="fw-bold mb-0" style="color:var(--primary);">${vendedor}</h6>
                                <small class="text-muted">Ver perfil <i class="fas fa-arrow-right ms-1"></i></small>
                            </div>
                        </div>
                    </div>
                    ${favButton}
                    ${botones}
                </div>
            </div>`;
        document.title = art.nombre + " - CollectZone";
    } catch(e) { console.error(e); }
}

// ===== PERFIL =====
async function cargarPerfil() {
    let id = new URLSearchParams(window.location.search).get("id");
    const usuarioActual = getUsuarioActual();
    if (!id && usuarioActual) { id = usuarioActual.id; window.history.replaceState(null, "", "perfil.html?id=" + id); }
    if (!id) return;
    try {
        const usuario = await UsuarioAPI.obtenerPorId(id);
        const articulos = await ArticuloAPI.obtenerPorUsuario(id);
        document.getElementById("perfilAvatar").textContent = usuario.nombre.charAt(0).toUpperCase();
        document.getElementById("perfilNombre").textContent = usuario.nombre;
        document.getElementById("perfilEmail").textContent = usuario.email;
        document.getElementById("perfilRol").textContent = usuario.rol;
        document.getElementById("perfilTotalArticulos").textContent = articulos.length;
        document.getElementById("perfilVendidos").textContent = articulos.filter(a => a.estado === "VENDIDO").length;
        document.getElementById("perfilIntercambios").textContent = articulos.filter(a => a.estado === "INTERCAMBIO").length;
        const editSection = document.getElementById("editarPerfilSection");
        if (editSection && usuarioActual && usuarioActual.id == id) {
            editSection.style.display = "block";
            document.getElementById("editNombre").value = usuario.nombre;
            document.getElementById("editEmail").value = usuario.email;
        }
        const container = document.getElementById("articulosContainer");
        if (container) {
            container.innerHTML = "";
            if (articulos.length === 0) {
                container.innerHTML = '<div class="col-12 text-center py-4"><p class="text-muted">Sin articulos publicados</p></div>';
                return;
            }
            articulos.forEach(art => { container.innerHTML += crearTarjetaArticulo(art); });
        }
        document.title = usuario.nombre + " - CollectZone";
    } catch(e) { console.error(e); }
}

async function guardarPerfil(event) {
    event.preventDefault();
    const usuario = getUsuarioActual();
    if (!usuario) return;
    const datos = {
        nombre: document.getElementById("editNombre").value,
        email: document.getElementById("editEmail").value,
        password: document.getElementById("editPassword").value
    };
    try {
        await UsuarioAPI.actualizarPerfil(usuario.id, datos);
        const actualizado = { ...usuario, nombre: datos.nombre, email: datos.email };
        localStorage.setItem("usuario", JSON.stringify(actualizado));
        alert("Perfil actualizado correctamente");
        location.reload();
    } catch(e) {
        alert("Error: " + e.message);
    }
}

// ===== RANKING =====
async function cargarRanking() {
    try {
        const [articulos, usuarios] = await Promise.all([ArticuloAPI.obtenerTodos(), UsuarioAPI.obtenerTodos()]);
        const conteo = {}, ventas = {};
        articulos.forEach(art => {
            if (art.usuario) {
                const uid = art.usuario.id;
                conteo[uid] = (conteo[uid] || 0) + 1;
                if (art.estado === "VENDIDO" || art.estado === "INTERCAMBIO") ventas[uid] = (ventas[uid] || 0) + 1;
            }
        });
        const rankPub = usuarios.map(u => ({ ...u, total: conteo[u.id] || 0 })).sort((a, b) => b.total - a.total).slice(0, 10);
        const rankVend = usuarios.map(u => ({ ...u, total: ventas[u.id] || 0 })).sort((a, b) => b.total - a.total).slice(0, 10);
        renderRanking("rankingPublicadores", rankPub, "articulos");
        renderRanking("rankingVendedores", rankVend, "ventas");
    } catch(e) { console.error(e); }
}

function renderRanking(containerId, ranking, label) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (ranking.length === 0) { container.innerHTML = '<div class="p-4 text-center text-muted">Sin datos</div>'; return; }
    container.innerHTML = ranking.map((user, i) => {
        const posClass = i === 0 ? "ranking-1" : i === 1 ? "ranking-2" : i === 2 ? "ranking-3" : "ranking-other";
        const icon = i === 0 ? '<i class="fas fa-crown"></i>' : (i + 1);
        const inicial = user.nombre.charAt(0).toUpperCase();
        return `
            <div class="d-flex align-items-center gap-3 p-3 ${i < ranking.length - 1 ? 'border-bottom' : ''}" style="cursor:pointer;" onclick="verPerfilUsuario(${user.id})">
                <div class="ranking-position ${posClass}">${icon}</div>
                <div style="width:40px;height:40px;border-radius:50%;background:var(--secondary);color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">${inicial}</div>
                <div class="flex-grow-1"><span class="fw-bold" style="color:var(--primary);">${user.nombre}</span><br><small class="text-muted">${user.email}</small></div>
                <div class="text-end"><span class="fw-bold" style="color:var(--accent);font-size:1.3rem;">${user.total}</span><br><small class="text-muted">${label}</small></div>
            </div>`;
    }).join("");
}

// ===== ADMIN =====
async function cargarStatsAdmin() {
    try {
        const [articulos, usuarios] = await Promise.all([ArticuloAPI.obtenerTodos(), UsuarioAPI.obtenerTodos()]);
        const el = document.getElementById("adminStats");
        if (!el) return;
        const disp = articulos.filter(a => a.estado === "DISPONIBLE").length;
        const vend = articulos.filter(a => a.estado === "VENDIDO").length;
        const inter = articulos.filter(a => a.estado === "INTERCAMBIO").length;
        el.innerHTML = `
            <div class="col-md-3 col-6"><div class="perfil-stat"><div class="number">${usuarios.length}</div><div class="label">Usuarios</div></div></div>
            <div class="col-md-3 col-6"><div class="perfil-stat"><div class="number">${articulos.length}</div><div class="label">Articulos</div></div></div>
            <div class="col-md-3 col-6"><div class="perfil-stat" style="border-left:3px solid var(--success);"><div class="number" style="color:var(--success);">${disp}</div><div class="label">Disponibles</div></div></div>
            <div class="col-md-3 col-6"><div class="perfil-stat" style="border-left:3px solid var(--accent);"><div class="number">${vend + inter}</div><div class="label">Vendidos/Inter.</div></div></div>`;
    } catch(e) { console.error(e); }
}

async function cargarUsuarios() {
    try {
        const usuarios = await UsuarioAPI.obtenerTodos();
        const tabla = document.getElementById("tablaUsuarios");
        if (!tabla) return;
        tabla.innerHTML = "";
        usuarios.forEach(u => {
            tabla.innerHTML += `
                <tr>
                    <td>${u.id}</td>
                    <td><a href="perfil.html?id=${u.id}" class="text-decoration-none fw-bold" style="color:var(--primary);">${u.nombre}</a></td>
                    <td>${u.email}</td>
                    <td><span class="badge ${u.rol === 'ADMIN' ? 'bg-danger' : 'bg-primary'}">${u.rol}</span></td>
                    <td>${u.fechaRegistro ? new Date(u.fechaRegistro).toLocaleDateString() : '-'}</td>
                    <td><button onclick="eliminarUsuario(${u.id})" class="btn btn-danger btn-sm"><i class="fas fa-trash me-1"></i>Eliminar</button></td>
                </tr>`;
        });
    } catch(e) { console.error(e); }
}

async function eliminarUsuario(id) {
    const ok = await czConfirm("Eliminar usuario y todos sus datos?", "Eliminar usuario");
    if (!ok) return;
    try { await UsuarioAPI.eliminar(id); alert("Usuario eliminado"); location.reload(); }
    catch(e) { alert("Error: " + e.message); }
}

// ===== CRUD ARTICULOS =====
async function guardarArticulo(event) {
    event.preventDefault();
    const usuario = getUsuarioActual();
    if (!usuario) { alert("Debes iniciar sesion"); window.location.href = "login.html"; return; }
    const articulo = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: parseFloat(document.getElementById("precio").value),
        categoria: document.getElementById("categoria").value,
        estado: document.getElementById("estado")?.value || "DISPONIBLE",
        imagenUrl: document.getElementById("imagenUrl")?.value || "",
        usuario: { id: usuario.id }
    };
    try {
        await ArticuloAPI.crear(articulo);
        alert("Articulo publicado");
        window.location.href = "mis-articulos.html";
    } catch(e) { alert("Error: " + e.message); }
}

async function actualizarArticulo(event) {
    event.preventDefault();
    const id = new URLSearchParams(window.location.search).get("id");
    const articulo = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: parseFloat(document.getElementById("precio").value),
        categoria: document.getElementById("categoria").value,
        estado: document.getElementById("estado").value,
        imagenUrl: document.getElementById("imagenUrl")?.value || ""
    };
    try { await ArticuloAPI.actualizar(id, articulo); alert("Articulo actualizado"); window.location.href = "mis-articulos.html"; }
    catch(e) { alert("Error: " + e.message); }
}

async function cargarArticuloParaEditar() {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return;
    try {
        const art = await ArticuloAPI.obtenerPorId(id);
        document.getElementById("nombre").value = art.nombre;
        document.getElementById("descripcion").value = art.descripcion || "";
        document.getElementById("precio").value = art.precio;
        document.getElementById("categoria").value = art.categoria;
        document.getElementById("estado").value = art.estado;
        if (document.getElementById("imagenUrl")) document.getElementById("imagenUrl").value = art.imagenUrl || "";
    } catch(e) { console.error(e); }
}

async function eliminarArticulo(id) {
    const ok = await czConfirm("Eliminar este articulo?", "Eliminar articulo");
    if (!ok) return;
    try { await ArticuloAPI.eliminar(id); alert("Articulo eliminado"); location.reload(); }
    catch(e) { alert("Error: " + e.message); }
}

// ===== LOGIN/REGISTRO =====
async function iniciarSesion(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");
    if (loginError) loginError.classList.add("d-none");
    try {
        const data = await AuthAPI.login(email, password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        window.location.href = "index.html";
    } catch(e) {
        if (loginError) loginError.classList.remove("d-none");
        else alert("Error: " + e.message);
    }
}

async function registrarUsuario(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (nombre.length < 2) { alert("Nombre: minimo 2 caracteres"); return; }
    if (password.length < 6) { alert("Contrasena: minimo 6 caracteres"); return; }
    try {
        const data = await AuthAPI.registro({ nombre, email, password });
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            window.location.href = "index.html";
        } else {
            alert("Cuenta creada. Inicia sesion.");
            window.location.href = "login.html";
        }
    } catch(e) { alert("Error: " + e.message); }
}

// ===== CARRITO =====
async function actualizarContadorCarrito() {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    try {
        const total = await CarritoAPI.contar(usuario.id);
        const badge = document.getElementById("carritoCount");
        if (badge) { badge.textContent = total; badge.style.display = total > 0 ? "inline-block" : "none"; }
    } catch(e) {}
}

async function agregarAlCarrito(articuloId) {
    const usuario = getUsuarioActual();
    if (!usuario) { alert("Inicia sesion para comprar"); window.location.href = "login.html"; return; }
    try {
        await CarritoAPI.agregar(usuario.id, articuloId);
        alert("Articulo agregado al carrito");
        actualizarContadorCarrito();
    } catch(e) { alert("Error: " + e.message); }
}

async function eliminarDelCarrito(articuloId) {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    try { await CarritoAPI.eliminar(usuario.id, articuloId); cargarCarrito(); actualizarContadorCarrito(); }
    catch(e) { alert("Error: " + e.message); }
}

async function cargarCarrito() {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    try {
        const items = await CarritoAPI.obtener(usuario.id);
        const container = document.getElementById("carritoItems");
        const totalEl = document.getElementById("carritoTotal");
        const checkoutBtn = document.getElementById("checkoutBtn");
        if (!container) return;
        container.innerHTML = "";
        if (items.length === 0) {
            container.innerHTML = `<div class="text-center py-5"><i class="fas fa-shopping-cart fa-3x text-muted d-block mb-3"></i><h4 class="text-muted">Carrito vacio</h4><a href="articulos.html" class="btn-accent mt-3">Explorar</a></div>`;
            if (totalEl) totalEl.textContent = "0.00 EUR";
            if (checkoutBtn) checkoutBtn.style.display = "none";
            return;
        }
        let total = 0;
        items.forEach(item => {
            const art = item.articulo;
            total += art.precio;
            const img = getImagenArticulo(art);
            container.innerHTML += `
                <div class="d-flex align-items-center gap-3 p-3 mb-2 fade-in" style="background:var(--white);border-radius:12px;box-shadow:var(--card-shadow);">
                    <img src="${img}" alt="${art.nombre}" style="width:80px;height:80px;object-fit:cover;border-radius:10px;" onerror="this.src='https://via.placeholder.com/80x80?text=CZ'">
                    <div class="flex-grow-1">
                        <h6 class="fw-bold mb-1"><a href="detalle-articulo.html?id=${art.id}" class="text-decoration-none" style="color:var(--primary);">${art.nombre}</a></h6>
                        <span class="badge-categoria">${art.categoria}</span>
                    </div>
                    <div class="text-end">
                        <span class="precio d-block">${art.precio.toFixed(2)} EUR</span>
                        <button onclick="eliminarDelCarrito(${art.id})" class="btn btn-sm btn-outline-danger mt-1"><i class="fas fa-trash"></i></button>
                    </div>
                </div>`;
        });
        if (totalEl) totalEl.textContent = total.toFixed(2) + " EUR";
        if (checkoutBtn) checkoutBtn.style.display = "block";
    } catch(e) { console.error(e); }
}

async function procesarCheckout() {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    const ok = await czConfirm("Confirmar compra?", "Procesar compra");
    if (!ok) return;
    try {
        const data = await CarritoAPI.checkout(usuario.id);
        alert("Compra realizada. " + (data.totalCompras || "") + " articulo(s).");
        cargarCarrito();
        actualizarContadorCarrito();
    } catch(e) { alert("Error: " + e.message); }
}

async function cargarHistorialCompras() {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    try {
        const compras = await CarritoAPI.historial(usuario.id);
        const container = document.getElementById("historialCompras");
        if (!container) return;
        container.innerHTML = "";
        if (compras.length === 0) {
            container.innerHTML = '<div class="text-center py-4"><p class="text-muted">Sin compras</p></div>';
            return;
        }
        compras.forEach(c => {
            const art = c.articulo;
            const fecha = new Date(c.fechaCompra).toLocaleDateString("es-ES");
            const img = getImagenArticulo(art);
            container.innerHTML += `
                <div class="d-flex align-items-center gap-3 p-3 mb-2" style="background:var(--white);border-radius:12px;box-shadow:var(--card-shadow);">
                    <img src="${img}" alt="${art.nombre}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;" onerror="this.src='https://via.placeholder.com/60x60?text=CZ'">
                    <div class="flex-grow-1"><h6 class="fw-bold mb-0" style="color:var(--primary);">${art.nombre}</h6><small class="text-muted"><i class="fas fa-calendar me-1"></i>${fecha}</small></div>
                    <span class="precio">${c.precioCompra.toFixed(2)} EUR</span>
                </div>`;
        });
    } catch(e) { console.error(e); }
}

// ===== INTERCAMBIOS =====
async function proponerIntercambio(articuloDeseadoId) {
    const usuario = getUsuarioActual();
    if (!usuario) { alert("Inicia sesion"); window.location.href = "login.html"; return; }
    try {
        const misArticulos = await ArticuloAPI.obtenerPorUsuario(usuario.id);
        const disponibles = misArticulos.filter(a => a.estado === "DISPONIBLE" || a.estado === "INTERCAMBIO");
        if (disponibles.length === 0) { alert("No tienes articulos para ofrecer. Publica uno primero."); return; }

        let modalHTML = `
            <div class="modal fade" id="modalIntercambio" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" style="border:none;border-radius:16px;border-top:4px solid var(--blue);">
                        <div class="modal-header" style="border:none;">
                            <h5 class="modal-title fw-bold" style="color:var(--primary);"><i class="fas fa-exchange-alt me-2" style="color:var(--blue);"></i>Proponer intercambio</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p class="text-muted mb-3">Selecciona que ofrecer:</p>
                            <div style="max-height:300px;overflow-y:auto;">`;
        disponibles.forEach(art => {
            const img = getImagenArticulo(art);
            modalHTML += `
                <div class="d-flex align-items-center gap-3 p-2 mb-2 rounded" style="border:2px solid var(--gray-light);cursor:pointer;" onclick="seleccionarArticuloIntercambio(${articuloDeseadoId}, ${art.id}, this)">
                    <img src="${img}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;" onerror="this.src='https://via.placeholder.com/50x50?text=CZ'">
                    <div class="flex-grow-1"><strong style="color:var(--primary);">${art.nombre}</strong><br><small class="text-muted">${art.categoria} - ${art.precio.toFixed(2)} EUR</small></div>
                    <i class="fas fa-arrow-right" style="color:var(--gray);"></i>
                </div>`;
        });
        modalHTML += `</div><div class="mt-3"><label class="form-label fw-semibold small">Mensaje (opcional)</label><textarea id="mensajeIntercambio" class="form-control" rows="2" placeholder="Ej: Me interesa mucho tu articulo..."></textarea></div></div></div></div></div>`;

        const prev = document.getElementById("modalIntercambio");
        if (prev) prev.remove();
        document.body.insertAdjacentHTML("beforeend", modalHTML);
        new bootstrap.Modal(document.getElementById("modalIntercambio")).show();
    } catch(e) { alert("Error: " + e.message); }
}

async function seleccionarArticuloIntercambio(articuloDeseadoId, articuloOfrecidoId, element) {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    element.style.borderColor = "var(--blue)";
    element.style.background = "rgba(26,58,138,0.05)";
    const mensaje = document.getElementById("mensajeIntercambio")?.value || "";
    const ok = await czConfirm("Enviar propuesta de intercambio?", "Confirmar intercambio");
    if (!ok) return;
    try {
        await IntercambioAPI.proponer(usuario.id, articuloDeseadoId, articuloOfrecidoId, mensaje);
        alert("Propuesta enviada");
        bootstrap.Modal.getInstance(document.getElementById("modalIntercambio")).hide();
    } catch(e) { alert("Error: " + e.message); }
}

async function cargarIntercambiosRecibidos() {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    try {
        const intercambios = await IntercambioAPI.recibidos(usuario.id);
        const container = document.getElementById("intercambiosRecibidos");
        if (!container) return;
        container.innerHTML = "";
        if (intercambios.length === 0) { container.innerHTML = '<div class="text-center py-4"><p class="text-muted">Sin propuestas</p></div>'; return; }
        intercambios.forEach(i => { container.innerHTML += renderInterCard(i, true); });
    } catch(e) { console.error(e); }
}

async function cargarIntercambiosEnviados() {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    try {
        const intercambios = await IntercambioAPI.enviados(usuario.id);
        const container = document.getElementById("intercambiosEnviados");
        if (!container) return;
        container.innerHTML = "";
        if (intercambios.length === 0) { container.innerHTML = '<div class="text-center py-4"><p class="text-muted">Sin propuestas enviadas</p></div>'; return; }
        intercambios.forEach(i => { container.innerHTML += renderInterCard(i, false); });
    } catch(e) { console.error(e); }
}

function renderInterCard(inter, recibido) {
    const estadoClass = inter.estado === "PENDIENTE" ? "badge bg-warning text-dark" : inter.estado === "ACEPTADO" ? "badge bg-success" : "badge bg-danger";
    const imgD = getImagenArticulo(inter.articuloDeseado);
    const imgO = getImagenArticulo(inter.articuloOfrecido);
    const fecha = new Date(inter.fechaSolicitud).toLocaleDateString("es-ES");
    const botones = (recibido && inter.estado === "PENDIENTE") ? `
        <div class="d-flex gap-2 mt-3">
            <button onclick="responderIntercambio(${inter.id}, 'aceptar')" class="btn btn-sm btn-success flex-grow-1"><i class="fas fa-check me-1"></i>Aceptar</button>
            <button onclick="responderIntercambio(${inter.id}, 'rechazar')" class="btn btn-sm btn-outline-danger flex-grow-1"><i class="fas fa-times me-1"></i>Rechazar</button>
        </div>` : "";
    return `
        <div class="p-3 mb-3 fade-in" style="background:var(--white);border-radius:12px;box-shadow:var(--card-shadow);border-left:4px solid ${inter.estado === 'PENDIENTE' ? 'var(--gold)' : inter.estado === 'ACEPTADO' ? 'var(--success)' : 'var(--accent)'};">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <div>${recibido ? `<strong style="color:var(--primary);">${inter.solicitante.nombre}</strong>` : ''}<span class="text-muted small ms-2">${fecha}</span></div>
                <span class="${estadoClass}">${inter.estado}</span>
            </div>
            <div class="d-flex align-items-center gap-3">
                <div class="text-center"><img src="${imgO}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;"><br><small class="fw-semibold">${inter.articuloOfrecido.nombre}</small></div>
                <i class="fas fa-exchange-alt fa-lg" style="color:var(--blue);"></i>
                <div class="text-center"><img src="${imgD}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;"><br><small class="fw-semibold">${inter.articuloDeseado.nombre}</small></div>
            </div>
            ${inter.mensaje ? `<p class="text-muted small mt-2 mb-0"><i class="fas fa-comment me-1"></i>"${inter.mensaje}"</p>` : ""}
            ${botones}
        </div>`;
}

async function responderIntercambio(intercambioId, accion) {
    const usuario = getUsuarioActual();
    if (!usuario) return;
    const msg = accion === "aceptar" ? "Aceptar intercambio? Los articulos cambiaran de dueno." : "Rechazar propuesta?";
    const ok = await czConfirm(msg, accion === "aceptar" ? "Aceptar intercambio" : "Rechazar intercambio");
    if (!ok) return;
    try {
        accion === "aceptar"
            ? await IntercambioAPI.aceptar(intercambioId, usuario.id)
            : await IntercambioAPI.rechazar(intercambioId, usuario.id);
        alert(accion === "aceptar" ? "Intercambio aceptado" : "Intercambio rechazado");
        cargarIntercambiosRecibidos();
    } catch(e) { alert("Error: " + e.message); }
}

// ===== TOAST / CONFIRM CUSTOM =====
function czToast(msg, type = "info", title = null) {
    let cont = document.getElementById("czToastContainer");
    if (!cont) {
        cont = document.createElement("div");
        cont.id = "czToastContainer";
        document.body.appendChild(cont);
    }
    const icons = { success: "fa-check", error: "fa-triangle-exclamation", info: "fa-circle-info", warning: "fa-bell" };
    const titles = { success: "Exito", error: "Error", info: "Aviso", warning: "Atencion" };
    const t = document.createElement("div");
    t.className = `cz-toast ${type}`;
    t.innerHTML = `
        <div class="cz-icon"><i class="fas ${icons[type] || icons.info}"></i></div>
        <div class="cz-body">
            <div class="cz-title">${title || titles[type] || "Aviso"}</div>
            <div class="cz-msg">${msg}</div>
        </div>
        <button class="cz-close" onclick="this.parentElement.classList.add('hide'); setTimeout(()=>this.parentElement.remove(),350)">
            <i class="fas fa-xmark"></i>
        </button>`;
    cont.appendChild(t);
    setTimeout(() => { t.classList.add("hide"); setTimeout(() => t.remove(), 350); }, 3500);
}

function czConfirm(msg, title = "Confirmar accion") {
    return new Promise(resolve => {
        const bd = document.createElement("div");
        bd.className = "cz-confirm-backdrop";
        bd.innerHTML = `
            <div class="cz-confirm-box">
                <i class="fas fa-question-circle"></i>
                <h5>${title}</h5>
                <p>${msg}</p>
                <div class="d-flex">
                    <button class="btn-outline-spider" id="czNo">Cancelar</button>
                    <button class="btn-accent" id="czYes">Confirmar</button>
                </div>
            </div>`;
        document.body.appendChild(bd);
        bd.querySelector("#czYes").onclick = () => { bd.remove(); resolve(true); };
        bd.querySelector("#czNo").onclick  = () => { bd.remove(); resolve(false); };
        bd.onclick = e => { if (e.target === bd) { bd.remove(); resolve(false); } };
    });
}

// ===== OVERRIDE ALERT Y CONFIRM NATIVOS =====
window.alert = (msg) => {
    const low = String(msg).toLowerCase();
    if (
        low.includes("error") ||
        low.includes("inicia sesion") ||
        low.includes("denegado") ||
        low.includes("minimo") ||
        low.includes("no tienes") ||
        low.includes("debes")
    ) {
        czToast(msg, "error");
    } else if (
        low.includes("publicad") ||
        low.includes("actualizad") ||
        low.includes("eliminad") ||
        low.includes("agregad") ||
        low.includes("enviad") ||
        low.includes("realizad") ||
        low.includes("aceptad") ||
        low.includes("rechazad") ||
        low.includes("correcto") ||
        low.includes("creada") ||
        low.includes("compra") ||
        low.includes("articulo publicado") ||
        low.includes("cuenta creada")
    ) {
        czToast(msg, "success");
    } else {
        czToast(msg, "info");
    }
};