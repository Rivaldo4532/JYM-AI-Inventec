KAREN AI · INVENTEC PSG
Prototipo de interfaz web estática (HTML, CSS y JavaScript)
Versión 0.1

CONTENIDO
- index.html: login.
- dashboard.html: panel principal, tarjetas de indicadores, gráficas ilustrativas y chat de Karen.
- css/styles.css: estilos adaptables a escritorio y móvil.
- js/app.js: validación de acceso de demostración, chat simulado y dictado por voz cuando el navegador lo soporta.

CÓMO ABRIR
1. Descomprime KarenAI_Inventec_HTML.zip.
2. Abre la carpeta en Visual Studio Code: Archivo > Abrir carpeta.
3. Abre index.html en el navegador. Recomendado: extensión Live Server en VS Code y clic derecho > Open with Live Server.

ACCESO DE DEMOSTRACIÓN
Usuario: admin
Contraseña: Karen2026!

IMPORTANTE
Este paquete es únicamente un prototipo visual para revisar el diseño y la navegación.
- El login de demostración se valida en el navegador y NO es autenticación segura.
- No hay conexión a SQL Server, datos reales, servicio de IA ni backend.
- Las cifras y gráficas del dashboard son ilustrativas.
- El micrófono usa reconocimiento de voz del navegador si está disponible; no envía audio a un servidor.
- Antes de un piloto en Inventec, el acceso deberá implementarse en un backend seguro y la conexión a producción deberá contar con autorización de CIM y del responsable de SQL Server, con consultas de solo lectura y controles de permisos.

SIGUIENTE ETAPA
Validar el diseño del login y dashboard. Después podemos incorporar backend, autenticación real y el servicio de Karen, por etapas.
