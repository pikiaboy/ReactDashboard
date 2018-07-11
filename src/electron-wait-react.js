const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('starting electron');
            startedElectron = true;

            const { spawn } = require('child_process');
            const child = spawn('npm', ['run', 'electron']);
            child.stdout.on('data', (data) => {
                console.log(`child stdout: ${data}`);
              });
              
              child.stderr.on('data', (data) => {
                console.error(`child stderr: ${data}`);
              });
              child.on('exit', function (code, signal) {
                console.log('child process exited with ' +
                            `code ${code} and signal ${signal}`);
              });



            // const exec = require('child_process').exec;

            // exec('npm run electron',(error,stdout,stderr) => {
            //     console.log(stdout);
            // });
        }
    }
);

tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});
