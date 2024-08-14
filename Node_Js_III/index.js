const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');

const commandFilePath = path.join(__dirname, 'command.txt');

// Function to handle the commands
const handleCommand = (command) => {
    const parts = command.split(' ');
    const action = parts[0];

    switch(action) {
        case 'create':
            if (parts[1] === 'a' && parts[2] === 'file') {
                const fileName = parts.slice(3).join(' ');
                fs.writeFile(fileName, '', (err) => {
                    if (err) throw err;
                    console.log(`${fileName} has been created.`);
                });
            }
            break;
        case 'delete':
            if (parts[1] === 'the' && parts[2] === 'file') {
                const fileName = parts.slice(3).join(' ');
                fs.unlink(fileName, (err) => {
                    if (err) throw err;
                    console.log(`${fileName} has been deleted.`);
                });
            }
            break;
        case 'rename':
            if (parts[1] === 'the' && parts[2] === 'file') {
                const oldName = parts[3];
                const newName = parts.slice(6).join(' ');
                fs.rename(oldName, newName, (err) => {
                    if (err) throw err;
                    console.log(`${oldName} has been renamed to ${newName}.`);
                });
            }
            break;
        case 'add':
            if (parts[1] === 'to' && parts[2] === 'the' && parts[3] === 'file') {
                const fileName = parts[4];
                const textToAdd = parts.slice(5).join(' ');
                fs.appendFile(fileName, textToAdd, (err) => {
                    if (err) throw err;
                    console.log(`Text has been added to ${fileName}.`);
                });
            }
            break;
        default:
            console.log('Command not recognized.');
            break;
    }
};

// Watch for changes in command.txt
chokidar.watch(commandFilePath).on('change', (event, path) => {
    fs.readFile(commandFilePath, 'utf-8', (err, data) => {
        if (err) throw err;
        handleCommand(data.trim());
    });
});

console.log('Watching for changes in command.txt...');
