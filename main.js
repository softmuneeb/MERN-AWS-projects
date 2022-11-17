// what this code do? plan, steps to do

// 55MINS..

// parts
// DONE, fell figure down to height x steps
// fell only if found space
// fell properly, 0 covers 1 is not correct, merge the 2 rows
// check any full rows available
// refactor complexity 1 of code, show adil, ...

// going out of my range may start again from scratch
// make foldable functions from start...

const emptySpaceFound2 = (a, b) => {
  return 0 === a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

const emptySpaceFound = (fieldRow, figureRow, figureRowPutAtPosition) => {
  return emptySpaceFound2(figureRow, fieldRow.splice(figureRowPutAtPosition, figureRowPutAtPosition + 3));
};

const merge2 = (a, b) => {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
};

const merge = (fieldRow, figureRow, figureRowPutAtPosition) => {
  return [
    ...fieldRow.splice(0, figureRowPutAtPosition),
    ...merge2(figureRow, fieldRow.splice(figureRowPutAtPosition, figureRowPutAtPosition + 3)),
    ...fieldRow.splice(figureRowPutAtPosition + 3),
  ]; // +3 till end
};

const allFilled = (row) => {
  return 1 === row.reduce((a, b) => a * b, 1);
};

function solution(field, figure) {
  let rowFallen = 0,
    breakAll = false;
  for (let j = 0; j < field[0].length; j++) {
    //
    for (let i = 0; i < field.length; i++) {
      //
      if (emptySpaceFound(field[i], [...figure[figure.length - 1]], j)) {
        rowFallen = 1;

        if (i - 3 >= 0) field[i - 3] = [0, 0, 0];
        if (i - 2 >= 0) field[i - 2] = [...figure[figure.length - 3]];
        if (i - 1 >= 0) field[i - 1] = [...figure[figure.length - 2]];
        field[i] = merge(field[i], [...figure[figure.length - 1]], j); // field[next] = figure[last]
      }
      //
      else {
        breakAll = true;
        break;
      }
      //
    }
    //
    if (breakAll) break;
  }

  console.log([...zeros, ...field]);

  for (let i = 0; i < field.length; i++) {
    if (allFilled(field[i])) return rowFallen;
  }

  return -1;
  //   field[0 + 0] = [...figure[figure.length - 1]];

  //   field[0 + 0] = [...figure[figure.length - 2]];
  //   field[0 + 1] = [...figure[figure.length - 1]]; // field[next] = figure[last]

  //   field[0 + 0] = [...figure[figure.length - 3]];
  //   field[0 + 1] = [...figure[figure.length - 2]]; // field[next] = figure[last]
  //   field[0 + 2] = [...figure[figure.length - 1]]; // field[next] = figure[last]

  //   field[0 + 0] = [0, 0, 0];
  //   field[0 + 1] = [...figure[figure.length - 3]];
  //   field[0 + 2] = [...figure[figure.length - 2]]; // field[next] = figure[last]
  //   field[0 + 3] = [...figure[figure.length - 1]]; // field[next] = figure[last]

  //   field[0 + 1] = [0, 0, 0];
  //   field[0 + 2] = [...figure[figure.length - 3]];
  //   field[0 + 3] = [...figure[figure.length - 2]]; // field[next] = figure[last]
  //   field[0 + 4] = [...figure[figure.length - 1]]; // field[next] = figure[last]

  //   field[0] = [...figure[2]];

  //   field[0] = [...figure[2]];
  //   field[1] = [...figure[2]];

  //   field = [...figure, ...field];

  // 0 - 4 = height of field
  //   const heightOfField = field.length;
  //   for (let i = 0; i < heightOfField; i++) {
  //     if (emptySpaceFound(field[3 + i], field[2 + i])) {
  //       field[3 + i] = merge(field[3 + i], field[2 + i]);
  //       field[2 + i] = field[1 + i];
  //       field[1 + i] = field[0 + i];
  //       field[0 + i] = [0, 0, 0];
  //     } else {
  //       break;
  //     }
  //   }

  //   field[3 + 1] = field[2 + 1];
  //   field[2 + 1] = field[1 + 1];
  //   field[1 + 1] = field[0 + 1];
  //   field[0 + 1] = [0, 0, 0];

  //   field[3 + 2] = field[2 + 2];
  //   field[2 + 2] = field[1 + 2];
  //   field[1 + 2] = field[0 + 2];
  //   field[0 + 2] = [0, 0, 0];

  //   field[3 + 3] = field[2 + 3];
  //   field[2 + 3] = field[1 + 3];
  //   field[1 + 3] = field[0 + 3];
  //   field[0 + 3] = [0, 0, 0];

  //   field[3 + 4] = field[2 + 4];
  //   field[2 + 4] = field[1 + 4];
  //   field[1 + 4] = field[0 + 4];
  //   field[0 + 4] = [0, 0, 0];
}

const zeros = [
  [9, 9, 9, 9],
  [9, 9, 9, 9],
  [9, 9, 9, 9],
];
const figure = [
  [0, 0, 1],
  [0, 1, 1],
  [0, 0, 1],
];
const field = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
];

console.log({ sol: solution(field, figure) });

// testing 1 func before using, i.e unit test
// let row = [1,1,1,1]
// console.log({ r: row.reduce((a, b) => a * b, 1) });

// const fieldRow = [0, 0, 0, 0];
// const figureRow = [1, 1, 1];
// const figureRowPutAtPosition = 1;
// console.log({ merge: merge(fieldRow, figureRow, figureRowPutAtPosition) });
