function fibonacci(num) {
  if (num < 2) {
    return num;
  } else {
    return fibonacci(num - 1) + fibonacci(num - 2);
  }
}

module.exports = function fibonacciOddValues() {
  let array = [];
  let val = 0;
  let i = 2;
  while (true) {
    val = fibonacci(i);
    if (val > 40) {
      break;
    }
    if (val % 2 !== 0) {
      array.push(val);
    }

    i++;
  }
  return array;
};
