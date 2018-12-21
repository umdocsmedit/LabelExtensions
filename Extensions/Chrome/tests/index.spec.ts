import hello from '../src/index'
import assert from 'assert'

describe('Hello function', () => {
	it('should return hello world', ()=> {
		const result = hello();
		assert.equal(result, 'Hello World!');
	});
});
