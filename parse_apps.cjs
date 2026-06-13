const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('res/apps.md', 'utf-8');

const appRegex = /## (\d+)\. (.*?)\n\*\*Status:\*\* (.*?)\n(?:\*\*ROI:\*\* (.*?)\n\*\*Short:\*\* (.*?)\n\*\*Why:\*\* (.*?)\n\*\*Features:\*\* (.*?)\n\*\*Image:\*\* (.*?)\n)?/g;

const outDir = 'src/content/apps';
fs.mkdirSync(outDir, { recursive: true });

let match;
while ((match = appRegex.exec(content)) !== null) {
  const [_, id, title, status, roi, short, why, features, image] = match;
  
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const frontmatter = [
    '---',
    `id: ${parseInt(id, 10)}`,
    `title: "${title.trim()}"`,
    `status: "${status.trim()}"`,
  ];

  if (roi) frontmatter.push(`roi: "${roi.trim()}"`);
  if (short) frontmatter.push(`short: "${short.trim()}"`);
  if (why) frontmatter.push(`why: "${why.trim()}"`);
  if (features) frontmatter.push(`features: "${features.trim()}"`);
  if (image) frontmatter.push(`image: "${image.trim()}"`);
  
  frontmatter.push('---');
  
  fs.writeFileSync(path.join(outDir, `${slug}.md`), frontmatter.join('\n') + '\n');
}
console.log('Apps parsed successfully.');
