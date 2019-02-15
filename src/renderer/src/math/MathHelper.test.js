
import MathHelper from './MathHelper'
import { Vec2 } from 'vecjs'
import assert from 'assert'


describe('MathHelper', function () {
    describe('triangularProjection', function () {
        it('', function () {
            let a = new Vec2(2, 3)
            let b = new Vec2(3, 2)

            let arr = MathHelper.triangularProjection(a, b, 0)
            assert.equal(arr[0], b.x)
            assert.equal(arr[1], b.y)

            assert.equal(arr[2], b.x)
            assert.equal(arr[3], b.y)

            assert.equal(arr[4], b.x)
            assert.equal(arr[5], b.y)
        })

        it('', function () {
            let a = new Vec2(0, 0)
            let b = new Vec2(10, 0)
            let radius = 10
            let arr = MathHelper.triangularProjection(a, b, radius)


            assert.equal(arr[0], 10)
            assert.equal(arr[1], 10)
            assert.equal(arr[2], 10)
            assert.equal(arr[3], 0)
            assert.equal(arr[4], 10)
            assert.equal(arr[5], -10)

        })
    })

    /*
        describe('getNearestPointToCircle', function () {
            it('should be on the edge', function () {
                let center = new Vec2(10, 10)
                let to = new Vec2(10, 20)
                let R = 5
                let near = MathHelper.getNearestPointToCircle(center, to, R)
    
                assert.equal(near.x, 10)
                assert.equal(near.y, 15)
            })
    
            it('should be inside', function () {
                let center = new Vec2(10, 10)
                let to = new Vec2(10, 20)
                let R = 15
                let near = MathHelper.getNearestPointToCircle(center, to, R)
    
                let dist = Vec2.getDistance(center, to)
                if (dist < R) {
                    assert.ok(true)
                } else {
                    assert.ok(false)
                }
            })
        })
    */


    describe('getNearestPointToRectangle', function () {
        let from = new Vec2(0, 0),
            w = 4,
            h = 4

        describe('corners', function () {
            it('leftbottom', function () {
                let to = new Vec2(-3, -4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h, true)
                assert.equal(near.x, -2)
                assert.equal(near.y, -2)
            })
            it('lefttop', function () {
                let to = new Vec2(-3, 4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h, true)
                assert.equal(near.x, -2)
                assert.equal(near.y, 2)
            })
            it('rightbottom', function () {
                let to = new Vec2(3, -4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h, true)
                assert.equal(near.x, 2)
                assert.equal(near.y, -2)
            })
            it('righttop', function () {
                let to = new Vec2(3, 4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h, true)
                assert.equal(near.x, 2)
                assert.equal(near.y, 2)
            })
        })

        describe('sides', function () {
            it('left', function () {
                let to = new Vec2(-3, 1)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h, true)
                assert.equal(near.x, -2)
                assert.equal(near.y, 1)
            })
            it('top', function () {
                let to = new Vec2(1, 4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h, true)
                assert.equal(near.x, 1)
                assert.equal(near.y, 2)
            })
            it('right', function () {
                let to = new Vec2(3, -1)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h, true)
                assert.equal(near.x, 2)
                assert.equal(near.y, -1)
            })
            it('bottom', function () {
                let to = new Vec2(1, -4)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h, true)
                assert.equal(near.x, 1)
                assert.equal(near.y, -2)
            })
        })


        describe('insides', function () {
            it('', function () {
                let to = new Vec2(1, 1)
                let near = MathHelper.getNearestPointToRectangle(from, to, w, h, true)

                let dist1 = to.sub(near).len
                let dist2 = to.sub(from).len
                if (dist1 < dist2 && dist1 != 0) {
                    assert.ok(true)
                } else {
                    assert.ok(false)
                }
            })
        })

    })
    /*
        describe('getSmoothPoint', function () {
            it('', function () {
                let a = new Vec2(0,0)
                let b = new Vec2(10,0)
                let c = new Vec2(3,4)
    
                let C = MathHelper.getSmoothPoint(a,c,b)
                assert.equal(C.x,0)
                assert.equal(C.y,4)
            })
        })
    */

})