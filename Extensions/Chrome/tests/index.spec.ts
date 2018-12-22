import * as hello from '../src/index'
import * as assert from 'assert'

describe('Hello function', () => {
	it('should return hello world', ()=> {
		const result = hello.hello();
		assert.equal(result, 'Hello World!');
	});
});
