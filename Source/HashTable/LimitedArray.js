
class LimitedArray {
  constructor(limit = 8) {
    this.validateLimit(limit);

    const _arr = [];

    for (let i = 0; i < limit; i++) {
      _arr[i] = undefined;
    }

    return Object.seal(_arr);
  }

  validateLimit(limit) {
    if (typeof limit !== 'number') {
      throw new Error(`The limit must be a number!`);
    } else if (~~limit !== limit) { // Note: if the limit is an integer dot zero (ex. 1.0), then it will be accepted as an integer
      throw new Error(`The limit must be an integer!`);
    } else if (limit < 0) {
      throw new Error(`There can't be a negative limit!`);
    } else if (limit < 1) {
      throw new Error(`An array of size 0 is pointless!`);
    }
  }
}

// class LimitedArray {
//   constructor(limit = 8) {
//     this.validateLimit(limit);

//     const _arr = [];

//     for (let i = 0; i < limit; i++) {
//       _arr[i] = undefined;
//     }

//     Object.seal(_arr);

//     return new Proxy(_arr, {
//       'get': (target, index, proxy) => {
//         index = this.qualifyIndex(index);

//         switch (index) {
//           case 'valueOf':
//           case 'toString':
//           case 'join':
//           case 'indexOf':
//             return function () { // must be a generic function, or will not get the correct arguments object
//               return target[index](...arguments);
//             };

//           case 'length':
//           case 'size':
//           case 'limit':
//             return limit;

//           default: // either it's an integer, or an invalid key
//             if (typeof index !== 'number') {
//               return undefined;
//             }

//             return target[index];
//         } // end of switch
//       }, // end of get function

//       'set': (target, index, value, proxy) => {
//         index = this.qualifyIndex(index);

//         return target[index] = value;
//       }
//     }); // end of Proxy
//   } // end of constructor

//   validateLimit(limit) {
//     if (typeof limit !== 'number') {
//       throw new Error(`The limit must be a number!`);
//     } else if (~~limit !== limit) { // Note: if the limit is an integer dot zero (ex. 1.0), then it will be accepted as an integer
//       throw new Error(`The limit must be an integer!`);
//     } else if (limit < 0) {
//       throw new Error(`There can't be a negative limit!`);
//     } else if (limit < 1) {
//       throw new Error(`An array of size 0 is pointless!`);
//     }
//   }

//   // This is to account for the fact that the index gets turned into a string when passed through the handler methods
//   qualifyIndex(index) {
//     // Peculiarity: Node will do several initial run throughs with symbols, but Chrome DevTools does not
//     if (typeof index === 'symbol') {
//       return index;
//     }

//     const i = parseInt(index);

//     if (i !== i) { // i is NaN
//       return index;
//     }

//     return i;
//   }

// }







const LimitedArrayFunction = (limit = 8) => {

  const validateLimit = (limit) => {
    if (typeof limit !== 'number') {
      throw new Error(`The limit must be a number!`);
    } else if (~~limit !== limit) { // Note: if the limit is an integer dot zero (ex. 1.0), then it will be accepted as an integer
      throw new Error(`The limit must be an integer!`);
    } else if (limit < 0) {
      throw new Error(`There can't be a negative limit!`);
    } else if (limit < 1) {
      throw new Error(`An array of size 0 is pointless!`);
    }
  }

  validateLimit(limit);

  const _arr = [];

  for (let i = 0; i < limit; i++) {
    _arr[i] = undefined;
  }

  Object.seal(_arr);

  // This is to account for the fact that the index gets turned into a string when passed through the handler methods
  const qualifyIndex = (index) => {
    // Peculiarity: Node will do several initial run throughs with symbols, but Chrome DevTools does not
    if (typeof index === 'symbol') {
      return index;
    }

    i = parseInt(index);

    if (i !== i) { // i is NaN
      return index;
    }

    return i;
  }

  return new Proxy(_arr, {
    'get': function (target, index, proxy) {
      index = qualifyIndex(index);

      switch (index) {
        case 'valueOf':
        case 'toString':
        case 'join':
        case 'indexOf':
          return function () { // must be generic function, or will not get the correct arguments
            return target[index](...arguments);
          };

        case 'length':
        case 'size':
        case 'limit':
          return limit;

        default: // either it's an integer, or an invalid key
          if (typeof index !== 'number') {
            return undefined;
          }

          return target[index];
      }

    },

    'set': function (target, index, value, proxy) {
      index = qualifyIndex(index);

      return target[index] = value;
    }
  });
}

const arr = new LimitedArray();

console.log('arr: ')
console.log(arr);
console.log('\n\n');

console.log('arr[0]: ' + arr[0]);
console.log('setting arr: ' + (arr[0] = 0));
console.log('arr[0]: ' + arr[0]);

arr[1] = 2;
arr[2] = 3;
arr[3] = 5;
arr[4] = 7;
arr[5] = 11;

console.log('arr.indexOf(5): ' + arr.indexOf(5));

console.log('arr.length: ' + arr.length);

// console.log('arr.push(13): ' + arr.push(13));

// arr[0] = 0;

// console.log('arr[0]: ' + arr[0]);

// console.log('arr[0] = 2 :' + (arr[0] = 2));
// console.log('arr[0]: ' + arr[0]);


// class Foo {
//     constructor() {
//         this.limit = 8;
//         const _arr = [];
//         this.setArr = (key, val) => {
//             return _arr[key] = val;
//         }
//         this.getArr = (key) => {
//             return _arr[key];
//         }

//         for(let i = 0; i < this.limit; i++) {
//             _arr[i] = undefined;
//         }

// //         Object.seal(_arr);


//         this.arr = [];
//     }

//     get arr () {
//         console.log('GETTER');
//         console.log('arguments: ' + JSON.stringify(arguments, '', 2));
//         this.getArr();
//     }

//     set arr (val) {
//         console.log('SETTER');
//         console.log('arguments: ' + JSON.stringify(arguments, '', 2));

//         const key = Object.keys(val)[0];
//         const value = val[Object.keys(val)[0]];

//         return this.setArr(key, value);
// //         return this._arr[Object.keys(val)[0]] = val[Object.keys(val)[0]]
//     }
// }

// const f = new Foo();

// console.log('\n\nf.arr: ' + f.arr);

// console.log('f.arr[0]: ' + f.arr[0]);
// console.log('f.arr[0] = 0: ' + (f.arr[0] = 0));
// console.log('f.arr[0]: ' + f.arr[0]);




// console.log(f.arr = 'asdf');
// console.log('f.arr: ' + f.arr);

// const arr = [];

// for(let i = 0; i < 8; i++) {
//     arr[i] = undefined;
// }

// Object.seal(arr);

// const handler = {
//     'get': (target, key, proxy) => {
//        if (typeof target[key] === 'function') {
//            target[key]();
//        }

//         return target[key];
//     }
// }

// const thing = new Proxy(arr, handler);

// thing[1] = 2;

// console.log('thing: ' + JSON.stringify(thing, '', 2));

// thing.indexOf(2);

console.log('\n\nFinished!');




// console.log('\n\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n');

// class LimitedArray {
//   constructor(limit = 8) {
//     this.validateLimit(limit);

//     const arr = [];

//     for (let i = 0; i < limit; i++) {
//       arr[i] = undefined;
//     }

//     console.log('typeof arr.indexOf: ' + typeof arr.indexOf);
//     arr.indexOf = arr.indexOf;

//     Object.seal(arr);

//     const handler = {
//       // return only index values or special fields (ex. 'size);
//       'get': (target, key) => {
//         switch (key) {
//           case 'size':
//           case 'limit':
//           case 'length':
//             return limit;

//           case 'toJSON':
//             return target;

//           case 'indexOf':
//             console.log('CASE indexOf');

//             // console.log('key: ' + key);
//             console.log('typeof target.indexOf: ' + typeof target.indexOf);

//             const index = target.indexOf(5);
//             console.log('target.indexOf(5): ' + index);

//             return index;

//           default:
//             // indexed values
//             if (Object.keys(arr).indexOf(key) !== -1) {
//               return target[key];
//             }

//             // TODO: Remove this line after debugging/testing is complete
//             console.log('attempted to do a \'get\' with: ' + key);

//             return undefined; // catch all
//         }

//       },

//       // only allow setting of values at proper indexes
//       'set': (target, key, value) => {
//         if (Object.keys(arr).indexOf(key) !== -1) {
//           return target[key] = value;
//         }

//         return undefined; // signify failure to set value
//       }
//     }

//     return new Proxy(arr, handler);
//   }

//   validateLimit(limit) {
//     if (typeof limit !== 'number') {
//       throw new Error(`The limit must be a number!`);
//     } else if (~~limit !== limit) { // Note: if the limit is an integer dot zero (ex. 1.0), then it will be accepted as an integer
//       throw new Error(`The limit must be an integer!`);
//     } else if (limit < 0) {
//       throw new Error(`There can't be a negative limit!`);
//     } else if (limit < 1) {
//       throw new Error(`An array of size 0 is pointless!`);
//     }
//   }
// }

// const arr = new LimitedArray();

// // console.log('\narr: ' + JSON.stringify(arr, undefined, 2) + '\n');

// arr[1] = 2;
// // console.log('arr[1]: ' + arr[1]);

// // console.log('arr.size: ' + arr.size);

// arr[2] = 3;

// // console.log('arr[2]: ' + arr[2]);

// arr[4] = 5

// // console.log('arr[4]: ' + arr[4]);

// console.log('\narr: ' + JSON.stringify(arr, undefined, 2));

// // console.log('Object.keys(arr): ' + Object.keys(arr));
// // console.log('arr.toString: ' + Object.keys(arr.toString));
// // console.log('\nCREATED: typeof arr.toString: ' + typeof arr.toString);

// console.log('\narr.indexOf(5): ' + arr.indexOf(5) + '\n');



module.exports = { LimitedArray };
