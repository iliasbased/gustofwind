export default function getRandomBorder() {
  function getRandomBool() {
    return Math.random() < 0.5;
  }
  let topLeft = getRandomBool();
  let topRight = getRandomBool();

  const borderTopLeftRadius = topLeft
    ? "225px 15px"
    : "15px 225px";
  const borderTopRightRadius = topRight
    ? "225px 15px"
    : "15px 225px";
  const borderBottomLeftRadius = !topLeft
    ? "225px 15px"
    : "15px 225px";
  const borderBottomRightRadius = !topRight
    ? "225px 15px"
    : "15px 225px";

  return {
    borderTopLeftRadius: borderTopLeftRadius,
    borderTopRightRadius: borderTopRightRadius,
    borderBottomLeftRadius: borderBottomLeftRadius,
    borderBottomRightRadius: borderBottomRightRadius,
  };
}
