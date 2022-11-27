const eventsEmmiter = require('events');


class Sales extends eventsEmmiter {
	constructor() {
		super();
	}
}

const myEmmiter = new Sales()

myEmmiter.on('ok', () => {
  console.log('ok');
})


myEmmiter.emit('ok')