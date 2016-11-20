// execute with spawn

// const spawn = require('child_process').spawn;
// const tail = spawn('tail', ['-f', '/Users/tomato/Downloads/crawler/log.log']);
//
// tail.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });
//
// tail.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });
//
// tail.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

const exec = require('child_process').exec;
// exec('tail -f /Users/tomato/Downloads/crawler/log.log', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });

exec('java -jar /Users/tomato/Downloads/crawler/target/crawler-client-0.1.jar', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});
