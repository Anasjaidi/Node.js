const eventsEmmiter = require('events');



const event = new eventsEmmiter()
// observer pattern
event.on('ok', (_, __) => {
  console.log(_, __)
})
event.emit('ok', 1, 2)
