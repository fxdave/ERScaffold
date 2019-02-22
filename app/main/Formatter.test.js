import assert from 'assert'
import Formatter from './Formatter'

describe('Formatter', function () {
    describe('getTags', function () {
        it('test1', function () {
            let str= 'ThisIsWhatIWant'
            let tags = Formatter.getTags(str)
            assert.equal(tags.join('-'), 'This-Is-What-I-Want')
        })
    })
    
    describe('upperCamelCase', function () {
        it('test1', function () {
            let str= 'this-is-what-i-want'
            str = Formatter.upperCamelCase(str)
            assert.equal(str, 'ThisIsWhatIWant')
        })
    })

    describe('lowerCamelCase', function () {
        it('test1', function () {
            let str= 'this-is-what-i-want'
            str = Formatter.lowerCamelCase(str)
            assert.equal(str, 'thisIsWhatIWant')
        })
    })

    describe('snakeCase', function () {
        it('test1', function () {
            let str= 'this-is-what-i-want'
            str = Formatter.snakeCase(str)
            assert.equal(str, 'this_is_what_i_want')
        })
    })

    describe('kebabCase', function () {
        it('test1', function () {
            let str= 'this-is-what-i-want'
            str = Formatter.kebabCase(str)
            assert.equal(str, 'this-is-what-i-want')
        })
    })

    describe('singular', function () {
        it('test1', function () {
            let str= 'userBoxes'
            str = Formatter.singular(str)
            assert.equal(str, 'userBox')
        })
    })

    describe('plural', function () {
        it('test1', function () {
            let str= 'userBox'
            str = Formatter.plural(str)
            assert.equal(str, 'userBoxes')
        })
    })
})