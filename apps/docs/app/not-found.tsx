import Link from 'next/link';
import { Button } from '@forma-design/ui';
export default function NotFound() {
  return (
    <div className="content-page">
      <div className="eyebrow">404 / NOT IN THE COLLECTION</div>
      <h1>A missing piece.</h1>
      <p>This page does not exist. Find your next building block in the component collection.</p>
      <Button asChild>
        <Link href="/">Back to the collection</Link>
      </Button>
    </div>
  );
}
