
const EventEmitter = require('events');
class Job extends EventEmitter {}
const job = new Job();
job.on('done', (timeDone) => {
  console.log('The job is done at ' + timeDone + '.')
});

job.emit('done', new Date());
