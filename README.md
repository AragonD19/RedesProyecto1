# XMPP Client

Este proyecto es un cliente de mensajería instantánea que implementa el protocolo XMPP utilizando la librería Strophe.js. El cliente está desarrollado con React y Vite, y proporciona una interfaz moderna y eficiente para la comunicación en tiempo real.

## Estructura del Proyecto

El proyecto sigue la siguiente estructura:

![image](https://github.com/user-attachments/assets/b103de0e-11da-4e9c-aa05-366a8b0acebd)



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


## Checklist de Funcionalidades

### Administración de Cuentas (20% del funcionamiento)
- [ ] **Registrar una nueva cuenta en el servidor**
  - El usuario puede crear una nueva cuenta en el servidor XMPP.
- [ ] **Iniciar sesión con una cuenta**
  - El usuario puede iniciar sesión en el servidor utilizando sus credenciales.
- [ ] **Cerrar sesión con una cuenta**
  - El usuario puede cerrar sesión de forma segura.
- [ ] **Eliminar la cuenta del servidor**
  - El usuario puede eliminar su cuenta del servidor de manera permanente.

### Comunicación (80% del funcionamiento)
- [ ] **Mostrar todos los usuarios/contactos y su estado**
  - Lista de contactos y sus estados de presencia (en línea, ausente, etc.).
- [ ] **Agregar un usuario a los contactos**
  - El usuario puede añadir otros usuarios a su lista de contactos.
- [ ] **Mostrar detalles de contacto de un usuario**
  - Visualizar la información detallada de un contacto seleccionado.
- [ ] **Comunicación 1 a 1 con cualquier usuario/contacto**
  - Enviar y recibir mensajes de texto en tiempo real con un contacto específico.
- [ ] **Participar en conversaciones grupales**
  - Enviar y recibir mensajes en grupos, con múltiples participantes.
- [ ] **Definir mensaje de presencia**
  - Configurar y actualizar el mensaje de presencia personal (por ejemplo, ocupado, disponible).
- [ ] **Enviar/recibir notificaciones**
  - Enviar y recibir notificaciones sobre eventos importantes (nuevos mensajes, cambios de estado).
- [ ] **Enviar/recibir archivos**
  - Compartir y recibir archivos con otros usuarios a través del chat.
  
