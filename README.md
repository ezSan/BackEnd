# Proyect-Delilah_Resto

## Objetivo:
Crear el backend para un sistema de pedidos online de un restaurante


### Instrucciones de instalación desde la consola

1 - Clonar éste repositorio, para hacerlo necesitas copiar el siguiente comando:

git clone https://github.com/ezSan/delilahResto_back.git


2- Instalar todas las dependencias :

npm i 


### Crear base de datos : 

1- Crear una base de datos con el nombre **delilah_resto** en el motor mysql **(recomendación -->MariaDB)**.

![image](https://user-images.githubusercontent.com/73204198/209820588-83fb6f4b-be8f-4a24-a9eb-008da0f1eab9.png)

2- Agregar a la base de datos --> nombre de usuario : **root** y contraseña **ezequiel**

Si todo se realizó correctamente debería funcionar.

El archivo connection dentro de la carpeta db es el encargado de conectar la base de datos a nuestro proyecto:

![image](https://user-images.githubusercontent.com/73204198/209820439-944d21b5-6473-4698-9ead-a836a785087a.png)


### Iniciar el servidor:

Desde tu terminal, en visual studio o directamente en la terminal del sistema tenemos varias opciones para hacerlo :

*node app.js* 

*$nodemon app.js*


### Realizar pruebas en Postman :

Para hacerlo ir a la aplicación de postman e importar el archivo con la colección completa de pruebas
que tienen relación con el checklist del proyecto.
Es necesario tener en cuenta que la colección anterior ya tiene los headers de autorización en las request, para facilitar las pruebas.

![image](https://user-images.githubusercontent.com/73204198/209822110-65f827d2-f2a5-4f54-bf90-fd3028550500.png)








