
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
} // end of class LimitedArray

module.exports = { LimitedArray };
