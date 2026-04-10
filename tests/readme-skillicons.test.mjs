import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

test('README uses supported skillicons slugs', () => {
  const match = readme.match(/https:\/\/skillicons\.dev\/icons\?i=([^"&\s]+)/);

  assert.ok(match, 'README should include a skillicons.dev URL');

  const slugs = match[1].split(',');

  assert.ok(
    !slugs.includes('python'),
    'skillicons.dev uses "py" for Python; "python" renders as an unknown icon',
  );
  assert.ok(slugs.includes('py'), 'README should use the supported Python skillicons slug');
});

test('README avoids unstable external stats cards', () => {
  assert.ok(
    !readme.includes('github-readme-stats.vercel.app'),
    'README should not embed github-readme-stats cards that can render as broken images on GitHub',
  );
});
