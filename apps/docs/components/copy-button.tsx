'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@aryan_sehgal/forma-ui/button';
export function CopyButton({ text, label = 'Copy code' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setFailed(false);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setFailed(true);
    }
  }
  return (
    <>
      <Button size="icon" variant="ghost" aria-label={copied ? 'Copied' : label} onClick={copy}>
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </Button>
      <span className="sr-only" role="status">
        {copied
          ? 'Copied to clipboard'
          : failed
            ? 'Clipboard unavailable. Select and copy the text manually.'
            : ''}
      </span>
    </>
  );
}
