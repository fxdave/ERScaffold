import { Vec2 } from 'vecjs';
import assert from 'assert';
import MathHelper from './MathHelper';

describe('MathHelper', () => {
  describe('triangularProjection', () => {
    it('', () => {
      const a = new Vec2(2, 3);
      const b = new Vec2(3, 2);

      const arr = MathHelper.triangularProjection(a, b, 0);
      assert.equal(arr[0], b.x);
      assert.equal(arr[1], b.y);

      assert.equal(arr[2], b.x);
      assert.equal(arr[3], b.y);

      assert.equal(arr[4], b.x);
      assert.equal(arr[5], b.y);
    });

    it('', () => {
      const a = new Vec2(0, 0);
      const b = new Vec2(10, 0);
      const radius = 10;
      const arr = MathHelper.triangularProjection(a, b, radius);

      assert.equal(arr[0], 10);
      assert.equal(arr[1], 10);
      assert.equal(arr[2], 10);
      assert.equal(arr[3], 0);
      assert.equal(arr[4], 10);
      assert.equal(arr[5], -10);
    });
  });

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

  describe('getNearestPointToRectangle', () => {
    const from = new Vec2(0, 0);

    const w = 4;

    const h = 4;

    describe('corners', () => {
      it('leftbottom', () => {
        const to = new Vec2(-3, -4);
        const near = MathHelper.getNearestPointToRectangle(
          from,
          to,
          w,
          h,
          true
        );
        assert.equal(near.x, -2);
        assert.equal(near.y, -2);
      });
      it('lefttop', () => {
        const to = new Vec2(-3, 4);
        const near = MathHelper.getNearestPointToRectangle(
          from,
          to,
          w,
          h,
          true
        );
        assert.equal(near.x, -2);
        assert.equal(near.y, 2);
      });
      it('rightbottom', () => {
        const to = new Vec2(3, -4);
        const near = MathHelper.getNearestPointToRectangle(
          from,
          to,
          w,
          h,
          true
        );
        assert.equal(near.x, 2);
        assert.equal(near.y, -2);
      });
      it('righttop', () => {
        const to = new Vec2(3, 4);
        const near = MathHelper.getNearestPointToRectangle(
          from,
          to,
          w,
          h,
          true
        );
        assert.equal(near.x, 2);
        assert.equal(near.y, 2);
      });
    });

    describe('sides', () => {
      it('left', () => {
        const to = new Vec2(-3, 1);
        const near = MathHelper.getNearestPointToRectangle(
          from,
          to,
          w,
          h,
          true
        );
        assert.equal(near.x, -2);
        assert.equal(near.y, 1);
      });
      it('top', () => {
        const to = new Vec2(1, 4);
        const near = MathHelper.getNearestPointToRectangle(
          from,
          to,
          w,
          h,
          true
        );
        assert.equal(near.x, 1);
        assert.equal(near.y, 2);
      });
      it('right', () => {
        const to = new Vec2(3, -1);
        const near = MathHelper.getNearestPointToRectangle(
          from,
          to,
          w,
          h,
          true
        );
        assert.equal(near.x, 2);
        assert.equal(near.y, -1);
      });
      it('bottom', () => {
        const to = new Vec2(1, -4);
        const near = MathHelper.getNearestPointToRectangle(
          from,
          to,
          w,
          h,
          true
        );
        assert.equal(near.x, 1);
        assert.equal(near.y, -2);
      });
    });

    describe('insides', () => {
      it('', () => {
        const to = new Vec2(1, 1);
        const near = MathHelper.getNearestPointToRectangle(
          from,
          to,
          w,
          h,
          true
        );

        const dist1 = to.sub(near).len;
        const dist2 = to.sub(from).len;
        if (dist1 < dist2 && dist1 != 0) {
          assert.ok(true);
        } else {
          assert.ok(false);
        }
      });
    });
  });
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
});
