import { createTheme } from '@/lib/theme';
export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  try {
    const { css } = createTheme(
      params.get('accent') ?? '#3158df',
      Number(params.get('radius') ?? 8),
      params.get('font') ?? 'sans',
    );
    return new Response(css, {
      headers: {
        'Content-Type': 'text/css; charset=utf-8',
        'Content-Disposition': 'attachment; filename="forma-theme.css"',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return Response.json(
      { error: 'Use a six-digit hex color, a radius from 0 to 20, and a supported font.' },
      { status: 400 },
    );
  }
}
