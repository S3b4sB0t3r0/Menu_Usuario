let idCounter = 0;

class User {
    constructor(nombre, apellido, email) {
        idCounter++; 
        this.id = idCounter; 
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        
        if (nombre && apellido && email) {
            this.Estado = true;  
        } else {
            this.Estado = false; 
        }
    }
}

module.exports = User;
