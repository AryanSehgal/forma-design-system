import { contrastRatio } from './contrast';
export function createTheme(accent: string, radius: number, font: string) {
  if (
    !/^#[0-9a-f]{6}$/i.test(accent) ||
    !Number.isFinite(radius) ||
    radius < 0 ||
    radius > 20 ||
    !['sans', 'humanist', 'serif'].includes(font)
  )
    throw new Error('Invalid theme configuration.');
  const onAccent =
    contrastRatio(accent, '#ffffff') >= contrastRatio(accent, '#151922') ? '#ffffff' : '#151922';
  const variables = {
    '--f-accent': accent,
    '--f-accent-hover': `color-mix(in srgb, ${accent} 85%, black)`,
    '--f-accent-soft': `color-mix(in srgb, ${accent} 10%, white)`,
    '--f-on-accent': onAccent,
    '--f-focus': accent,
    '--f-radius': `${radius}px`,
    '--f-font':
      font === 'sans'
        ? 'Arial, Helvetica, sans-serif'
        : font === 'humanist'
          ? 'Verdana, Geneva, sans-serif'
          : 'Georgia, serif',
  };
  return {
    onAccent,
    variables,
    css: `:root {\n${Object.entries(variables)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n')}\n}`,
  };
}
