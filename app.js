const { menu, pause, Alert } = require('./models/menu');
const Users = require('./models/users');

const principal = async () => {
    let opt = '';
    const users = new Users();

    do {
        opt = await menu();

        switch (opt) {
            case '1':
                const nombre = await Alert('Nombre: ');
                const apellido = await Alert('Apellido: ');
                const email = await Alert('Email: ');

                users.crearUsuario(nombre, apellido, email);

                const ultimoUsuario = users.lisUsuario[users.lisUsuario.length - 1];
                if (ultimoUsuario.Estado) {
                    console.log(`Usuario ${ultimoUsuario.nombre} ${ultimoUsuario.apellido} registrado con éxito y todos los campos completos.`);
                } else {
                    console.log(`Usuario ${ultimoUsuario.nombre} ${ultimoUsuario.apellido} registrado, pero faltan algunos campos.`);
                }
                break;

            case '2': 
                users.mostrarUsuarios();
                break;

            case '3': 
                users.mostrarUsuariosCompletos();
                break;

            case '4': 
                users.mostrarUsuariosIncompletos();
                break;

            case '5': 
                await editarUsuario(users);
                break;

            case '6': 
                await eliminarUsuario(users);
                break;

            default:
                break;
        }

        await pause();
    } while (opt !== '0');
}

const editarUsuario = async (users) => {
    if (users.lisUsuario.length === 0) {
        console.log('No hay usuarios registrados para editar'.red);
        return;
    }


    console.log('Usuarios disponibles para editar:'.green);
    users.mostrarUsuarios();

    const nombre = await Alert('Ingresa el nombre del usuario que deseas editar: ');

  
    const usuario = users.lisUsuario.find(user => user.nombre.toLowerCase() === nombre.toLowerCase());

    if (!usuario) {
        console.log('Usuario no encontrado'.red);
        return;
    }

    console.log(`Editando usuario: ${usuario.nombre} ${usuario.apellido}`);

  
    const nuevoNombre = await Alert(`Nuevo nombre (actual: ${usuario.nombre}): `);
    const nuevoApellido = await Alert(`Nuevo apellido (actual: ${usuario.apellido}): `);
    const nuevoEmail = await Alert(`Nuevo email (actual: ${usuario.email}): `);


    usuario.nombre = nuevoNombre || usuario.nombre;
    usuario.apellido = nuevoApellido || usuario.apellido;
    usuario.email = nuevoEmail || usuario.email;


    usuario.Estado = (usuario.nombre && usuario.apellido && usuario.email) ? true : false;


    users.guardarUsuarios();

    console.log(`Usuario ${usuario.id} editado con éxito`.green);
}

const eliminarUsuario = async (users) => {
    if (users.lisUsuario.length === 0) {
        console.log('No hay usuarios registrados para eliminar'.red);
        return;
    }


    console.log('Usuarios disponibles para eliminar:'.green);
    users.mostrarUsuarios();

    const nombre = await Alert('Ingresa el nombre del usuario que deseas eliminar: ');


    const usuario = users.lisUsuario.find(user => user.nombre.toLowerCase() === nombre.toLowerCase());

    if (!usuario) {
        console.log('Usuario no encontrado'.red);
        return;
    }


    const confirmacion = await Alert(`Estás seguro de que deseas eliminar al usuario ${usuario.nombre} ${usuario.apellido}? (s/n): `);
    if (confirmacion.toLowerCase() !== 's') {
        console.log('Eliminación cancelada'.yellow);
        return;
    }


    users._ListadoUser = users._ListadoUser.filter(user => user.nombre.toLowerCase() !== nombre.toLowerCase());


    users.guardarUsuarios();

    console.log(`Usuario ${usuario.nombre} ${usuario.apellido} eliminado con éxito`.red);
}

principal();
