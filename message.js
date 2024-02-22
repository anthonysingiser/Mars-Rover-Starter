class Message {
   constructor(name, commands) {
      this.name = name;
      if (!name) {
         throw Error("Name required as first parameter.");
      }
      this.commands = commands;
   }
}

module.exports = Message;