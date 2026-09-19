export type Control = {
  name: string;
  label: string;
  type: 'select' | 'boolean' | 'text' | 'range';
  options?: string[];
  defaultValue: string | boolean | number;
  description: string;
};
export type ComponentDefinition = {
  slug: string;
  name: string;
  category: 'Actions' | 'Forms' | 'Layout' | 'Feedback' | 'Navigation';
  description: string;
  controls: Control[];
  keyboard: string[][];
  notes: string[];
  composition?: boolean;
};
const variant = (options: string[], initial = 'primary'): Control => ({
  name: 'variant',
  label: 'Variant',
  type: 'select',
  options,
  defaultValue: initial,
  description: 'Visual treatment of the component.',
});
const disabled: Control = {
  name: 'disabled',
  label: 'Disabled',
  type: 'boolean',
  defaultValue: false,
  description: 'Prevents user interaction.',
};
const text = (label: string, value: string): Control => ({
  name: 'label',
  label,
  type: 'text',
  defaultValue: value,
  description: 'Visible content of the component.',
});
export const catalog: ComponentDefinition[] = [
  {
    slug: 'button',
    name: 'Button',
    category: 'Actions',
    description:
      'A clear invitation to take action. Flexible variants for every level of emphasis.',
    controls: [
      variant(['primary', 'secondary', 'outline', 'ghost', 'danger']),
      {
        name: 'size',
        label: 'Size',
        type: 'select',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
        description: 'Height, padding, and typography.',
      },
      text('Label', 'Continue'),
      disabled,
      {
        name: 'loading',
        label: 'Loading',
        type: 'boolean',
        defaultValue: false,
        description: 'Shows activity and prevents repeated actions.',
      },
    ],
    keyboard: [
      ['Tab', 'Move focus to the button.'],
      ['Enter / Space', 'Activate the focused button.'],
    ],
    notes: [
      'Use a verb that describes the action.',
      'Give icon-only buttons an accessible name.',
      'Loading buttons expose aria-busy and prevent repeated activation.',
    ],
  },
  {
    slug: 'input',
    name: 'Input',
    category: 'Forms',
    description: 'A familiar text field with clear labels, helpful descriptions, and error states.',
    controls: [
      text('Placeholder', 'you@example.com'),
      disabled,
      {
        name: 'invalid',
        label: 'Error state',
        type: 'boolean',
        defaultValue: false,
        description: 'Exposes aria-invalid and displays an error.',
      },
    ],
    keyboard: [
      ['Tab', 'Move focus into the field.'],
      ['Arrow keys', 'Move the text cursor.'],
    ],
    notes: [
      'Always connect a visible label to the field.',
      'Associate help and error text with aria-describedby.',
      'Use the appropriate input type and autocomplete value.',
    ],
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    category: 'Forms',
    description: 'Room for longer thoughts. A resizable, multiline field that fits your forms.',
    controls: [
      text('Placeholder', 'Tell us a little about your project…'),
      disabled,
      {
        name: 'invalid',
        label: 'Error state',
        type: 'boolean',
        defaultValue: false,
        description: 'Marks the field as invalid.',
      },
    ],
    keyboard: [
      ['Tab', 'Focus the field.'],
      ['Enter', 'Insert a new line.'],
    ],
    notes: [
      'Use a visible label and meaningful instructions.',
      'Keep the field resizable for longer content.',
    ],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'Forms',
    description: 'Let people choose one or more options, with checked and mixed states.',
    controls: [
      text('Label', 'Accept terms and conditions'),
      disabled,
      {
        name: 'indeterminate',
        label: 'Mixed state',
        type: 'boolean',
        defaultValue: false,
        description: 'Indicates a partially selected group.',
      },
    ],
    keyboard: [
      ['Tab', 'Focus the checkbox.'],
      ['Space', 'Toggle the selected state.'],
    ],
    notes: [
      'Pair each checkbox with a clickable label.',
      'Use mixed state for partially selected parent groups.',
    ],
  },
  {
    slug: 'switch',
    name: 'Switch',
    category: 'Forms',
    description: 'An immediate on-or-off choice for settings and preferences.',
    controls: [text('Label', 'Email notifications'), disabled],
    keyboard: [
      ['Tab', 'Focus the switch.'],
      ['Space / Enter', 'Toggle the setting.'],
    ],
    notes: [
      'Use a stable label that does not change with state.',
      'Use switches for settings that take effect immediately.',
    ],
  },
  {
    slug: 'select',
    name: 'Select',
    category: 'Forms',
    description: 'Choose one option from a compact, keyboard-friendly list.',
    controls: [disabled],
    keyboard: [
      ['Space / Enter', 'Open the list or choose an option.'],
      ['Arrow keys', 'Move between options.'],
      ['Type a letter', 'Jump to a matching option.'],
      ['Escape', 'Close and return focus.'],
    ],
    notes: [
      'Connect the trigger to a visible label.',
      'Disabled options are skipped during navigation.',
    ],
    composition: true,
  },
  {
    slug: 'badge',
    name: 'Badge',
    category: 'Feedback',
    description: 'Small labels that bring status, categories, and counts into focus.',
    controls: [
      variant(['neutral', 'brand', 'success', 'warning', 'danger'], 'success'),
      text('Label', 'Published'),
    ],
    keyboard: [['—', 'Static text; not a keyboard stop.']],
    notes: [
      'Communicate status with text, not color alone.',
      'Use a button instead when the label performs an action.',
    ],
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    category: 'Feedback',
    description: 'A recognizable identity, with reliable initials when an image is unavailable.',
    controls: [
      {
        name: 'size',
        label: 'Size',
        type: 'select',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'lg',
        description: 'Avatar dimensions.',
      },
      text('Initials', 'AS'),
    ],
    keyboard: [['—', 'Non-interactive identity content.']],
    notes: [
      'Provide a meaningful name through the alt prop.',
      'The fallback remains available when an image fails.',
    ],
  },
  {
    slug: 'progress',
    name: 'Progress',
    category: 'Feedback',
    description: 'Make completion visible with a smooth, determinate progress indicator.',
    controls: [
      {
        name: 'value',
        label: 'Progress',
        type: 'range',
        defaultValue: 64,
        description: 'Current progress from 0 to 100.',
      },
    ],
    keyboard: [['—', 'Read-only status; not a keyboard stop.']],
    notes: [
      'Provide an accessible name describing the task.',
      'Pass null for an indeterminate state.',
      'Values are clamped to the valid range.',
    ],
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    category: 'Feedback',
    description: 'A quiet placeholder that preserves layout while content is loading.',
    controls: [],
    keyboard: [['—', 'Decorative placeholder; hidden from assistive technology.']],
    notes: [
      'Mark the containing content region aria-busy while loading.',
      'Provide an accessible loading message.',
      'Motion respects the reduced-motion preference.',
    ],
  },
  {
    slug: 'card',
    name: 'Card',
    category: 'Layout',
    description: 'A flexible container for grouping related information and actions.',
    controls: [text('Title', 'Your next great idea')],
    keyboard: [['Tab', 'Move through interactive elements within the card.']],
    notes: [
      'Choose a heading level appropriate to the page.',
      'Keep action labels specific to the card content.',
    ],
    composition: true,
  },
  {
    slug: 'separator',
    name: 'Separator',
    category: 'Layout',
    description: 'A subtle boundary that gives content room to breathe.',
    controls: [
      {
        name: 'orientation',
        label: 'Orientation',
        type: 'select',
        options: ['horizontal', 'vertical'],
        defaultValue: 'horizontal',
        description: 'The direction of the divider.',
      },
    ],
    keyboard: [['—', 'No keyboard interaction.']],
    notes: [
      'Decorative by default; use decorative={false} for a semantic separator.',
      'A vertical separator needs a parent with a defined height.',
    ],
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Related views, one focused space. Switch content without leaving the page.',
    controls: [],
    keyboard: [
      ['Tab', 'Enter the selected tab or move into its panel.'],
      ['Left / Right', 'Move between tabs.'],
      ['Home / End', 'Jump to the first or last tab.'],
    ],
    notes: [
      'Label the tab list so its purpose is clear.',
      'Each trigger is linked to its corresponding panel.',
    ],
    composition: true,
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    category: 'Actions',
    description: 'A focused moment for decisions, forms, and details that need your attention.',
    controls: [text('Trigger label', 'Edit profile')],
    keyboard: [
      ['Enter / Space', 'Open the dialog.'],
      ['Tab / Shift+Tab', 'Move within the modal.'],
      ['Escape', 'Close and restore focus to the trigger.'],
    ],
    notes: [
      'Always include a title and description.',
      'Focus is contained inside the open modal.',
      'For destructive actions, use a dedicated confirmation pattern.',
    ],
    composition: true,
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Layout',
    description: 'Progressively reveal details while keeping the bigger picture clear.',
    controls: [],
    keyboard: [
      ['Tab', 'Focus a section heading.'],
      ['Enter / Space', 'Expand or collapse the section.'],
      ['Up / Down', 'Move between headings.'],
    ],
    notes: [
      'Use descriptive headings that make sense when collapsed.',
      'Expanded state is announced to assistive technology.',
    ],
    composition: true,
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Feedback',
    description: 'Brief, contextual help that appears on hover or keyboard focus.',
    controls: [text('Content', 'Add to your collection')],
    keyboard: [
      ['Tab', 'Focus the trigger to reveal the tooltip.'],
      ['Escape', 'Dismiss the tooltip.'],
    ],
    notes: [
      'Keep tooltips short and non-interactive.',
      'Essential instructions must also be visible elsewhere.',
      'Provide an accessible name on the trigger itself.',
    ],
    composition: true,
  },
];
export const getComponent = (slug: string) => catalog.find((c) => c.slug === slug);
export const defaults = (c: ComponentDefinition) =>
  Object.fromEntries(c.controls.map((p) => [p.name, p.defaultValue]));
