var colors = require('colors');
const inquirer = require('inquirer');

const questions = {
    type: 'list',
    name: 'options',
    message: 'Escoger la opcion de tu preferencia',
    choices: [
        {
            value: '1',
            name: '1. Crear Usuario',
        },
        {
            value: '2',
            name: '2. Listar usuarios',
        },
        {
            value: '3',
            name: '3. Mostrar todas los usuarios completos',
        },
        {
            value: '4',
            name: '4. Mostrar todos los usuarios incompletos',
        },
        {
            value: '5',
            name: '5. Editar Usuario',
        },
        {
            value: '6',
            name: '6. Borrar Usuario',
        },
        {
            value: '0',
            name: '0. Salir',
        }
    ]
}

const menu = async() => {
    console.clear();
    console.log(`${'ººººººººººººººººººººººººººººººººººººººººººº'.blue}`);
    console.log(`${'º            Bienvenido al Menu           º'.blue}`);
    console.log(`${'ººººººººººººººººººººººººººººººººººººººººººº'.blue}`);

    const { options } = await inquirer.default.prompt(questions);

    return options;
}

const pause = async() => {
    const questions = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione la tecla ${'enter'.green}`
        }
    ]

    await inquirer.default.prompt(questions);
}

const Alert = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate(value) {
                return true; 
            }
        }
    ];

    const { descripcion } = await inquirer.default.prompt(question);
    return descripcion;
}


module.exports = {
    menu,
    pause,
    Alert,
}