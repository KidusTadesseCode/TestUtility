// src/libs/traversal/findKeyDFS.js

/**
 * A class that finds a specific key in an object using Depth First Search.
 */
export default class KeyFinder {
  /**
   * Creates a new KeyFinder instance.
   *
   * @param {Object} obj - The object to search in.
   */
  constructor(obj) {
    this.obj = obj;
  }

  /**
   * Finds a specific key in the object and returns its value.
   *
   * @param {string} targetKey - The key to find.
   * @returns {*|null} - The value of the key if found, null otherwise.
   */
  findKeyDFS(targetKey) {
    // Base case: If this.obj is not an object or is null, return null
    if (typeof this.obj !== "object" || this.obj === null) {
      return null;
    }

    return this._search(this.obj, targetKey);
  }

  /**
   * Helper method to perform the recursive search.
   *
   * @param {Object} currentObj - The current object being searched.
   * @param {string} targetKey - The key to find.
   * @returns {*|null} - The value of the key if found, null otherwise.
   * @private
   */
  _search(currentObj, targetKey) {
    // Base case: If currentObj is not an object or is null, return null
    if (typeof currentObj !== "object" || currentObj === null) {
      return null;
    }

    // Check if the current object has the target key
    if (targetKey in currentObj) {
      return currentObj[targetKey];
    }

    // Recursive case: Search within nested objects/arrays
    for (const key in currentObj) {
      const result = this._search(currentObj[key], targetKey);
      if (result !== null) {
        return result;
      }
    }

    // If key not found after exhaustive search
    return null;
  }
}
