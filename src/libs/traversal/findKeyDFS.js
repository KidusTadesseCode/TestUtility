// src/app/resume/create/utils/findKeyDFS.js
/**
 * Finds a specific key in an object using Depth First Search and returns an object
 * containing just that key and its value.
 *
 * @param {Object} obj - The object to search in.
 * @param {string} targetKey - The key to find.
 * @returns {Object|null} - An object with the key-value pair if found, null otherwise.
 */
export function findKeyDFS(obj, targetKey) {
  // Base case: If obj is not an object or is null, return null
  if (typeof obj !== "object" || obj === null) {
    return null;
  }

  // Check if the current object has the target key
  if (targetKey in obj) {
    // Return an object with just the target key and its value
    // return { [targetKey]: obj[targetKey] };
    return obj[targetKey];
  }

  // Recursive case: Search within nested objects/arrays
  for (const key in obj) {
    const result = findKeyDFS(obj[key], targetKey);
    if (result !== null) {
      return result;
    }
  }

  // If key not found after exhaustive search
  return null;
}

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
