# RedesProyecto1
XMPP Client
Este proyecto es un cliente de mensajería instantánea que implementa el protocolo XMPP utilizando la librería Strophe.js. El cliente está desarrollado con React y Vite, y proporciona una interfaz moderna y eficiente para la comunicación en tiempo real.

Estructura del Proyecto
El proyecto sigue la siguiente estructura:

css
Copy code
xmpp-client/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── components/
│       ├── Login.jsx
│       ├── Login.css
│       ├── Chat.jsx
│       ├── ContactList.jsx
│       ├── ContactDetails.jsx
│       └── ...
├── index.html
├── vite.config.js
Funcionalidades
Administración de Cuentas
Registrar una nueva cuenta en el servidor
Permite a los usuarios registrar nuevas cuentas en el servidor XMPP.

Iniciar sesión con una cuenta
Permite a los usuarios iniciar sesión con una cuenta existente.

Cerrar sesión con una cuenta
Permite a los usuarios cerrar sesión de su cuenta actual.

Eliminar la cuenta del servidor
Permite a los usuarios eliminar su cuenta del servidor.

Comunicación
Mostrar todos los usuarios/contactos y su estado
Muestra una lista de todos los usuarios y su estado actual.

Agregar un usuario a los contactos
Permite a los usuarios agregar otros usuarios a su lista de contactos.

Mostrar detalles de contacto de un usuario
Muestra información detallada sobre un contacto seleccionado.

Comunicación 1 a 1 con cualquier usuario/contacto
Permite a los usuarios enviar y recibir mensajes directos con otros usuarios.

Participar en conversaciones grupales
Permite a los usuarios unirse y participar en chats grupales.

Definir mensaje de presencia
Permite a los usuarios establecer su mensaje de presencia.

Enviar/recibir notificaciones
Soporta el envío y la recepción de notificaciones entre usuarios.

Enviar/recibir archivos
Permite a los usuarios enviar y recibir archivos en las conversaciones.

Instalación
Para instalar y ejecutar el proyecto en tu máquina local, sigue estos pasos:

Clona el repositorio:

bash
Copy code
git clone <URL_DEL_REPOSITORIO>
cd xmpp-client
Instala las dependencias:

bash
Copy code
npm install
Inicia el servidor de desarrollo:

bash
Copy code
npm run dev
Abre tu navegador y visita http://localhost:3000 para ver la aplicación en acción.

Configuración
Asegúrate de configurar correctamente el servidor XMPP en el archivo vite.config.js y en el código fuente donde se establecen las opciones de conexión.

Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir al proyecto, por favor abre un "issue" o envía un "pull request" con tus cambios.
