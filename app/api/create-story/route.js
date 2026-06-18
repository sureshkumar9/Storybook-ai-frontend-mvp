import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

function safeName(name) {
  if (!name) return '';
  return name.replace(/[^A-Za-z0-9_]/g, '');
}

function extractNameFromCode(code) {
  if (!code) return '';
  let match = code.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/);
  if (match) return match[1];
  match = code.match(/function\s+([A-Za-z0-9_]+)\s*\(/);
  if (match) return match[1];
  match = code.match(/const\s+([A-Za-z0-9_]+)\s*=\s*\(/);
  if (match) return match[1];
  match = code.match(/class\s+([A-Za-z0-9_]+)\s*/);
  if (match) return match[1];
  // export const Name = ...
  match = code.match(/export\s+(?:const|let|var)\s+([A-Za-z0-9_]+)\s*=/);
  if (match) return match[1];
  // fallback empty
  return '';
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { code = '', name: rawName = '' } = body;

    // prefer rawName from client if provided, otherwise try to extract from code
    const extracted = extractNameFromCode(code);
    const base = rawName || extracted || 'Generated';
    let candidate = safeName(base) || 'Generated';

    const repoRoot = process.cwd();
    const genDir = path.join(repoRoot, 'generated-components');
    await fs.mkdir(genDir, { recursive: true });

    // Ensure unique filename by appending a numeric suffix if needed
    let uniqueName = candidate;
    let counter = 0;
    while (true) {
      const componentPathCheck = path.join(genDir, `${uniqueName}.jsx`);
      try {
        await fs.access(componentPathCheck);
        // file exists, bump counter
        counter += 1;
        uniqueName = `${candidate}${counter}`;
      } catch (e) {
        // file does not exist -> good to use
        break;
      }
    }

    const componentPath = path.join(genDir, `${uniqueName}.jsx`);
    const storyPath = path.join(genDir, `${uniqueName}.stories.jsx`);

    await fs.writeFile(componentPath, code, 'utf8');


    const storyContent = `import React from 'react';
import ${uniqueName} from './${uniqueName}';

export default {
  title: 'Generated/${uniqueName}',
  component: ${uniqueName}
};

export const Default = () => <${uniqueName} />;
`;



    await fs.writeFile(storyPath, storyContent, 'utf8');

    const slug = uniqueName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const storyUrl = `http://localhost:6006/iframe.html?id=generated-${slug}--default`;

    return NextResponse.json({ success: true, name: uniqueName, componentPath, storyPath, storyUrl });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
