/**
 * Recursively finds all 'path' values within a nested array of navigation items.
 *
 * @param {Array<Object>} navItems - The array of navigation items (can contain nested 'items' arrays).
 * @returns {Array<string>} A flat array containing all found 'path' strings.
 */
// function getAllPaths(navItems) {
//   let paths = []; // Initialize an empty array to store the paths

//   // Helper function to perform the recursive traversal
//   function findPathsRecursive(items) {
//     // Ensure items is an array before iterating
//     if (!Array.isArray(items)) {
//       return;
//     }

//     // Iterate over each item in the current level
//     for (const item of items) {
//       // If the item has a 'path' property, add it to our results
//       if (item && typeof item.path === "string") {
//         paths.push(item.path);
//       }

//       // If the item has a nested 'items' array, recurse into it
//       if (item && Array.isArray(item.items) && item.items.length > 0) {
//         findPathsRecursive(item.items); // Call the function again for the nested items
//       }
//     }
//   }

//   // Start the recursive process with the initial array
//   findPathsRecursive(navItems);

//   return paths; // Return the collected paths
// }

function getAllPaths(navItems) {
  let paths = [];
  function findPathsRecursive(items) {
    if (!Array.isArray(items)) return;
    for (const item of items) {
      if (item && typeof item.path === "string") {
        paths.push(item.path);
      }
      if (item && Array.isArray(item.items) && item.items.length > 0) {
        findPathsRecursive(item.items);
      }
    }
  }
  findPathsRecursive(navItems);
  return paths;
}
export default getAllPaths;
