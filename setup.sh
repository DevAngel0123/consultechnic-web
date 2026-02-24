#!/bin/bash

# 🚀 Script de Configuración - Consultechnic Website
# Este script configura automáticamente el entorno de desarrollo

echo "🚀 Configurando proyecto Consultechnic Website..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar si estamos en el directorio correcto
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Error: No se encontró index.html en el directorio actual"
    echo "   Ejecuta este script desde la carpeta raíz del proyecto"
    exit 1
fi

echo -e "${GREEN}✅ Verificando estructura del proyecto..."

# Crear carpetas si no existen
mkdir -p assets/css assets/js assets/images

echo -e "${BLUE}📁 Estructura de carpetas creada:"
echo "   ├── assets/"
echo "   ├── assets/css/"
echo "   ├── assets/js/"
echo "   └── assets/images/"

# Verificar archivos principales
echo -e "\n${BLUE}📋 Verificando archivos principales..."

if [ -f "assets/css/styles.css" ]; then
    echo -e "${GREEN}   ✅ styles.css encontrado"
else
    echo -e "${YELLOW}   ⚠️  styles.css no encontrado en assets/css/"
fi

if [ -f "assets/js/script.js" ]; then
    echo -e "${GREEN}   ✅ script.js encontrado"
else
    echo -e "${YELLOW}   ⚠️  script.js no encontrado en assets/js/"
fi

# Verificar imágenes
echo -e "\n${BLUE}🖼️  Verificando imágenes..."

IMAGE_COUNT=$(find assets/images -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" 2>/dev/null | wc -l)

if [ $IMAGE_COUNT -gt 0 ]; then
    echo -e "${GREEN}   ✅ $IMAGE_COUNT imágenes encontradas en assets/images/"
else
    echo -e "${YELLOW}   ⚠️  No se encontraron imágenes en assets/images/"
    echo "      Mueve tus imágenes a la carpeta assets/images/"
fi

# Verificar dependencias
echo -e "\n${BLUE}🔧 Verificando dependencias..."

if command -v node &> /dev/null; then
    echo -e "${GREEN}   ✅ Node.js encontrado"
    echo -e "${BLUE}   🚀 Puedes usar: node dev-server.js"
else
    echo -e "${YELLOW}   ⚠️  Node.js no encontrado"
fi

if command -v python3 &> /dev/null; then
    echo -e "${GREEN}   ✅ Python3 encontrado"
    echo -e "${BLUE}   🚀 Puedes usar: python3 -m http.server 8000"
else
    echo -e "${YELLOW}   ⚠️  Python3 no encontrado"
fi

# Configurar permisos
echo -e "\n${BLUE}🔐 Configurando permisos..."

chmod 644 *.html *.css *.js *.md *.json *.config 2>/dev/null
chmod 755 assets/ assets/css/ assets/js/ assets/images/ 2>/dev/null
chmod 644 assets/css/* assets/js/* 2>/dev/null

echo -e "${GREEN}   ✅ Permisos configurados"

# Crear archivo de estado
echo -e "\n${BLUE}📝 Creando archivo de estado..."

cat > project-status.txt << EOF
# Estado del Proyecto Consultechnic
Fecha: $(date)
Estructura: ✅ Configurada
Permisos: ✅ Configurados
Archivos principales: ✅ Verificados

## Próximos pasos:
1. Mover imágenes a assets/images/ (si no están ahí)
2. Ejecutar servidor de desarrollo
3. Verificar que todo funcione correctamente
4. Desplegar en Colombia Hosting

## Comandos útiles:
- npm run dev (servidor Python)
- node dev-server.js (servidor Node.js)
- python3 -m http.server 8000 (servidor Python directo)
EOF

echo -e "${GREEN}   ✅ Archivo de estado creado: project-status.txt"

# Resumen final
echo -e "\n${GREEN}🎉 ¡Configuración completada!"
echo -e "\n${BLUE}📋 Resumen:"
echo "   ✅ Estructura de carpetas creada"
echo "   ✅ Permisos configurados"
echo "   ✅ Archivos verificados"
echo "   ✅ Archivo de estado creado"

echo -e "\n${YELLOW}📝 Próximos pasos:"
echo "   1. Mueve tus imágenes a assets/images/"
echo "   2. Ejecuta el servidor de desarrollo"
echo "   3. Verifica que todo funcione"
echo "   4. Consulta DEPLOYMENT.md para el despliegue"

echo -e "\n${BLUE}🚀 Para iniciar el servidor de desarrollo:"
echo "   npm run dev"
echo "   o"
echo "   node dev-server.js"
echo "   o"
echo "   python3 -m http.server 8000"

echo -e "\n${GREEN}✨ ¡Proyecto listo para desarrollo!"
