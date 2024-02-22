const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name required as first parameter.'));
    });
    it("constructor sets name", function() {
        let testObj = new Message("Johan")
        expect(testObj.name).toBe("Johan")
    })
    it("contains a commands array passed into the constructor as the 2nd argument", function(){
        let testObj = new Message("Sebastian", ['move up', 'move down', 'move left'])
        expect(testObj.commands).toStrictEqual(['move up', 'move down', 'move left'])
    })
});