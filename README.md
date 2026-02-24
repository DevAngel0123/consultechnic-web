# 🌐 Página Web Consultechnic

Página web profesional y moderna para Consultechnic, empresa de tecnología especializada en servicios Microsoft, licenciamiento, hardware/software y desarrollo con Power Platform.

## ✨ Características

- **Diseño Responsive**: Optimizada para todos los dispositivos
- **Navegación Suave**: Scroll suave entre secciones
- **Animaciones Modernas**: Efectos visuales atractivos
- **Formulario de Contacto**: Funcional y validado
- **SEO Optimizado**: Meta tags y estructura semántica
- **Accesibilidad**: Navegación por teclado y atributos ARIA
- **Performance**: Lazy loading y optimizaciones

## 🎨 Personalización de Colores

Para alinear los colores con tu brochure, edita las variables CSS en el archivo `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Color principal */
    --secondary-color: #1e40af;    /* Color secundario */
    --accent-color: #3b82f6;       /* Color de acento */
    --text-dark: #1f2937;          /* Texto oscuro */
    --text-light: #6b7280;         /* Texto claro */
    --background-light: #f8fafc;   /* Fondo claro */
    --background-white: #ffffff;    /* Fondo blanco */
    --border-color: #e5e7eb;       /* Color de bordes */
}
```

## 📁 Estructura del Proyecto

```
consultechnic-website/
├── 📄 index.html              # Página principal
├── 📄 .htaccess               # Configuración del servidor
├── 📄 package.json            # Configuración del proyecto
├── 📄 project.config          # Configuración del proyecto
├── 📄 dev-server.js           # Servidor de desarrollo
├── 📄 .gitignore              # Archivos a ignorar en Git
├── 📄 DEPLOYMENT.md           # Guía de despliegue
├── 📄 README.md               # Este archivo
└── 📁 assets/                 # Recursos del proyecto
    ├── 📁 css/
    │   └── styles.css         # Estilos CSS
    ├── 📁 js/
    │   └── script.js          # Funcionalidad JavaScript
    └── 📁 images/             # Imágenes y logos
        ├── consultechnic fondo blanco.png
        ├── consultechnic fondo negro .png
        ├── Robot de frente.png
        ├── Robot saludando.png
        ├── Robot señalando a la derecha.png
        └── Ajustes Arq As is final v2-R2R.drawio.png
```

## 🚀 Desarrollo y Despliegue

### 🛠️ Desarrollo Local

```bash
# Opción 1: Servidor Python (más simple)
npm run dev

# Opción 2: Servidor Node.js (más funcional)
node dev-server.js

# Opción 3: Servidor Python directo
python3 -m http.server 8000
```

### 📤 Despliegue en Colombia Hosting

**Ver archivo `DEPLOYMENT.md` para instrucciones detalladas.**

#### Opción 1: FTP (Recomendado)
1. **Conecta por FTP** a tu hosting
2. **Sube todos los archivos** manteniendo la estructura de carpetas
3. **Verifica permisos** (644 para archivos, 755 para carpetas)

#### Opción 2: cPanel File Manager
1. **Accede al File Manager** en tu cPanel
2. **Crea las carpetas** `assets`, `assets/css`, `assets/js`, `assets/images`
3. **Sube los archivos** a sus carpetas correspondientes

#### Opción 3: Git (Para desarrolladores)
```bash
# En tu servidor
cd public_html
git clone [tu-repositorio]
```

## ⚙️ Configuración del Formulario

El formulario de contacto actualmente simula el envío. Para conectarlo a un backend real:

1. **Edita el archivo `script.js`**
2. **Reemplaza la simulación** con una llamada AJAX real
3. **Configura el endpoint** de tu servidor

```javascript
// Ejemplo de integración con backend
fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
    showNotification('Mensaje enviado exitosamente!', 'success');
});
```

## 📱 Personalización de Contenido

### Información de Contacto

Edita en `index.html`:

```html
<div class="contact-item">
    <i class="fas fa-phone"></i>
    <div>
        <h3>Teléfono</h3>
        <p>+57 (1) XXX-XXXX</p>  <!-- Cambia por tu teléfono real -->
    </div>
</div>
```

### Redes Sociales

Actualiza los enlaces en el footer:

```html
<div class="social-links">
    <a href="https://linkedin.com/company/consultechnic"><i class="fab fa-linkedin"></i></a>
    <a href="https://twitter.com/consultechnic"><i class="fab fa-twitter"></i></a>
    <!-- Agrega tus redes sociales reales -->
</div>
```

### Servicios

Personaliza las descripciones de servicios en la sección correspondiente.

## 🔧 Optimizaciones Recomendadas

### 1. Compresión de Imágenes

- **Optimiza las imágenes PNG** antes de subir
- **Considera usar WebP** para mejor rendimiento
- **Mantén tamaños razonables** (máximo 500KB por imagen)

### 2. Configuración del Servidor

Agrega en tu `.htaccess`:

```apache
# Compresión GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache de navegador
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

### 3. SSL/HTTPS

- **Configura certificado SSL** en tu hosting
- **Redirige HTTP a HTTPS** automáticamente

## 📊 SEO y Analytics

### Meta Tags

Los meta tags ya están configurados, pero puedes personalizarlos:

```html
<meta name="description" content="Tu descripción personalizada">
<meta name="keywords" content="tecnología, microsoft, power platform, colombia">
<meta name="author" content="Consultechnic">
```

### Google Analytics

Agrega tu código de Google Analytics antes del cierre de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🧪 Testing

### Antes del Despliegue

1. **Prueba en diferentes navegadores**
2. **Verifica la responsividad** en móviles
3. **Comprueba la funcionalidad** del formulario
4. **Optimiza las imágenes**

### Herramientas de Testing

- **Google PageSpeed Insights**: Para performance
- **GTmetrix**: Para análisis de velocidad
- **BrowserStack**: Para testing en múltiples dispositivos

## 🆘 Soporte

### Problemas Comunes

1. **Imágenes no se muestran**: Verifica las rutas de archivos
2. **Estilos no se cargan**: Revisa que `styles.css` esté en la misma carpeta
3. **JavaScript no funciona**: Verifica que `script.js` esté presente

### Contacto para Soporte

Si necesitas ayuda adicional con la implementación o personalización, contacta al equipo de desarrollo.

## 📈 Próximas Mejoras

- [ ] Blog integrado
- [ ] Sistema de chat en vivo
- [ ] Integración con CRM
- [ ] Panel de administración
- [ ] Múltiples idiomas

---

**Consultechnic** - Soluciones Tecnológicas Profesionales 🚀

*Página web creada con tecnologías modernas para maximizar el impacto de tu presencia digital.*
