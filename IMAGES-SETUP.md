# 🖼️ Configuración de Imágenes - Consultechnic

## 📋 Imágenes Requeridas

Tu proyecto necesita las siguientes imágenes en la carpeta `assets/images/`:

### 🏢 Logos de la Empresa
- `consultechnic fondo blanco.png` - Logo con fondo blanco
- `consultechnic fondo negro .png` - Logo con fondo negro (usado actualmente)

### 🤖 Imágenes de Robots
- `Robot de frente.png` - Robot mirando al frente
- `Robot saludando.png` - Robot saludando (usado en hero section)
- `Robot señalando a la derecha.png` - Robot señalando

### 📊 Diagramas y Recursos
- `Ajustes Arq As is final v2-R2R.drawio.png` - Diagrama de arquitectura

## 🚀 Pasos para Configurar las Imágenes

### 1. Localizar las Imágenes
Busca las imágenes en tu carpeta "Página Web" original o donde las tengas guardadas.

### 2. Mover a la Carpeta Correcta
```bash
# Desde la carpeta raíz del proyecto
mv "ruta/a/tu/imagen.png" assets/images/
```

### 3. Verificar la Estructura
```bash
# Verificar que las imágenes estén en su lugar
ls -la assets/images/
```

## 📁 Estructura Final Esperada

```
assets/
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
│   ├── consultechnic fondo blanco.png
│   ├── consultechnic fondo negro .png
│   ├── Robot de frente.png
│   ├── Robot saludando.png
│   ├── Robot señalando a la derecha.png
│   └── Ajustes Arq As is final v2-R2R.drawio.png
└── documents/
    └── Brochure Consultechnic Tecnología A2025.pdf
```

## 🔍 Verificación

Después de mover las imágenes, ejecuta:

```bash
# Ejecutar script de configuración
./setup.sh

# O verificar manualmente
find assets/images -name "*.png" | wc -l
# Debería mostrar 6 imágenes
```

## ⚠️ Problemas Comunes

### Imágenes no se muestran
- Verifica que estén en `assets/images/`
- Comprueba que los nombres coincidan exactamente
- Verifica permisos (644)

### Error 404 en imágenes
- Las rutas en `index.html` deben apuntar a `assets/images/`
- Ejemplo: `src="assets/images/consultechnic fondo negro .png"`

## 🎯 Próximos Pasos

1. ✅ **Mover todas las imágenes** a `assets/images/`
2. ✅ **Verificar que se muestren** en el navegador
3. ✅ **Ejecutar servidor de desarrollo**
4. ✅ **Probar funcionalidad completa**
5. ✅ **Preparar para despliegue**

---

**Nota**: Si no encuentras alguna imagen, puedes usar placeholders temporales o contactar al equipo de desarrollo para obtenerlas.
