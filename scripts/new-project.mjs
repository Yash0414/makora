import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const rawName = process.argv.slice(2).join(' ').trim();

if (!rawName) {
  console.log('Naam do. Example: npm run new-project -- "Smart Dustbin"');
  process.exit(1);
}

const slug = rawName
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const dir = join('src', 'content', 'projects');
const file = join(dir, `${slug}.md`);

if (existsSync(file)) {
  console.log(`Ye file pehle se hai: ${file}`);
  process.exit(1);
}

mkdirSync(dir, { recursive: true });

const today = new Date().toISOString().slice(0, 10);

const template = `---
title: "${rawName}"
description: "[ADD A SHORT DESCRIPTION, 10 to 200 characters]"
category: "Arduino"
difficulty: "Beginner"
time: "[ESTIMATED TIME]"
verification: "unverified"
safetyLevel: "low"
safetyNotes:
  - "[ADD SAFETY NOTES]"
components:
  - name: "[COMPONENT NAME]"
    quantity: 1
pinConnections:
  - from: "[PIN: TO BE VERIFIED]"
    to: "[PIN: TO BE VERIFIED]"
learningOutcomes:
  - "[ADD LEARNING OUTCOME]"
tags: []
featured: false
draft: true
publishedDate: ${today}
---

## Overview

[ADD OVERVIEW]

## Assembly steps

1. [STEP 1]

## Source code

\`\`\`cpp
// [ADD TESTED CODE]
\`\`\`

## Troubleshooting

[ADD TROUBLESHOOTING]
`;

writeFileSync(file, template);
console.log(`Ban gayi: ${file}`);
console.log('Is file ko kholo, [ADD ...] wali jagah bharo, phir draft: false karo.');