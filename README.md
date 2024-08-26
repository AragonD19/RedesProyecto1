# XMPP Client

Este proyecto es un cliente de mensajería instantánea que implementa el protocolo XMPP utilizando la librería Strophe.js. El cliente está desarrollado con React y Vite, y proporciona una interfaz moderna y eficiente para la comunicación en tiempo real.

## Estructura del Proyecto

El proyecto sigue la siguiente estructura:

![image](https://github.com/user-attachments/assets/07431b54-3385-49d6-b47d-22c1de0e382a)


## Funcionalidades

### Administración de Cuentas

1. **Registrar una nueva cuenta en el servidor**  
   Permite a los usuarios registrar nuevas cuentas en el servidor XMPP.

2. **Iniciar sesión con una cuenta**  
   Permite a los usuarios iniciar sesión con una cuenta existente.

3. **Cerrar sesión con una cuenta**  
   Permite a los usuarios cerrar sesión de su cuenta actual.

4. **Eliminar la cuenta del servidor**  
   Permite a los usuarios eliminar su cuenta del servidor.

### Comunicación

1. **Mostrar todos los usuarios/contactos y su estado**  
   Muestra una lista de todos los usuarios y su estado actual.

2. **Agregar un usuario a los contactos**  
   Permite a los usuarios agregar otros usuarios a su lista de contactos.

3. **Mostrar detalles de contacto de un usuario**  
   Muestra información detallada sobre un contacto seleccionado.

4. **Comunicación 1 a 1 con cualquier usuario/contacto**  
   Permite a los usuarios enviar y recibir mensajes directos con otros usuarios.

5. **Participar en conversaciones grupales**  
   Permite a los usuarios unirse y participar en chats grupales.

6. **Definir mensaje de presencia**  
   Permite a los usuarios establecer su mensaje de presencia.

7. **Enviar/recibir notificaciones**  
   Soporta el envío y la recepción de notificaciones entre usuarios.

8. **Enviar/recibir archivos**  
   Permite a los usuarios enviar y recibir archivos en las conversaciones.

## Instalación

Para instalar y ejecutar el proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd xmpp-client

2. Instala las dependencias:

npm install

3. Inicia el servidor de desarrollo:

npm run dev
