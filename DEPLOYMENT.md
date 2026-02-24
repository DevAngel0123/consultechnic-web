# 🚀 Guía de Despliegue - Consultechnic

## 📋 Requisitos Previos

- Acceso a tu hosting en Colombia Hosting
- Credenciales FTP o acceso al cPanel
- Dominio configurado

## 🗂️ Estructura de Archivos para Subir

```
public_html/
├── index.html
├── .htaccess
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       ├── consultechnic fondo blanco.png
│       ├── consultechnic fondo negro .png
│       ├── Robot de frente.png
│       ├── Robot saludando.png
│       ├── Robot señalando a la derecha.png
│       └── Ajustes Arq As is final v2-R2R.drawio.png
└── README.md
```

## 🔧 Opciones de Despliegue

### Opción 1: FTP (Recomendado)

1. **Conecta por FTP** a tu hosting
2. **Navega a la carpeta** `public_html` o `www`
3. **Sube todos los archivos** manteniendo la estructura de carpetas
4. **Verifica permisos** (644 para archivos, 755 para carpetas)

### Opción 2: cPanel File Manager

1. **Accede al File Manager** en tu cPanel
2. **Navega a public_html**
3. **Crea las carpetas** `assets`, `assets/css`, `assets/js`, `assets/images`
4. **Sube los archivos** a sus carpetas correspondientes

### Opción 3: Git (Para desarrolladores)

```bash
# En tu servidor
cd public_html
git clone [tu-repositorio]
# O subir archivos manualmente
```

## ✅ Verificación Post-Despliegue

1. **Accede a tu dominio** en el navegador
2. **Verifica que las imágenes** se carguen correctamente
3. **Comprueba la funcionalidad** del formulario de contacto
4. **Revisa la responsividad** en dispositivos móviles
5. **Verifica el SSL/HTTPS** si está configurado

## 🐛 Solución de Problemas Comunes

### Imágenes no se muestran
- Verifica que las rutas en `index.html` apunten a `assets/images/`
- Comprueba permisos de archivos (644)
- Verifica que las imágenes estén en la carpeta correcta

### Estilos no se cargan
- Verifica que `styles.css` esté en `assets/css/`
- Comprueba la ruta en `index.html`
- Verifica permisos de archivos

### JavaScript no funciona
- Verifica que `script.js` esté en `assets/js/`
- Comprueba la ruta en `index.html`
- Revisa la consola del navegador para errores

## 🔒 Configuración de Seguridad

1. **Verifica que `.htaccess`** esté configurado correctamente
2. **Configura SSL/HTTPS** en tu hosting
3. **Habilita compresión GZIP** (ya incluido en .htaccess)
4. **Configura cache del navegador** (ya incluido en .htaccess)

## 📱 Optimización para Móviles

- La página ya está optimizada para dispositivos móviles
- Verifica que se vea bien en diferentes tamaños de pantalla
- Prueba en dispositivos reales si es posible

## 🚀 Comandos Útiles

```bash
# Verificar estructura de archivos
find . -type f -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.png"

# Verificar permisos
ls -la assets/

# Comprimir archivos para subida (opcional)
zip -r consultechnic-website.zip . -x "*.DS_Store" "*.git*"
```

## 📞 Soporte

Si tienes problemas durante el despliegue:
1. Revisa los logs de error del servidor
2. Verifica la consola del navegador
3. Contacta al soporte de Colombia Hosting
4. Revisa la documentación del proyecto

---

**Consultechnic** - Soluciones Tecnológicas Profesionales 🚀
