function buildTree(items, parentId = null) {
  const tree = [];

  items
    .filter((item) => item.parentId === parentId)
    .forEach((item) => {
      const children = buildTree(items, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      tree.push(item);
    });

  return tree;
}

export function toTree(flattenData) {
  const items = flattenData.map((item) => ({ ...item, children: [] }));
  return buildTree(items, null);
}
