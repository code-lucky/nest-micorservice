export const flattenToTree = (data: any[], idField: string = 'id', parentField: string = 'parent_id') => {
  const map = new Map();
  const tree = [];

  // First pass: create a map of all nodes
  data.forEach(item => {
    map.set(item[idField], { ...item, children: [] });
  });

  // Second pass: build the tree
  data.forEach(item => {
    const node = map.get(item[idField]);
    if (item[parentField] === 0 || item[parentField] === null || item[parentField] === undefined) {
      // If no parent, it's a root node
      tree.push(node);
    } else {
      // Otherwise, add it to the parent's children
      const parent = map.get(item[parentField]);
      if (parent) {
        parent.children.push(node);
      } else {
        console.warn(`Parent not found for item with id ${item[idField]}`);
      }
    }
  });

  console.log('Tree:', JSON.stringify(tree, null, 2));
  return tree;
}