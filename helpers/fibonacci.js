function fibonacci(num) {
  if (num < 2) {
    return num;
  } else {
    return fibonacci(num - 1) + fibonacci(num - 2);
  }
}

module.exports = function fibonacciOddValues() {
  let array = [];
  for (let i = 1; i <= 40; i++) {
    let val = fibonacci(i);
    if (val % 2 !== 0) {
      array.push(val);
    }
  }
  return array;
};
