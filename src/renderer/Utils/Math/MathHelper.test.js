
import MathHelper from './MathHelper'
import Vector from './Vector'
import assert from 'assert'


describe('MathHelper', function () {
    describe('triangularProjection', function () {
        it('', function () {
            let a = new Vector(2, 3)
            let b = new Vector(3, 2)

            let arr = MathHelper.triangularProjection(a, b, 0)
            assert.equal(arr[0], b.x)
            assert.equal(arr[1], b.y)

            assert.equal(arr[2], b.x)
            assert.equal(arr[3], b.y)

            assert.equal(arr[4], b.x)
            assert.equal(arr[5], b.y)
        })

        it('', function () {
            let a = new Vector(2, 3)
            let b = new Vector(3, 2)
            let radius = 10
            let arr = MathHelper.triangularProjection(a, b, radius)

            let ab = Vector.sub(b, a)
            let normal = Vector.getNormal(ab)

            normal.x *= -1
            normal.y *= -1


            normal.normalize()
            normal.mulEachBy(radius)

            let A = b.clone().add(normal)
            let B = b.clone().sub(normal)

            let bad = true
            if (arr[0] == A.x &&
                arr[1] == A.y &&
                arr[2] == b.x &&
                arr[3] == b.y &&
                arr[4] == B.x &&
                arr[5] == B.y) {
                bad = false
            }


            normal.x *= -1
            normal.y *= -1


            if (arr[0] == A.x &&
                arr[1] == A.y &&
                arr[2] == b.x &&
                arr[3] == b.y &&
                arr[4] == B.x &&
                arr[5] == B.y) {
                bad = false
            }

            assert.ok(!bad)
        })
    })


    describe('getNearestPointToCircle', function () {
        it('should be on the edge', function () {
            let center = new Vector(10, 10)
            let to = new Vector(10, 20)
            let R = 5
            let near = MathHelper.getNearestPointToCircle(center, to, R)

            assert.equal(near.x, 10)
            assert.equal(near.y, 15)
        })

        it('should be inside', function () {
            let center = new Vector(10, 10)
            let to = new Vector(10, 20)
            let R = 15
            let near = MathHelper.getNearestPointToCircle(center, to, R)

            let dist = Vector.getDistance(center, to)
            if (dist < R) {
                assert.ok(true)
            } else {
                assert.ok(false)
            }
        })
    })



    describe('getNearestPointToRectangle', function () {
        let from = new Vector(0, 0),
            w = 4,
            h = 4

        describe('corners', function () {
            it('leftbottom', function () {
                let to = new Vector(-3, -4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h)
                assert.equal(near.x, -2)
                assert.equal(near.y, -2)
            })
            it('lefttop', function () {
                let to = new Vector(-3, 4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h)
                assert.equal(near.x, -2)
                assert.equal(near.y, 2)
            })
            it('rightbottom', function () {
                let to = new Vector(3, -4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h)
                assert.equal(near.x, 2)
                assert.equal(near.y, -2)
            })
            it('righttop', function () {
                let to = new Vector(3, 4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h)
                assert.equal(near.x, 2)
                assert.equal(near.y, 2)
            })
        })

        describe('sides', function () {
            it('left', function () {
                let to = new Vector(-3, 1)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h)
                assert.equal(near.x, -2)
                assert.equal(near.y, 1)
            })
            it('top', function () {
                let to = new Vector(1, 4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h)
                assert.equal(near.x, 1)
                assert.equal(near.y, 2)
            })
            it('right', function () {
                let to = new Vector(3, -1)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h)
                assert.equal(near.x, 2)
                assert.equal(near.y, -1)
            })
            it('bottom', function () {
                let to = new Vector(1, -4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h)
                assert.equal(near.x, 1)
                assert.equal(near.y, -2)
            })
        })


        describe('insides', function () {
            it('', function () {
                let to = new Vector(1, 1)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h)
                
                near = Vector.fromObject(near)
                let dist1 = Vector.getDistance(to,near)
                let dist2 = Vector.getDistance(to,from)
                if(dist1 < dist2 && dist1 != 0){
                    assert.ok(true)
                } else {
                    assert.ok(false)
                }
            })
        })

    })

    describe('getSmoothPoint', function () {
        it('', function () {
            let a = new Vector(0,0)
            let b = new Vector(10,0)
            let c = new Vector(3,4)

            let C = MathHelper.getSmoothPoint(a,c,b)
            assert.equal(C.x,0)
            assert.equal(C.y,4)
        })
    })


})