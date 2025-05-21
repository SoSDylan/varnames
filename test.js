import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import varNames from './index.js';

describe('varNames', () => {
	it('converts lowercase keys to variables', () => {
		assert.equal(varNames({
			background: 'red',
			color: 'blue',
		}), '--background:red;--color:blue;');
	});

	it('converts camelCase keys to variables', () => {
		assert.equal(varNames({
			headerHeight: '100px',
			hoverColor: 'purple',
		}), '--header-height:100px;--hover-color:purple;');
	});

	it('converts number values to variables', () => {
		assert.equal(varNames({
			headerZIndex: 50,
		}), '--header-z-index:50;');
	});

	it('converts function result to variables', () => {
		assert.equal(varNames({
			dynamicColor: () => '#ce7e36',
		}), '--dynamic-color:#ce7e36;');
	});

	it('handle pascal case names', () => {
		assert.equal(varNames({
			PascalCase: '100vw',
			camelCase: '50vh',
		}), '--pascal-case:100vw;--camel-case:50vh;');
	});

	it('handles null and undefined values', () => {
		assert.equal(varNames({
			nullValue: null,
			undefinedValue: undefined,
			functionNullValue: () => null,
		}), '');
	});

	it('handles empty dictionaries', () => {
		assert.equal(varNames({}), '');
	});

	it('throws on invalid argument type', () => {
		assert.throws(() => varNames(['badType']));
		assert.throws(() => varNames('another incorrect type'));
		assert.throws(() => varNames(115));
	});
});
