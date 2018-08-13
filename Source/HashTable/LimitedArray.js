
class LimitedArray {
  constructor(limit = 8) {
    this.validateLimit(limit);

    const arr = [];

    for (let i = 0; i < limit; i++) {
      arr[i] = undefined;
    }

    Object.seal(arr);

    const handler = {
      // return only index values or special fields (ex. 'size);
      'get': (target, key) => {
        switch (key) {
          case 'size':
          case 'limit':
          case 'length':
            return limit;

          case 'toString':
            return target.toString();

          case 'toJSON':
            return target;

          default:
            // indexed values
            if (Object.keys(arr).indexOf(key) !== -1) {
              return target[key];
            }

            console.log('attempted to do a \'get\' with: ' + key);
            return undefined; // catch all
        }

      },

      // only allow setting of values at proper indexes
      'set': (target, key, value) => {
        if (Object.keys(arr).indexOf(key) !== -1) {
          return target[key] = value;
        }

        return undefined; // signify failure to set value
      }
    }

    return new Proxy(arr, handler);
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

const arr = new LimitedArray();

console.log('\narr: ' + JSON.stringify(arr, undefined, 2) + '\n');

arr[1] = 2;
console.log('arr[1]: ' + arr[1]);

console.log('arr.size: ' + arr.size);

arr[2] = 3;

console.log('arr[2]: ' + arr[2]);

arr[4] = 5

console.log('arr[4]: ' + arr[4]);

console.log('\narr: ' + JSON.stringify(arr, undefined, 2));



