// Post-body enhancement for blog markdown (no dependencies — walks hast
// directly). Two transforms:
//  1. A "Key Takeaways" heading + its following list become a styled callout
//     card (<div class="key-takeaways">), matching the AR Tools writer's
//     required Key Takeaways section.
//  2. Tables get an overflow wrapper (<div class="table-wrap">) so a wide
//     comparison table scrolls instead of breaking the page on mobile.
const TAKEAWAYS_RE = /^key\s+takeaways\s*:?$/i;

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(textOf).join('');
}

function isWhitespaceText(node) {
  return node.type === 'text' && !node.value.trim();
}

function isHeading(node) {
  return node.type === 'element' && ['h2', 'h3'].includes(node.tagName);
}

function isList(node) {
  return node.type === 'element' && ['ul', 'ol'].includes(node.tagName);
}

function enhance(node) {
  if (!node.children) return;
  const out = [];
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    if (isHeading(child) && TAKEAWAYS_RE.test(textOf(child).trim())) {
      let j = i + 1;
      const between = [];
      while (j < node.children.length && isWhitespaceText(node.children[j])) {
        between.push(node.children[j]);
        j++;
      }
      const list = node.children[j];
      if (list && isList(list)) {
        out.push({
          type: 'element',
          tagName: 'div',
          properties: { className: ['key-takeaways'] },
          children: [child, ...between, list],
        });
        i = j;
        continue;
      }
    }

    if (child.type === 'element' && child.tagName === 'table') {
      out.push({
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-wrap'] },
        children: [child],
      });
      continue;
    }

    enhance(child);
    out.push(child);
  }
  node.children = out;
}

export default function rehypePostEnhance() {
  return (tree) => enhance(tree);
}
