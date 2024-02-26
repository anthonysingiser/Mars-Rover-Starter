const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {

  it('constructor sets position and default values for mode and generatorWatts', function () {
    let testRover = new Rover(45565);
    expect(testRover.position).toEqual(45565);
    expect(testRover.mode).toEqual('NORMAL');
    expect(testRover.generatorWatts).toEqual(110);
  })

  it('response returned by receiveMessage contains name of the message', function(){
    let testRover = new Rover(45565);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let response = testRover.receiveMessage(message);
    expect(response.message).toEqual('Test message'); 
  })

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
    let testRover = new Rover(45565);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let response = testRover.receiveMessage(message);
    expect(response.results.length).toEqual(2);  
  })

  it('responds correctly to the status check command', function(){
    let testRover = new Rover(45565);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test STATUS_CHECK command', commands);
    let response = testRover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 45565}}])
  })

  it('responds correctly to the mode change command', function(){
    let testRover = new Rover(45565);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test MODE_CHANGE command', commands);
    let response = testRover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true}])
  })

  it('responds with a false completed value when attempting to move in LOW_POWER mode', function(){
    let testRover = new Rover(45565);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12345)];
    let message = new Message('Test MOVE command in LOW_POWER mode', commands);
    let response = testRover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true}, {completed: false}])

  })

  it('responds with the position for the move command', function(){
    let testRover = new Rover(45565);
    let commands = [new Command('MOVE', 12345)];
    let message = new Message('Test MOVE command', commands);
    let response = testRover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true}])
    expect(testRover.position).toEqual(12345);
  })

});