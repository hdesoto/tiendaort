    $(document).ready(inicializo);

    /*-------------- Variables y Arrays GLOBALES -------------*/

    var listadoProductos = [];
    var listadoUsuarios = [];
    var listadoPedidos = [];
    var carrito = [];
    var usuarioActivo = "";

    listadoProductos = [
        {
            codigo: 1,
            nombre: "Leche de Soja",
            descripcion: "Leche de Soja con Vainilla y Calcio",
            precio: 89,
            foto: 'lechedeSoja.jpg'
            },
        {
            codigo: 2,
            nombre: "Milanesas de Seitán",
            descripcion: "Milanesa de Seitán x 6 un.",
            precio: 151,
            foto: "milanesaSeitan.jpg"
            },
        {
            codigo: 3,
            nombre: "Tofu",
            descripcion: "Tofu duro, 500 gr - Naturezza",
            precio: 86,
            foto: "tofuFirme.jpg"
            },
        {
            codigo: 4,
            nombre: "Tofu",
            descripcion: "Tofu blando, 500 gr - Naturezza",
            precio: 78,
            foto: "tofuBlando.jpg"
            },
        {
            codigo: 5,
            nombre: "Panchos veganos",
            descripcion: "Pancho vegano - Paq x4",
            precio: 81,
            foto: "panchosSoja.jpg"
        },
        {
            codigo: 6,
            nombre: "Chorizo vegano",
            descripcion: "Chorizo vegano - Paq x4",
            precio: 89,
            foto: "chorizoSeitan.jpg"
        },
        {
            codigo: 7,
            nombre: "Barrita Cereales",
            descripcion: "Barrita con frutos secos y coco",
            precio: 29,
            foto: "barrita de mani.jpg"
        },
        {   codigo: 8,
            nombre: "Semillas de Chia",
            descripcion: "Semillas de Chia - 200 gr",
            precio: 58,
            foto: "semillas-de-chia-200g.jpg"
        },
        {   codigo: 9,
            nombre: "Falafel",
            descripcion: "Falafel - x6",
            precio: 120,
            foto: "falafel.jpg"
        }
        ];

    listadoUsuarios = [
        {
            usuario: "admin",
            clave: "1234",
            nombre: "Administrador",
            correo: "admin@comidaviva.uy"
        },
        {
            usuario: "hdesoto",
            clave: "hdesoto1",
            nombre: "Hernán de Soto",
            correo: "hdesoto@gmail.com"
        },
        {
            usuario: "rsmith",
            clave: "rsmith1",
            nombre: "Robert Smith",
            correo: "rsmith@gmail.com"
        },
        {
            usuario: "mperez",
            clave: "mperez1",
            nombre: "María Perez",
            correo: "mperez@mail.com"
        }
    ];

    listadoPedidos = [
        {
            pedido: 1,
            usuario: "hdesoto",
            productos: [1, 4, 3],
    },
        {
            pedido: 2,
            usuario: "mperez",
            productos: [4, 2, 3],
    }
];

    /* -------------- INICIALIZO -------------*/

    function inicializo() {
        /* Función de inicialización con los eventos de la página. */
        poblarGridProductos();
        $("#divLoginRegistro > a").click(ocultarLoginRegistro);
        $("#btnLogin").click(login);
        $("#btnRegistrar").click(registrar);
        $("#inputFoto").change(mostrarFoto);
        $(".botonAdmin").click(mostrarDivAdmin);
        $(".botonLogout").click(logout)
        $(".btnCancelarAdmin").click(volverAreaAdmin)
        $(".botonCancelar").click(cancelar);
        $("#btnGrabarProducto").click(grabarProducto);
        $("#btnLogoutUsuario").click(logout); /* $("#btnLogoutUsuario").click(logoutUsuario);  */
        $("#btnBuscarPorCodigo").click(buscarProducto);
        $("#btnCancelarBuscar").click(cancelarBuscar);
        $("#btnVaciar").click(vaciarCarrito);
        $("#btnPedir").click(ingresarPedido);
        $("#btnReportePedidos").click(reportePedidos);
        $("#btnReporteUsuarios").click(reporteUsuarios);
        $("#btnNombreAscendente").click(productoNombreAscendente);
        $("#btnNombreDescendente").click(productoNombreDescendente);
        $("#btnPrecioAscendente").click(productoPrecioAscendente);
        $("#btnPrecioDescendente").click(productoPrecioDescendente);

    }

    /* -------------- Funciones generales - Mostrar/Ocultar Divs -------------*/

    function ocultarLoginRegistro() {
        /* Oculta uno de los Divs: Login o Registro, según cuál link se haya clickeado */
        var clickeado = $(this).attr("alt");
        var itemClickeado = $("#" + "div" + clickeado);
        itemClickeado.removeClass("hidden").siblings("div").addClass("hidden");
        $("#txt" + clickeado + "Nombre").focus();
        $("#div" + clickeado + "Mensaje").html("");
    }

    function cancelar() {
        /* Cierra un div según el atributo "alt" del botón clickeado. */
        var clickeado = $(this).attr("alt");
        var divParaCerrar = "div" + clickeado;
        limpiarCampos(divParaCerrar);
        $("#" + divParaCerrar).addClass('hidden');
    }

    function limpiarCampos(divParaLimpiar) {
        /* Limpia todos los inputs excepto los button del div cuando se Cancela una acción.*/
        $("#" + divParaLimpiar + " input:not(:button)").val("");
    }

    function volverAreaAdmin() {
        /* Oculta el sub-menú de Administrador que esté abierto y vuelve a mostrar todas las opciones de Administrador y los controles generales de los productos. */
        $("#divOpcionesAdmin").removeClass('hidden').siblings('div').addClass('hidden');
        $("#divBuscarProducto").removeClass('hidden');
        $("#divOrdenarProductos").removeClass('hidden');
        $("#productos").removeClass('hidden');
        $("#divReportes").html("");
        $("#divReportes").addClass('hidden');
        poblarGridProductos();
    }

    function mostrarDivAdmin() {
        /* Muestra el div con el sub-menu de Administrador correspondiente, según el botón que se haya clickeado de entre las opciones de Administrador.*/
        var seleccion = $(this).attr("alt");
        var mostrar = $("#div" + seleccion);
        mostrar.removeClass('hidden').siblings('div').addClass('hidden');
    }

    function mostrarFoto() {
        /* Muestra la foto seleccionada al cargar un producto */
        var archivo = $("#inputFoto").val();
        $("#imgSeleccionada").attr('src', 'images/' + archivo);
    }


    /* -------------- Funciones de Usuario -------------*/

    function login() {
        /* Función que verifica que Usuario y Clave ingresados son correctos y llama a la función loginConfirmado para finalizar las operaciones de login. */
        var elUsuario, laClave, laPosicion;
        elUsuario = $("#txtLoginNombre").val();
        laClave = $("#txtLoginClave").val();
        laPosicion = existeUsuario(elUsuario);
        if (laPosicion == -1) {
            $("#divLoginMensaje").html("Error, el usuario ingresado no existe.");
        } else {
            if (validarUsuarioClave(laPosicion, laClave)) {
                $("#txtLoginNombre").val("");
                $("#txtLoginClave").val("");
                loginConfirmado(elUsuario, laClave);
            } else {
                $("#divLoginMensaje").html("Error, usuario y clave no coinciden");
            }
        }
    }

    function loginConfirmado(pUsuario, pClave) {
        /* Una vez que Usuario y Clave han sido confirmados, esta función verifica si el usuario es Admin o Cliente y muestra los divs y controles correspondientes a cada uno de los perfiles de usuario. Agrega el nombre del usuario activo y muestra los botones de agregar a carrito si el usuario es cliente (generando nuevamente todos los elementos de la tabla) */
        $("#divLoginRegistro").addClass('hidden');
        $("#divLogin").addClass('hidden');
        $("#divRegistro").addClass('hidden');
        usuarioActivo = listadoUsuarios[existeUsuario(pUsuario)];
        poblarGridProductos();
        $("#divUsuarioActivo").removeClass('hidden');
        $("#divUsuarioActivo").html("<label>Logueado: </label> <span id='spanIdUsuario'>" + usuarioActivo['nombre'] + "</span>");
        if (pUsuario == 'admin') {
            $("#divAdmin").removeClass("hidden");
            $("#divOpcionesAdmin").removeClass('hidden');
            $("#divUsuario").addClass('hidden');
            $(".btnAgregarAlCarrito").addClass('hidden')
        } else {
            $("#divAreaAdmin").addClass('hidden');
            $("#divUsuario").removeClass('hidden');
            carrito = [];
            armarTablaCarrito();
        }
    }

    function logout() {
        /* Maneja todo el logout genérico: cierra Divs, limpia mensajes en divs,  elimina el usuario activo de la variable, puebla nuevamente el area de productos quitando los botones para agregar a carrito y muestra el div con las opciones "login / Registro".  */
        var clickeado = $(this).attr("alt");
        var divParaCerrar = $("#div" + clickeado);
        divParaCerrar.addClass('hidden');
        $("#divUsuarioActivo").html("");
        $("#divUsuarioActivo").addClass('hidden');
        usuarioActivo = "";
        poblarGridProductos();
        $("#divLoginRegistro").removeClass('hidden');
    }

    function registrar() {
        /* Registra un usuario nuevo. Se hacen todas las validaciones al presionar el botón Registrar. Se valida que el usuario no exista, que la clave cumpla con la política de claves, que no queden campos vacíos. */
        var nombre = $("#txtRegistroNombre").val();
        var clave = $("#txtRegistroClave").val();
        var nombreCompleto = $("#txtRegistroNombreCompleto").val();
        var mail = $("#txtRegistroMail").val();
        if (!(nombre == "") && !(nombreCompleto == "") && !(mail == "")) {
            if (validarFormatoClave(clave) == false) {
                $("#divRegistroMensaje").html("La Clave ingresada no cumple con la política de claves: no menor a 6 caracteres debiendo contener obligatoriamente por lo menos una letra y un número.");
            } else {
                if (existeUsuario(nombre) == -1) {
                    if (nuevoUsuario(nombre, clave, nombreCompleto, mail)) {
                        $("#divRegistroMensaje").html("Usuario creado correctamente");
                        limpiarCampos("divRegistro");
                        alert("Usuario creado correctamente - Ahora ya está logueado y puede comenzar a comprar.");
                        loginConfirmado(nombre, clave);
                    } else {
                        $("#divRegistroMensaje").html("Error el usuario no pudo crearse....?");
                    }
                } else {
                    $("#divRegistroMensaje").html("El usuario ingresado ya existe, seleccione otro nombre de usuario.");
                }
            }
        } else {
            $("#divRegistroMensaje").html("Ningún campo puede quedar vacío. Ingrese todos los datos solicitados.");
        }
    }

    function nuevoUsuario(pUsuario, pClave, pNombre, pCorreo) {
        /* Función encargada de crear un nuevo usuario y agregarlo al listado de usuarios.  */
        var usuario = {};
        usuario['usuario'] = pUsuario;
        usuario['clave'] = pClave;
        usuario['nombre'] = pNombre;
        usuario['correo'] = pCorreo;
        listadoUsuarios[listadoUsuarios.length] = usuario;
        return true;
    }

    function existeUsuario(pUsuario) {
        /* Función encargada de verificar si el usuario existe o no. Si existe devuelve la posición en el listadoUsuarios en la que se encuentra el usuario. Si no existe el usuario devuelve -1. */
        var i = 0;
        while (i < listadoUsuarios.length) {
            if (listadoUsuarios[i]['usuario'] == pUsuario) {
                return i;
            }
            i++
        }
        return -1;
    }

    function validarUsuarioClave(pPosicion, pClave) {
        /* Valida que la clave recibida por parámetro corresponde al usuario que se encuentra en la posición recibida por parámetro. Devuelve booleano. True si coinciden, false en caso contrario.*/
        if (listadoUsuarios[pPosicion]['clave'] == pClave) {
            return true;
        }
        return false;
    }

    function validarFormatoClave(pClave) {
        /*Verifica que se cumpla con la política de passwords y devuelve true en caso que se cumpla o false si no. */
        var correcta = true;
        var letras = 0;
        var numeros = 0;
        for (var i = 0; i <= pClave.length - 1; i++) {
            var caracter = pClave.charCodeAt(i);
            if ((caracter >= 65 && caracter <= 90) || (caracter >= 97 && caracter <= 122)) {
                letras++;
            } else {
                if (caracter >= 48 && caracter <= 57) {
                    numeros++;
                }
            }
        }
        if (letras >= 1 && numeros >= 1 && pClave.length >= 6) {
            correcta = true;
        } else {
            correcta = false;
        }
        return correcta;
    }

    /* -------------- Funciones de Carrito y Pedido -------------*/

    function agregarAlCarrito() {
        /* Función que agrega un producto al carrito. utiliza el atributo "alt" del botón clickeado para obtener el código del producto a agregar. Cada vez que se agrega un producto se vuelve a generar la tabla que se muestra en pantalla.*/
        var elCodigo = $(this).attr("alt");
        var laPosicion = buscarCodigoProducto(elCodigo);
        var productoAgregar = listadoProductos[laPosicion];
        carrito[carrito.length] = productoAgregar;
        armarTablaCarrito();
    }

    function quitarDelCarrito() {
        /* Quita un producto del carrito. El botón clickeado pasa el atributo de la posición del producto en el array del carrito. Se recorre el carrito y se va copiando a un array temporal. No se copia el item de la posición clickeada. Luego se vacía el array carrito y se copian uno a uno los items del array temporal. */
        var laPosicion = parseInt($(this).attr("alt"));
        var temp = [];
        for (var i = 0; i <= carrito.length - 1; i++) {
            if (!(laPosicion == i)) {
                temp[temp.length] = carrito[i];
            }
        }
        carrito = [];
        for (var p = 0; p <= temp.length - 1; p++) {
            carrito[p] = temp[p];
        }
        temp = [];
        armarTablaCarrito();
    }

    function vaciarCarrito() {
        /* Vacía el carrito y vuelve a generar la tabla HTML con los items del carrito, que mostrará el mensaje "carrito vacío". */
        carrito = [];
        armarTablaCarrito();
    }

    function armarTablaCarrito() {
        /* Función que se ocupa de generar la tabla HTML con los items agregados al carrito. Si el carrito está vacío muestra "Carrito vacío". */
        if (carrito.length == 0) {
            $("#divTablaCarrito").html("Carrito vacío");
        } else {
            var montoTotal = 0;
            var filas = "";
            for (var i = 0; i <= carrito.length - 1; i++) {
                var elNombre = carrito[i]['nombre'];
                var elPrecio = parseInt(carrito[i]['precio']);
                montoTotal += elPrecio;
                var filaNueva = "<tr><td>" + elNombre + "</td><td>$ " + elPrecio + "</td><td><input type='button' id='btnQuitarDelCarrito' class='btnQuitarDelCarrito' value='Eliminar' alt='" + i + "'/></td></tr>";
                filas += filaNueva;
            }
            var cabezal = "<table><thead><tr><th>Producto</th><th>Precio</th><th>Eliminar</th></tr></thead><tfoot><tr><th colspan='2'>TOTAL:</th><th>$ " + montoTotal + "</th></tr></tfoot>";
            tabla = cabezal + filas + "</table>";

            $("#divTablaCarrito").html(tabla);
            $(".btnQuitarDelCarrito").click(quitarDelCarrito);
        }
    }

    function ingresarPedido() {
        /* Función que ingresa el pedido con los items existentes en el carrito. Genera un número de pedido sumando 1 al largo del array listadoPedidos. Agrega el pedido, informa el número de pedido ingresado y vacía el carrito. El cliente puede seguir comprando pero deberá ingresar un nuevo pedido. */
        if (carrito.length == 0) {
            $("#divTablaCarrito").html("El carrito está vacío. Agregue productos al carrito para poder ingresar un pedido.");
        } else {
            var pedidoNuevo = {};
            var nroPedido = listadoPedidos.length + 1;
            var codigosPedidos = [];
            for (var i = 0; i <= carrito.length - 1; i++) {
                codigosPedidos[codigosPedidos.length] = carrito[i]['codigo'];
            }
            pedidoNuevo['pedido'] = nroPedido;
            pedidoNuevo['usuario'] = usuarioActivo['usuario'];
            pedidoNuevo['productos'] = codigosPedidos;
            listadoPedidos[listadoPedidos.length] = pedidoNuevo;
            //alert("Pedido ingresado: Nro " + nroPedido);
            vaciarCarrito();
            $("#divTablaCarrito").prepend("<b>Pedido ingresado con el número: <font color='red'>" + nroPedido + "</font>.<b><br>");
        }
    }

    /* -------------- Funciones de Reporte -------------*/

    function reportePedidos() {
        /* Función que muestra el reporte con los Pedidos ingresados. Oculta todos los Divs y muestra el divReportes y llama a la función armarTablaPedidos que es la encargada de armar la tabla con los pedidos.  */
        $("#divBuscarProducto").addClass('hidden');
        $("#divOrdenarProductos").addClass('hidden');
        $("#productos").addClass('hidden');
        $("#divReportes").removeClass('hidden');
        armarTablaPedidos();
    }

    function reporteUsuarios() {
        /* Función que muestra el reporte con los Usuarios existentes. Oculta todos los Divs y muestra el divReportes y llama a la función armarTablaUsuarios que es la encargada de armar la tabla con los usuarios.  */
        $("#divBuscarProducto").addClass('hidden');
        $("#divOrdenarProductos").addClass('hidden');
        $("#productos").addClass('hidden');
        $("#divReportes").removeClass('hidden');
        armarTablaUsuarios();
    }

    function armarTablaUsuarios() {
        /* Función que arma una tabla con los Usuarios existentes. */
        var tabla = "<table><tr><th>Usuarios</th><th>Nombre</th><th>Correo</th></tr>";
        for (var i = 0; i <= listadoUsuarios.length - 1; i++) {
            var fila = "";
            fila = "<tr><td>" + listadoUsuarios[i]['usuario'] + "</td><td>" + listadoUsuarios[i]['nombre'] + "</td><td>" + listadoUsuarios[i]['correo'] + "</td></tr>";
            tabla += fila;
        }
        tabla += "</table>";
        $("#divReportes").html(tabla);
    }

    function armarTablaPedidos() {
        /* Función que arma una tabla con los pedidos ingresados. */
        var tabla = "<table><tr><th>Nro de Pedido</th><th>Usuario</th><th>Productos</th><th>Total</th></tr>";
        var filas = "";
        for (var i = 0; i <= listadoPedidos.length - 1; i++) {
            var elPedido = listadoPedidos[i];
            var cantFilas = elPedido['productos'].length;
            var losProductos = elPedido['productos'];
            var montoTotal = calcularMontoTotal(i);
            var unaFila = "";
            unaFila = "<tr><td rowspan='" + cantFilas + "'>" + elPedido['pedido'] + "</td><td rowspan ='" + cantFilas + "'>" + elPedido['usuario'] + "</td><td>" + elPedido['productos'][0] + "</td><td rowspan='" + cantFilas + "'>$" + montoTotal + "</td></tr>";
            if (losProductos.length > 1) {
                for (var pos = 1; pos <= losProductos.length - 1; pos++) {
                    var filaExtra = "<tr><td>" + losProductos[pos] + "</td></tr>";
                    unaFila += filaExtra;
                }
            }
            tabla += unaFila;
        }
        tabla += "</table>";
        $("#divReportes").html(tabla);
    }

    function calcularMontoTotal(posicPedido) {
        /* Función que calcula el monto total de un pedido, buscando los precios de cada uno de los codigos de productos ingresados en el pedido y agregandolos a la variable local montoTotal que es la que retorna al terminar de correr.  */
        var pedidoCalcular = listadoPedidos[posicPedido];
        var productos = pedidoCalcular['productos'];
        var montoTotal = 0;
        for (var i = 0; i <= productos.length - 1; i++) {
            montoTotal += precioProducto(productos[i]);
        }
        return montoTotal;
    }

    /* -------------- Funciones de Producto -------------*/

    function poblarGridProductos() {
        /* Función encargada de generar todos los contenedores de productos para mostrar todos los productos en la pantalla. Limpia el Div productos, y por cada producto del ListadoProductos llama a la función crearContenedorProducto() que generar un contenedor de producto y lo agrega al Div productos. Al final crea el evento asociado a la clase btnAgregarAlCarrito, que tienen todos los botones de agregar al carrito, cuyo html es creado dinamicamente por cada contenedor de producto con alt asociado al código del producto.*/
        $("#productos").html("");
        for (var i = 0; i <= listadoProductos.length - 1; i++) {
            crearContenedorProducto(i);
        }
        $(".btnAgregarAlCarrito").click(agregarAlCarrito);
    }

    function crearContenedorProducto(posicion) {
        /* Esta función crea dinámicamente el html necesario para crear un contenedor de producto, que incluye la foto, el precio y todos los atributos del producto que se encuentra en la posición del listadoProductos recibida como parámetro. Si existe un usuario activo, logueado, y que no sea el admin, entonces también genera los botones para agregar al carrito. */
        $("#productos").append("<div id='contenedor_Producto' class='contenedor_Producto'><img src='images/" + listadoProductos[posicion]['foto'] + "'/><div id='codigoProducto' class='liCodigo'><label>Código: </label>" + listadoProductos[posicion]['codigo'] + "</div><div id='nombreProducto' class='liNombre'><label>Nombre: </label><b>" + listadoProductos[posicion]['nombre'] + "</b></div><div id='descripcion' class='liDescripcion'><label>Descripción: </label><b>" + listadoProductos[posicion]['descripcion'] + "</b></div><div id='precio' class='liPrecio'><label>Precio: </label>$ " + listadoProductos[posicion]['precio'] + "</div><input type='button' class='hidden btnAgregarAlCarrito' id='btnAgregarAlCarrito' value='Agregar al Carrito' alt='" + listadoProductos[posicion]['codigo'] + "'/></div>");
        if (!usuarioActivo == "" && !(usuarioActivo['usuario'] == 'admin')) {
            $(".btnAgregarAlCarrito").removeClass('hidden');
            var contenedores = document.querySelectorAll(".contenedor_Producto");
            for (var i = 0; i <= contenedores.length - 1; i++) {
                contenedores[i].style.height = "320px";
            }
        }
    }

    function grabarProducto() {
        /* Función que agrega un nuevo producto en listadoProductos. Los valores los toma de los distintos inputs ingresados por el usuario admin. se hacen todas las validaciones necesarias: que no exista el código, que los campos no estén vacíos, que el precio ingresado sea un datos numérico, etc.. */
        var elCodigo, elNombre, laDescripcion, elPrecio, laFoto;
        if ( $("#txtProductoNombre").val() == "" || $("#txtProductoDescripcion").val() == "" || $("#txtProductoPrecio").val() == "") {
            $("#divErrorCarga").html("Ningún campo puede quedar vacío. Verifique que todos los campos contienen los datos correctos.");
        } else {
            if (isNaN($("#txtProductoPrecio").val())) {
                $("#divErrorCarga").html("Verifique que el precio ingresado esté correcto. Parecería ser que no es un número...")
            } else {
                elCodigo = $("#txtProductoCodigo").val();
                elNombre = $("#txtProductoNombre").val();
                laDescripcion = $("#txtProductoDescripcion").val();
                elPrecio = parseInt($("#txtProductoPrecio").val());
                laFoto = $("#inputFoto").val();
                if (elCodigo == "") {
                    $("#divErrorCarga").html("No ingresó ningún código. <br>Debe ingresar un código de producto.");
                } else {
                    if (buscarCodigoProducto(elCodigo) == -1) {
                        $("#divErrorCarga").html("");
                        nuevoProducto(elCodigo, elNombre, laDescripcion, elPrecio, laFoto);
                        limpiarCampos("divCargaProductos");
                        $("#imgSeleccionada").attr('src', '');
                    } else {
                        $("#divErrorCarga").html("El código ingresado ya existe.")
                    }
                }
            }
        }
    }

    function nuevoProducto(pCodigo, pNombre, pDescripcion, pPrecio, pFoto) {
        /* Función encargada de crear el producto en el listadoProductos con todos los valores recibidos por parámetro. */
        var producto = {};
        producto['codigo'] = pCodigo;
        producto['nombre'] = pNombre;
        producto['descripcion'] = pDescripcion;
        producto['precio'] = pPrecio;
        producto['foto'] = pFoto;
        listadoProductos[listadoProductos.length] = producto;
        poblarGridProductos();
        alert("Producto grabado correctamente.");
    }

    function precioProducto(codigoDeProducto) {
        /* Función para buscar el precio de un producto usando el código del producto. */
        if (!(buscarCodigoProducto(codigoDeProducto) == -1)) {
            var posicion = buscarCodigoProducto(codigoDeProducto);
            return listadoProductos[posicion]['precio'];
        } else {
            return "error";
        }
    }

    function buscarProducto() {
        /* Función para buscar productos y mostrar en la página unicamente el producto mostrado o el mensaje de error. Al finalizar vuelve a crear el evento click para los botones de agregar al carrito ya que vuelve a crear dinamicamente el contenddor producto con su botón si hay un usuario logueado. */
        var codigoBuscado = $("#txtBuscarPorCodigo").val();
        var posicion = buscarCodigoProducto(codigoBuscado);
        if (posicion == -1) {
            $("#productos").html("No existe el código buscado.");
        } else {
            $("#productos").html("");
            crearContenedorProducto(posicion);
        }
        $(".btnAgregarAlCarrito").click(agregarAlCarrito);
    }

    function cancelarBuscar() {
        /* Función que cancela la búsqueda. Vuelve a mostrar todos los productos del listadoProductos y limpia el campo de código a buscar. */
        $("#txtBuscarPorCodigo").val("")
        poblarGridProductos();

    }

    function buscarCodigoProducto(pCodigo) {
        /* Función para buscar la posición de un producto dentro del listadoProductos conociendo el código del producto. Devuelve la posición o -1 si no existe. */
        var existe = false;
        var i = 0;
        while (existe == false && i < listadoProductos.length) {
            if (listadoProductos[i]['codigo'] == pCodigo) {
                existe = true;
                return i;
            }
            i++;
        }
        return -1;
    }

    function productoNombreAscendente() {
        /* Función para ordenar los productos por nombre ascendente. Se ordena el array y se vuelven a generar todos los Contenedores de productos. */
        listadoProductos = listadoProductos.sort(comparadorNombreAscendente);
        poblarGridProductos();
    }

    function productoNombreDescendente() {
        /* Función para ordenar los productos por nombre descendente. Se ordena el array y se vuelven a generar todos los Contenedores de productos. */
        listadoProductos = listadoProductos.sort(comparadorNombreDescendente);
        poblarGridProductos();
    }

    function productoPrecioAscendente() {
        /* Función para ordenar los productos por precio ascendente. Se ordena el array y se vuelven a generar todos los Contenedores de productos. */
        listadoProductos = listadoProductos.sort(comparadorPrecioAscendente);
        poblarGridProductos();
    }

    function productoPrecioDescendente() {
        /* Función para ordenar los productos por precio descendente. Se ordena el array y se vuelven a generar todos los Contenedores de productos. */
        listadoProductos = listadoProductos.sort(comparadorPrecioDescendente);
        poblarGridProductos();
    }

    //modificadores de Sort
    /* -------------- Modificadores de 'Sort()' para los Arrays. -------------
    
    Al devolver:
    -1 (o cualquier valor menor a 0), 'sort()' entiende que el primer item que compara es menor y va primero.
    +1 (o cualquier valor mayor a 0), 'sort()' entiende que el primer item es mayor y por tanto lo pone después que el segundo item que comparó. 
    0 los deja en el mismo orden.
    */

    function comparadorNombreAscendente(a, b) {
        /* Modificador de Sort para ordenar por nombre ascendente */
        if (a['nombre'] < b['nombre']) return -1;
        if (a['nombre'] > b['nombre']) return 1;
        return 0;
    }

    function comparadorNombreDescendente(a, b) {
        /* Modificador de Sort para ordenar por nombre descendente */
        if (a['nombre'] < b['nombre']) return 1;
        if (a['nombre'] > b['nombre']) return -1;
        return 0;
    }

    function comparadorPrecioAscendente(a, b) {
        /* Modificador de Sort para ordenar por precio ascendente */
        return (a['precio'] - b['precio']);
    }

    function comparadorPrecioDescendente(a, b) {
        /* Modificador de Sort para ordenar por precio descendente */
        return (b['precio'] - a['precio']);
    }
    /*-------- */