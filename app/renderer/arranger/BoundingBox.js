import MathHelper from '../math/MathHelper';

export default function(element, to) {
  const W = element.getClientRect().width;

  const H = element.getClientRect().height;

  const abs = element.getAbsolutePosition();

  const nearest = MathHelper.getNearestPointToRectangle(
    {
      x: abs.x,
      y: abs.y
    },
    to,
    W,
    H,
    element._arrangerElementCentered
  );

  return nearest;
}
