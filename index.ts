// Question 2 isPrime

const isPrime = (num: number) => {
  if (num % 1 || num < 2) return false;
  if (num % 2 == 0) return num == 2;
  if (num % 3 == 0) return num == 3;
  var root = Math.sqrt(num);
  for (var i = 5; i <= root; i += 6) {
    if (num % i == 0) return false;
    if (num % (i + 2) == 0) return false;
  }
  return true;
};

// console.log(isPrime(5))

// Question 3 Reduce

interface Array<T> {
  reduce2(fn: (a: any, b: any) => any, start: any): any;
}

Array.prototype.reduce2 = function (fn, start) {
  var result = start !== undefined ? start : this[0];
  for (var i = 0; i < this.length; i++) {
    console.log(result);
    result = fn(result, this[i]);
  }
  return result;
};

const result = [2, '2', 3, 5].reduce2((total, val) => total + val, 0);

console.log(result);

// Question 4

const someArray = [1, 3, 4, 7, 9, 12, 15, 19, 25, 32, 44];

const includes = (val: number, arr: number[]): boolean => {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);
  while (arr[middle] !== val && start <= end) {
    if (val < arr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }
  return arr[middle] === val;
};

// console.log(includes(44, someArray))

// Question 5

const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  waitFor: number
) => {
  let timeout = 0;
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    clearTimeout(timeout); // each click within time clears the time out
    timeout = setTimeout(() => {
      // new timeout is created
      result = callback(...args);
    }, waitFor);
    return result;
  };
};

const newFunc = debounce((text) => {
  console.log(text);
}, 500);

// newFunc("hey")
// newFunc("hey")
// newFunc("hey")
// newFunc("hey")

// Question 6

let someResult: null | number = null;
setTimeout(() => (someResult = 1337), 5000);
function someResultProvider() {
  console.log('someResultProvider was called');
  return someResult;
}

const pollForResult = (
  resultProvider: () => any,
  interval: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (resultProvider()) resolve(resultProvider());
    }, interval);
  });
};

// pollForResult(someResultProvider, 500).then(res => console.log(res));

// Question 8

// You can't compare 2 objects with the equality operator since JavaScript compares objects by reference, not value
interface Contact {
  name: string;
}

function isJohn(c: Contact) {
  return JSON.stringify(c) == JSON.stringify({ name: 'John' });
}

let con = { name: 'John' };

// console.log(isJohn(con))

// Question 9

// The reason the console.log  shows "Hello John (1337)"  is because the variable c is initally set to { name: "John", age: 32 }.
// This reference is then passed to the function doThings(con) where the age property (con.age) is chnaged to 1337
// still referencing the c that was passed to it but then con is set to an entirely new object so con no longer reference c, hence why c
// keeps it's original name value of "John"

interface Contact {
  name: string;
  age: number;
}

function doThings(con: Contact) {
  con.age = 1337;
  con = { name: 'doer of things', age: 0 };
}

let c = { name: 'John', age: 32 };
doThings(c);
// console.log(`Hello ${c.name} (${c.age})`);

// Question 10

// the resason the code throws an error is because the code is trying to assing a function directly to an uninstatiated object,
// there are a few possible solutions to this question but the simplest would be to just assigning it to the DOG prototype
//  e.g Dog.prototype.bark = function() {
//     console.log(this.name + " barks loudly.");
// }
// otherwise you could assing the function to the constructor function or after it has been instantiated

// Question 11

// isSmallNumber(1);  This is returns true because 1 is greater than 0 but less than 2
// isSmallNumber(20);  This returns false because 20 is not a number between 0 and 2
// isSmallNumber('2');  This returns true because when comparing a string with a number, JavaScript will convert the string to a number when doing the comparison which is inbetween 0 and 2
// isSmallNumber([3]); // false This return flase because an array is not a number
