import Konva from 'konva';
import BoundingBox from './BoundingBox';

class Arranger {
  constructor() {
    this.arrangables = [];
    this.speed = 3;
  }

  /**
   *
   * @param {Object} element
   * @param {Object} element.current
   */
  add(element) {
    this.setDefaultsFor(element.current);

    this.arrangables.push(element);
    console.log(
      this.arrangables.map(a =>
        a.current._arrangerBoundingType(a.current, { x: 0, y: 0 })
      )
    );
    this.onStart();
  }

  /**
   *
   * @param {Object} element
   * @param {Object} element.current
   */
  remove(element) {
    this.arrangables = this.arrangables.filter(
      v => v.current._id != element.current._id
    );
  }

  setDefaultsFor(konvaObject) {
    if (!konvaObject._arrangerElementCentered)
      konvaObject._arrangerElementCentered = false;
    if (!konvaObject._arrangerBoundingType)
      konvaObject._arrangerBoundingType = BoundingBox;
    if (!konvaObject._arrangerMinimalSpace)
      konvaObject._arrangerMinimalSpace = 1000;
    if (!konvaObject._arrangerUpdate) konvaObject._arrangerUpdate = () => {};
    if (!konvaObject._arrangerMinimalRawSpace)
      konvaObject._arrangerMinimalRawSpace =
        konvaObject._arrangerMinimalSpace * 9;
  }

  tick() {
    this.arrangables.forEach(ref => {
      const summary = this.arrangables
        .filter(v => {
          const dsr = this.distanceSquareRaw(v.current, ref.current);
          return (
            dsr < v.current._arrangerMinimalRawSpace ||
            dsr < ref.current._arrangerMinimalRawSpace
          );
        })
        .filter(v => {
          const ds = this.distanceSquare(v.current, ref.current);
          return (
            ds < v.current._arrangerMinimalSpace ||
            ds < ref.current._arrangerMinimalSpace
          );
        })
        .filter(v => v != ref && v.current.parent.parent != ref.current)
        .reduce(
          (acc, v) => {
            const refAbs = ref.current.getAbsolutePosition();
            const vAbs = v.current.getAbsolutePosition();
            return {
              sum: {
                x: acc.sum.x + refAbs.x - vAbs.x,
                y: acc.sum.y + refAbs.y - vAbs.y
              },
              counter: acc.counter + 1
            };
          },
          { sum: { x: 0, y: 0 }, counter: 0 }
        );

      if (summary.counter > 0) {
        const avg = {
          x: summary.sum.x / summary.counter,
          y: summary.sum.y / summary.counter
        };

        this.moveElement(ref.current, avg);
      }
    });
  }

  /**
   *
   * @param {Object} konvaObject
   * @param {Object} direction
   * @param {number} direction.x
   * @param {number} direction.y
   */
  moveElement(konvaObject, direction) {
    const length = Math.sqrt(
      Math.pow(direction.x, 2) + Math.pow(direction.y, 2)
    );
    const dir = {
      x: direction.x / length,
      y: direction.y / length
    };

    if (!isNaN(dir.x) && !isNaN(dir.y)) {
      konvaObject.x(konvaObject.x() + dir.x * this.speed);
      konvaObject.y(konvaObject.y() + dir.y * this.speed);
      konvaObject._arrangerUpdate();
    } else {
      konvaObject.x(konvaObject.x() + (Math.random() - 0.5) * this.speed);
      konvaObject.y(konvaObject.y() + (Math.random() - 0.5) * this.speed);
      konvaObject._arrangerUpdate();
    }

    konvaObject.getLayer().draw();
  }

  /**
   *
   * @param {Object} fromKonvaObject
   * @param {Object} toKonvaObject
   */
  distanceSquare(fromKonvaObject, toKonvaObject) {
    const abs = toKonvaObject.getAbsolutePosition();
    const near1 = fromKonvaObject._arrangerBoundingType(fromKonvaObject, abs);
    const near2 = toKonvaObject._arrangerBoundingType(toKonvaObject, near1);

    const d = Math.pow(near1.x - near2.x, 2) + Math.pow(near1.y - near2.y, 2);

    return d;
  }

  /**
   *
   * @param {Object} fromKonvaObject
   * @param {Object} toKonvaObject
   */
  distanceSquareRaw(fromKonvaObject, toKonvaObject) {
    const abs1 = fromKonvaObject.getAbsolutePosition();
    const abs2 = toKonvaObject.getAbsolutePosition();

    return Math.pow(abs1.x - abs2.x, 2) + Math.pow(abs1.y - abs2.y, 2);
  }
}
const arranger = new Arranger();

const anim = new Konva.Animation(() => {
  arranger.tick();
});

arranger.onStart = () => {
  anim.start();
};

export default arranger;
