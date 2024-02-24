const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {
  const testRover = new Rover(1432);
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let response = testRover.receiveMessage(message);

  it('constructor sets position and default values for mode and generatorWatts', function () {
    expect(testRover.position).toEqual(1432);
    expect(testRover.mode).toEqual('NORMAL');
    expect(testRover.generatorWatts).toEqual(110);
  })

  it('response returned by receiveMessage contains name of the message', function(){
    expect(response.message).toEqual('Test message with two commands'); 
  })

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
    expect(response.results.length).toEqual(2);  
  })

  it('responds corresctly to the status check command', function(){
    expect(response.results[1].roverStatus.mode).toEqual('LOW_POWER');
  })

  it('responds correctly to the mode change command', function(){
    
  })

});