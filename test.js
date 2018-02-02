const { spawn } = require('child_process');
const pyProg = spawn('python', ['./test.py']);

pyProg.stdout.on('data', (data) => {
  console.log(data.toString());
  /*const price = Number( data.toString() );
  const logPrice = Math.log(1 + price);
  console.log(logPrice);*/
});
