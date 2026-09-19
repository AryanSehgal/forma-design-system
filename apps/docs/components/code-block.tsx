'use client';
import { Code2 } from 'lucide-react';
import { CopyButton } from './copy-button';
export function CodeBlock({ code, title = 'example.tsx' }: { code: string; title?: string }) {
  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>
          <Code2 size={14} />
          {title}
        </span>
        <CopyButton text={code} />
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
