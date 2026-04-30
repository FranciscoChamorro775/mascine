**Nombre provisional del proyecto.**





Mascine\*









**Frase resumen.**





Mascine es una web donde el usuario puede ver la cartelera, consultar un calendario de estrenos y encontrar los cines más cercanos usando Google Maps.









**Tipo de usuario.**





Usuario registrado que guarda favoritos.









**Lista de funcionalidades mínimas y extras.**





Ver listado de películas en cartelera.



Ver un calendario con fechas de estrenos o sesiones.



Ver cines cercanos en un mapa según mi ubicación.



Ver ficha de una película (sinopsis, duración, etc.).





\*\*\*extra



Login/registro.



Favoritos.



Notificaciones de próximos estrenos.



































🧩 1️⃣ Definir los módulos principales de Mascine





A partir de tus funcionalidades, Mascine se puede dividir en 4 módulos base:







**Módulo 1 — Cartelera**



Lista de películas.



Filtros (género, fecha, popularidad).



Acceso a la ficha de cada película.





**Módulo 2 — Calendario**



Calendario mensual/semanal.



Fechas de estrenos o sesiones.



Clic en un día → muestra películas o eventos.





**Módulo 3 — Cines cercanos**



Mapa con tu ubicación.



Marcadores de cines cercanos.



Información básica del cine (dirección, horarios si los hubiera).





**Módulo 4 — Ficha de película**



Sinopsis.



Duración.



Género.



Tráiler (YouTube embed).



Botón “Añadir a favoritos”.









⭐ 2️⃣ Módulos extra (si llegas)



Módulo 5 — Autenticación



Registro.



Login.



Logout.







Módulo 6 — Favoritos



Lista de películas guardadas.



Quitar de favoritos.







Módulo 7 — Notificaciones



Aviso de próximos estrenos.



Configuración de alertas.













🖥️ 3️⃣ Definir las pantallas (vistas) de la web

Esto es lo que realmente vería el usuario.

Con tu proyecto, las pantallas mínimas serían:



**Pantallas principales**

**Inicio / Cartelera**



**Calendario**



**Mapa de cines cercanos**



**Ficha de película**



**Pantallas extra**

**Login**



**Registro**



**Favoritos**











🔄 Versión mejorada del mapa de navegación





Login → Registro



Y también debe existir el camino inverso:



Registro → Login



Porque siempre hay un enlace tipo “¿Ya tienes cuenta? Inicia sesión”.









🏠 Inicio → … (varios destinos)







Inicio → Cartelera

(Realmente Inicio es la cartelera, pero lo dejamos claro)





Inicio → Calendario

Correcto.





Inicio → Mapa de cines cercanos

Perfecto.





Inicio → Favoritos



Sí, pero solo si el usuario está logueado.

Si no, lo llevas a Login.









⭐ Favoritos → Ficha







Cartelera → Ficha



Calendario → Ficha



Mapa de cines → Ficha



Porque desde cualquier parte deberías poder abrir una película.







🎬 Ficha → …

Aquí añadiría:







Ficha → Favoritos

(para añadir o quitar)





Ficha → Inicio

(botón “volver” o logo)









**Login → Registro**

**Registro → Login**



**Inicio → Cartelera**

**Inicio → Calendario**

**Inicio → Mapa de cines**

**Inicio → Favoritos (si no está logueado → Login)**



**Cartelera → Ficha**

**Calendario → Ficha**

**Mapa de cines → Ficha**

**Favoritos → Ficha**



**Ficha → Favoritos**

**Ficha → Inicio**















**WIREFRAME:**



**Wireframe 1 — Pantalla de Inicio / Cartelera**  Menú arriba (horizontal)

Más clásico, limpio y fácil de defender en un TFG.



Código

---------------------------------------------------------

| LOGO Mascine\* | Cartelera | Calendario | Cines | Favoritos | Login |

---------------------------------------------------------



|  Buscar \[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_]                           |

---------------------------------------------------------



|  Películas en cartelera                                  |

|                                                          |

|  \[Poster]  Título película 1   ★ Valoración              |

|  \[Poster]  Título película 2   ★ Valoración              |

|  \[Poster]  Título película 3   ★ Valoración              |

|  ...                                                      |

---------------------------------------------------------















**Wireframe 2 — Calendario**

Código

---------------------------------------------------------

| LOGO Mascine\*                 |  Buscar \[\_\_\_\_]  | User |

---------------------------------------------------------



|   < Mes anterior     Enero 2026     Mes siguiente >     |

---------------------------------------------------------



|  L   M   X   J   V   S   D                                 |

|  1   2   3   4   5   6   7                                 |

|  8   9   10  11  12  13  14                                |

|  ...                                                       |

---------------------------------------------------------



|  Al hacer clic en un día:                                  |

|  Estrenos del día:                                         |

|   - Película A (ver ficha)                                 |

|   - Película B (ver ficha)                                 |

---------------------------------------------------------











**Wireframe 3 — Mapa de Cines Cercanos**

Código

---------------------------------------------------------

| LOGO Mascine\*                 |  Buscar \[\_\_\_\_]  | User |

---------------------------------------------------------



|  \[MAPA OCUPANDO TODA LA PANTALLA]                         |

|   - Marcador: Cine 1                                      |

|   - Marcador: Cine 2                                      |

|   - Marcador: Cine 3                                      |

---------------------------------------------------------



|  Al pulsar un cine:                                       |

|   Nombre del cine                                          |

|   Dirección                                                |

|   Botón: Ver en Google Maps                                |

---------------------------------------------------------













**Wireframe 4 — Ficha de Película**

Código

---------------------------------------------------------

| LOGO Mascine\*                 |  Buscar \[\_\_\_\_]  | User |

---------------------------------------------------------



| \[Poster grande]                                            |

---------------------------------------------------------



| Título de la película                                      |

| Duración | Género | Año                                    |

| ★ Valoración                                               |

---------------------------------------------------------



| Sinopsis:                                                  |

| ...                              |

---------------------------------------------------------



| Tráiler (YouTube embed)                                    |

---------------------------------------------------------



| Botón: Añadir a Favoritos / Quitar de Favoritos            |

---------------------------------------------------------











**Wireframe 5 — Login**

Código

---------------------------------------------------------

| LOGO Mascine\*                                              |

---------------------------------------------------------



|  Iniciar sesión                                            |

|  Email: \[\_\_\_\_\_\_\_\_\_\_\_]                                      |

|  Contraseña: \[\_\_\_\_\_\_\_\_\_\_\_]                                 |

|  \[ Botón: Entrar ]                                         |

---------------------------------------------------------



|  ¿No tienes cuenta?  → Registro                            |

---------------------------------------------------------















**Wireframe 6 — Registro**

Código

---------------------------------------------------------

| LOGO Mascine\*                                              |

---------------------------------------------------------



|  Crear cuenta                                              |

|  Nombre: \[\_\_\_\_\_\_\_\_\_\_\_]                                     |

|  Email: \[\_\_\_\_\_\_\_\_\_\_\_]                                      |

|  Contraseña: \[\_\_\_\_\_\_\_\_\_\_\_]                                 |

|  \[ Botón: Registrarse ]                                    |

---------------------------------------------------------



|  ¿Ya tienes cuenta?  → Login                               |

---------------------------------------------------------



















**Wireframe 7 — Favoritos**

Código

---------------------------------------------------------

| LOGO Mascine\*                 |  Buscar \[\_\_\_\_]  | User |

---------------------------------------------------------



|  Tus favoritos:                                            |

|   \[Poster] Película 1   (ver ficha)                        |

|   \[Poster] Película 2   (ver ficha)                        |

|   \[Poster] Película 3   (ver ficha)                        |

---------------------------------------------------------



















**Vamos a crear solo tres carpetas al principio:**



**mascine/**

   **backend/**

   **frontend/**

   **docs/**



backend/ → Aquí irá Express, tus rutas, controladores, conexión a BD.



frontend/ → Aquí irá HTML, CSS, JS, imágenes, etc.



docs/ → Aquí guardas wireframes, mapa de navegación, documentación del TFG.



Nada más.

Sin Docker todavía.

Sin base de datos todavía.

Sin API todavía.




**Requisitos Funcionales (RF) con interpretación técnica**

RF1 — El usuario podrá ver la cartelera de películas.
Interpretación técnica:  
Implementar un endpoint GET /peliculas que devuelva las películas almacenadas en la base de datos. Crear una vista en el frontend que muestre las tarjetas de películas con título, póster y valoración.

RF2 — El usuario podrá buscar películas por título.
Interpretación técnica:  
Añadir un parámetro de búsqueda en el endpoint GET /peliculas?titulo= y filtrar resultados mediante consultas SQL con LIKE. En el frontend, implementar un campo de búsqueda que actualice la lista dinámicamente.

RF3 — El usuario podrá ver un calendario con fechas de estrenos.
Interpretación técnica:  
Crear una tabla estrenos en la base de datos y un endpoint GET /estrenos. En el frontend, generar un calendario en JavaScript que muestre los estrenos al hacer clic en un día.

RF4 — El usuario podrá ver un mapa con los cines cercanos.
Interpretación técnica:  
Integrar Google Maps API, obtener la geolocalización del usuario mediante navigator.geolocation y mostrar marcadores de cines cercanos usando coordenadas predefinidas o una API externa.

RF5 — El usuario podrá ver la ficha detallada de una película.
Interpretación técnica:  
Crear un endpoint GET /peliculas/:id que devuelva toda la información de la película. En el frontend, generar una vista con póster, sinopsis, duración, género, valoración y tráiler embebido.

RF6 — El usuario podrá registrarse e iniciar sesión.
Interpretación técnica:  
Crear endpoints POST /registro y POST /login. Guardar contraseñas con hash (bcrypt) y generar tokens JWT para la autenticación. Validar formularios en frontend y backend.

RF7 — El usuario registrado podrá añadir y quitar películas de favoritos.
Interpretación técnica:  
Crear tabla favoritos y endpoints POST /favoritos, DELETE /favoritos/:id y GET /favoritos. En la ficha de película, mostrar un botón dinámico según si la película está o no en favoritos.

RF8 — El sistema mostrará notificaciones de próximos estrenos (opcional).
Interpretación técnica:  
Crear un proceso que consulte los estrenos próximos y envíe notificaciones por email o muestre avisos en la interfaz. Puede implementarse con cron jobs o simplemente como un módulo extra.




**Requisitos No Funcionales (RNF) con interpretación técnica**

RNF1 — La interfaz será responsive y accesible.
Interpretación técnica:  
Usar CSS responsive (flexbox, grid, media queries) y buenas prácticas de accesibilidad (alt en imágenes, contraste adecuado, etiquetas semánticas).

RNF2 — La aplicación se desarrollará siguiendo arquitectura MVC.
Interpretación técnica:  
Separar el backend en modelos, controladores y rutas. Mantener el frontend independiente en su propia carpeta.

RNF3 — La base de datos será relacional (MySQL).
Interpretación técnica:  
Diseñar tablas normalizadas y relaciones claras (usuarios–favoritos, películas–estrenos). Usar consultas preparadas para evitar inyecciones SQL.

RNF4 — El tiempo de carga será inferior a 3 segundos.
Interpretación técnica:  
Optimizar imágenes, minimizar llamadas a la API, usar paginación en la cartelera y activar compresión en el servidor.

RNF5 — El sistema garantizará la seguridad básica.
Interpretación técnica:  
Aplicar hash de contraseñas, validaciones de entrada, sanitización de datos, tokens JWT y protección contra ataques comunes (XSS, CSRF, SQL Injection).










