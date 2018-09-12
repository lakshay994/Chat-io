const expect = require('expect');

const {generateMessage} = require('./message');

describe('generates a message', () => {
    it('should generate a message', () => {
        let from = 'XYZ';
        let text = 'New Message';

        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from: from,
            text: text
        })
    });
});