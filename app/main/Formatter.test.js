import assert from 'assert';
import Formatter from './Formatter';

describe('Formatter', () => {
  describe('getTags', () => {
    it('test1', () => {
      const str = 'ThisIsWhatIWant';
      const tags = Formatter.getTags(str);
      assert.equal(tags.join('-'), 'This-Is-What-I-Want');
    });
  });

  describe('upperCamelCase', () => {
    it('test1', () => {
      let str = 'this-is-what-i-want';
      str = Formatter.upperCamelCase(str);
      assert.equal(str, 'ThisIsWhatIWant');
    });
  });

  describe('lowerCamelCase', () => {
    it('test1', () => {
      let str = 'this-is-what-i-want';
      str = Formatter.lowerCamelCase(str);
      assert.equal(str, 'thisIsWhatIWant');
    });
  });

  describe('snakeCase', () => {
    it('test1', () => {
      let str = 'this-is-what-i-want';
      str = Formatter.snakeCase(str);
      assert.equal(str, 'this_is_what_i_want');
    });
  });

  describe('kebabCase', () => {
    it('test1', () => {
      let str = 'this-is-what-i-want';
      str = Formatter.kebabCase(str);
      assert.equal(str, 'this-is-what-i-want');
    });
  });

  describe('singular', () => {
    it('test1', () => {
      let str = 'userBoxes';
      str = Formatter.singular(str);
      assert.equal(str, 'userBox');
    });
  });

  describe('plural', () => {
    it('test1', () => {
      let str = 'userBox';
      str = Formatter.plural(str);
      assert.equal(str, 'userBoxes');
    });
  });
});
