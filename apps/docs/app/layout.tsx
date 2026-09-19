import type { Metadata } from 'next';
import '@aryan_sehgal/forma-ui/styles.css';
import './globals.css';
import { Shell } from '@/components/shell';
export const metadata: Metadata = {
  title: { default: 'Forma — A thoughtful component library', template: '%s · Forma' },
  description:
    'Accessible React components, interactive documentation, and a design-token playground. Built with TypeScript and Radix primitives.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.fTheme=localStorage.getItem('forma-theme')==='dark'?'dark':'light'}catch(e){}`,
          }}
        />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
