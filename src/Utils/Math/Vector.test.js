
import Vector from './Vector'
import assert from 'assert'


describe('Vector', function() {
    describe('add', function() {
        it('',function() {
            let a = new Vector(0, 0)
            let b = new Vector(-2, 0)
            let c = new Vector(3, 2)
            let sum = a.add(b).add(c)
            assert.equal(sum.x, 1)
            assert.equal(sum.y, 2)
        })
    })
    describe('normalize', function() {
        let a = new Vector(0, 0)
        let b = new Vector(-2, 0)
        let c = new Vector(3, 2)
        it('should throw a string',function() {
            try {
                let x = a.normalize()
                assert.ok(false)
            } catch(e) {
                assert.ok(true)
            }
        })

        it('it should be okay',function() {
                let x = b.normalize()
                assert.ok(true)
        })
    })

    describe('fromObject', function() {
        let a = {x:2,y:4}
        let aVec = Vector.fromObject(a)
        it('it should have member functions', function() {
            if(aVec.add) {
                assert.ok(true)
            }
        })
        it('it should have the same coordinates', function() {
            assert.equal(aVec.x,2)
            assert.equal(aVec.y,4)
        })
    })

    describe('getDistanceSquare', function() {
        let a = new Vector(0, 0)
        let b = new Vector(-2, 0)
        it('it should have the same lengthSquare', function() {
            let l = Vector.getDistanceSquare(a,b)
            assert.equal(l,4)
        })
    })
    
    describe('getDistance', function() {
        let a = new Vector(0, 0)
        let b = new Vector(-2, 0)
        it('it should have the same length', function() {
            let l = Vector.getDistance(a,b)
            assert.equal(l,2)
        })
    })

    describe('dot', function() {
        let a = new Vector(0, 0)
        let b = new Vector(-2, 0)
        it('', function() {
            let back =  a.getLength() * b.getLength() * Math.cos(Math.PI)
            let dot = Vector.dot(a,b)
            assert.equal(back,dot)
        })
    })

    describe('static add', function() {
        let a = new Vector(0,-3)
        let b = new Vector(-2, 0)
        it('', function() {
            let sum = Vector.add(a,b)
            assert.equal(sum.x,-2)
            assert.equal(sum.y,-3)
        })
    })

    describe('static sub', function() {
        let a = new Vector(0,-3)
        let b = new Vector(-2, 0)
        it('', function() {
            let diff = Vector.sub(a,b)
            assert.equal(diff.x,2)
            assert.equal(diff.y,-3)
        })
    })

    describe('static mul', function() {
        let a = new Vector(0,-3)
        let b = new Vector(-2, 0)
        it('', function() {
            let val = Vector.mul(a,b)
            assert.equal(val.x,0)
            assert.equal(val.y,0)
        })
    })

    describe('static div', function() {
        let a = new Vector(0,-4)
        let b = new Vector(-2, 0)
        let c = new Vector(2,2)
        it('should throw a string', function() {
            try {
                let val = Vector.div(a,b)
                assert.ok(false)
            } catch(e) {
                assert.ok(true)
            }
        })

        it('shouldn\'t throw a string', function() {
            try {
                let val = Vector.div(a,c)
                assert.ok(true)
            } catch(e) {
                assert.ok(false)
            }
        })

        it('', function() {
            let val = Vector.div(a,c)
            assert.equal(val.x,0)
            assert.equal(val.y,-2)
        })

        
    })



 
    describe('getLengthSquare', function() {
        let b = new Vector(-2, 0)
        it('', function() {
            let l = b.getLengthSquare()
            assert.equal(l,4)
        })
    })
    
    describe('getLength', function() {
        let b = new Vector(-2, 0)
        it('', function() {
            let l = b.getLength()
            assert.equal(l,2)
        })
    })

    describe('clone', function() {
        let b = new Vector(-2, 0)
        it('', function() {
            let a = b.clone()
            a.x = 12
            assert.equal(b.x,-2)
            assert.equal(a.x,12)
        })
    })
    
    describe('mulEachBy', function() {
        let b = new Vector(-2, 0)
        it('', function() {
            b.mulEachBy(3)
            assert.equal(b.x,-6)
            assert.equal(b.y,0)
        })
    })
    
    describe('divEachBy', function() {
        let b = new Vector(-2, 0)
        it('', function() {
            b.divEachBy(2)
            assert.equal(b.x,-1)
            assert.equal(b.y,0)
        })
    })
    
    describe('addToEach', function() {
        let b = new Vector(-2, 0)
        it('', function() {
            b.addToEach(2)
            assert.equal(b.x,0)
            assert.equal(b.y,2)
        })
    })
    
    describe('subFromEach', function() {
        let b = new Vector(-2, 0)
        it('', function() {
            b.subFromEach(2)
            assert.equal(b.x,-4)
            assert.equal(b.y,-2)
        })
    })

    
    describe('add', function() {
        let a = new Vector(-2, 2)
        let b = new Vector(-2, 0)
        it('', function() {
            b.add(a)
            assert.equal(b.x,-4)
            assert.equal(b.y,2)
        })
    })

    
    describe('sub', function() {
        let a = new Vector(-2, 2)
        let b = new Vector(-2, 0)
        it('', function() {
            b.sub(a)
            assert.equal(b.x,0)
            assert.equal(b.y,-2)
        })
    })

    
    describe('mul', function() {
        let a = new Vector(-2, 2)
        let b = new Vector(-2, 0)
        it('', function() {
            b.mul(a)
            assert.equal(b.x,4)
            assert.equal(b.y,0)
        })
    })
    
    describe('div', function() {
        let a = new Vector(-2, 2)
        let b = new Vector(-2, 0)
        it('', function() {
            b.div(a)
            assert.equal(b.x,1)
            assert.equal(b.y,0)
        })
        it('should throw a string', function() {
            try {
                a.div(b)
                assert.ok(false)
            } catch(e) {
                assert.ok(true)
            }
        })
    })
    
    describe('getNormal', function() {
        let a = new Vector(-2, 2)
        it('', function() {
            let b = Vector.getNormal(a)
            let dot = Vector.dot(a,b)
            assert.equal(dot,0)
        })
    })

    
    describe('project', function() {
        it('basic', function() {
            let a = new Vector(10, 4)
            let b = new Vector(15, 0)
            let p = Vector.project(a,b)
            assert.equal(p.x,10)
            assert.equal(p.y,0)
        })
        it('other lengths', function() {
            let a = new Vector(15, 4)
            let b = new Vector(10, 0)
            let p = Vector.project(a,b)
            assert.equal(p.x,15)
            assert.equal(p.y,0)
        })
        it('other direction', function() {
            let a = new Vector(15, 4)
            let b = new Vector(-10, 0)
            let p = Vector.project(a,b)
            assert.equal(p.x,15)
            assert.equal(p.y,0)
        })
    })







});