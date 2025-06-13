export default function getRandomBorder() {
  function getRandomBool() {
    return Math.random() < 0.5;
  }
  let topLeft = getRandomBool();
  let topRight = getRandomBool();

  const borderTopLeftRadius = topLeft ? "225px 15px" : "15px 225px";
  const borderTopRightRadius = topRight ? "225px 15px" : "15px 225px";
  const borderBottomLeftRadius = !topLeft ? "225px 15px" : "15px 225px";
  const borderBottomRightRadius = !topRight ? "225px 15px" : "15px 225px";

  return {
    borderTopLeftRadius: borderTopLeftRadius,
    borderTopRightRadius: borderTopRightRadius,
    borderBottomLeftRadius: borderBottomLeftRadius,
    borderBottomRightRadius: borderBottomRightRadius,
  };
}

export function getRandomBorderLeftOnly() {
  function getRandomBool() {
    return Math.random() < 0.5;
  }
  let topLeft = getRandomBool();

  const borderTopLeftRadius = topLeft ? "225px 15px" : "15px 225px";
  const borderBottomLeftRadius = !topLeft ? "225px 15px" : "15px 225px";

  return {
    borderTopLeftRadius: borderTopLeftRadius,
    borderBottomLeftRadius: borderBottomLeftRadius,
  };
}

export function getRandomBorderTopOnly() {
  function getRandomBool() {
    return Math.random() < 0.5;
  }
  let topLeft = getRandomBool();
  let topRight = getRandomBool();

  const borderTopLeftRadius = topLeft ? "225px 15px" : "15px 225px";
  const borderTopRightRadius = topRight ? "225px 15px" : "15px 225px";

  return {
    borderTopLeftRadius: borderTopLeftRadius,
    borderTopRightRadius: borderTopRightRadius,
  };
}

export function getRandomBorderSubtle() {
  function getRandomBool() {
    return Math.random() < 0.5;
  }
  let topLeft = getRandomBool();
  let topRight = getRandomBool();

  const borderTopLeftRadius = topLeft ? "225px 5px" : "5px 225px";
  const borderTopRightRadius = topRight ? "225px 5px" : "5px 225px";
  const borderBottomLeftRadius = !topLeft ? "225px 5px" : "5px 225px";
  const borderBottomRightRadius = !topRight ? "225px 5px" : "5px 225px";

  return {
    borderTopLeftRadius: borderTopLeftRadius,
    borderTopRightRadius: borderTopRightRadius,
    borderBottomLeftRadius: borderBottomLeftRadius,
    borderBottomRightRadius: borderBottomRightRadius,
  };
}

export function getRandomBorderSubtleLeftSide() {
  function getRandomBool() {
    return Math.random() < 0.5;
  }
  let topLeft = getRandomBool();
  let topRight = getRandomBool();

  const borderTopLeftRadius = topLeft ? "225px 5px" : "5px 225px";
  const borderTopRightRadius = topRight ? "225px 5px" : "5px 225px";
  const borderBottomLeftRadius = !topLeft ? "225px 5px" : "5px 225px";
  const borderBottomRightRadius = !topRight ? "225px 5px" : "5px 225px";

  return {
    borderTopLeftRadius: borderTopLeftRadius,
    borderBottomLeftRadius: borderBottomLeftRadius,
  };
}