const fs = require('fs');
const path = require('path');
const Usuario = require('./user.js');
const { guardarDB } = require('./guardar.js'); 
const colors = require('colors');

class Users {
    _ListadoUser = {};
    static idCounter = 0; 

    get lisUsuario() {
        const _ListadoUser = [];
        Object.keys(this._ListadoUser).forEach(key => {
            const usuario = this._ListadoUser[key];
            _ListadoUser.push(usuario);
        });
        return _ListadoUser;
    }

    constructor() {
        this._ListadoUser = {};
        this.cargarDB(); 
    }

    crearUsuario(nombre = '', apellido = '', email = '') {
        const usuario = new Usuario(nombre, apellido, email);
        this._ListadoUser[usuario.id] = usuario;
        this.guardarUsuarios();
    }

    mostrarUsuarios() {
        if (this.lisUsuario.length === 0) {
            console.log('No hay usuarios registrados'.red);
        } else {
            console.log('Usuarios registrados:'.green);
            this.lisUsuario.forEach(usuario => {
                console.log(`ID: ${usuario.id} | Nombre: ${usuario.nombre} | Apellido: ${usuario.apellido} | Email: ${usuario.email} | Estado: ${usuario.Estado}`);
            });
        }
    }

    mostrarUsuariosCompletos() {
        const completos = this.lisUsuario.filter(usuario => usuario.Estado === true);
        if (completos.length === 0) {
            console.log('No hay usuarios completos'.red);
        } else {
            console.log('Usuarios completos:'.green);
            completos.forEach(usuario => {
                console.log(`ID: ${usuario.id} | Nombre: ${usuario.nombre} ${usuario.apellido} | Email: ${usuario.email}`);
            });
        }
    }

    mostrarUsuariosIncompletos() {
        const incompletos = this.lisUsuario.filter(usuario => usuario.Estado === false);
        if (incompletos.length === 0) {
            console.log('No hay usuarios incompletos'.red);
        } else {
            console.log('Usuarios incompletos:'.yellow);
            incompletos.forEach(usuario => {
                console.log(`ID: ${usuario.id} | Nombre: ${usuario.nombre} ${usuario.apellido} | Email: ${usuario.email}`);
            });
        }
    }

    cargarDB() {
        const archivo = path.join(__dirname, '../db/data.json'); 

        if (fs.existsSync(archivo)) {
            const data = fs.readFileSync(archivo, { encoding: 'utf-8' });
            this._ListadoUser = JSON.parse(data);

            if (this.lisUsuario.length > 0) {
                Users.idCounter = Math.max(...this.lisUsuario.map(t => t.id)); 
            }
        }
    }

    guardarUsuarios() {
        const archivo = path.join(__dirname, '../db/data.json'); 
        fs.writeFileSync(archivo, JSON.stringify(this._ListadoUser, null, 2));
    }
}

module.exports = Users;
