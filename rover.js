class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   // receiveMessage function takes in a message object, and returns an object with a message and results property. 
   // the results property is the result of a switch statement that checks the commandType of each command in the message object. It changes the mode if the command received is a MODE_CHANGE command, changes the position if the command received is a MOVE command, and returns the status of the rover if the command received is a STATUS_CHECK command.
   receiveMessage(message) {
      let commands = message.commands;
      let results = commands.map((command)=> {
         switch (command.commandType) {
            case 'STATUS_CHECK':
               return {completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}};
            break;
            case 'MODE_CHANGE':
               this.mode = command.value;
               return {completed: true};
            break;
            case 'MOVE':
               if (this.mode === 'NORMAL') {
                  this.position = command.value;
                  return {completed: true};
               } else {
                  return {completed: false};
               }
            break;
            default:
               return {completed: false};
            break;
         }   
      })
      return {
         message: message.name,
         results: results
      }
   }
}

module.exports = Rover;