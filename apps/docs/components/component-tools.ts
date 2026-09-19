'use client';
import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { flushSync } from 'react-dom';
import type { ComponentDefinition } from './catalog';
import type { Values } from './demos';

type ModelContext = {
  registerTool: (
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean };
      execute: (input: unknown) => unknown;
    },
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};
/** Optional progressive enhancement. Unsupported browsers use the regular UI. */
export function useComponentTools(
  component: ComponentDefinition,
  values: Values,
  setValues: Dispatch<SetStateAction<Values>>,
) {
  const current = useRef(values);
  current.current = values;
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (tool: Parameters<ModelContext['registerTool']>[0]) => {
      try {
        void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(
          () => {},
        );
      } catch {
        /* Optional browser capability. */
      }
    };
    register({
      name: 'read_component_preview',
      title: 'Read component preview',
      description:
        'Read the current Forma component, available property controls, and preview values.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true },
      execute: () => ({
        component: component.slug,
        controls: component.controls,
        values: current.current,
      }),
    });
    register({
      name: 'configure_component_preview',
      title: 'Configure component preview',
      description:
        'Update the visible component playground. Changes affect only this local preview; nothing is published or saved.',
      inputSchema: {
        type: 'object',
        properties: {
          values: {
            type: 'object',
            properties: Object.fromEntries(
              component.controls.map((c) => [
                c.name,
                c.type === 'select'
                  ? { type: 'string', enum: c.options }
                  : c.type === 'boolean'
                    ? { type: 'boolean' }
                    : c.type === 'range'
                      ? { type: 'number', minimum: 0, maximum: 100 }
                      : { type: 'string', maxLength: 80 },
              ]),
            ),
            additionalProperties: false,
          },
        },
        required: ['values'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
      execute: (input) => {
        if (
          !input ||
          typeof input !== 'object' ||
          Array.isArray(input) ||
          Object.keys(input).some((k) => k !== 'values')
        )
          throw new Error('Expected an object containing values.');
        const patch = (input as { values?: unknown }).values;
        if (!patch || typeof patch !== 'object' || Array.isArray(patch))
          throw new Error('values must be an object.');
        for (const [key, value] of Object.entries(patch)) {
          const c = component.controls.find((c) => c.name === key);
          if (!c) throw new Error(`Unknown property: ${key}`);
          const valid =
            c.type === 'select'
              ? typeof value === 'string' && c.options?.includes(value)
              : c.type === 'boolean'
                ? typeof value === 'boolean'
                : c.type === 'range'
                  ? typeof value === 'number' &&
                    Number.isFinite(value) &&
                    value >= 0 &&
                    value <= 100
                  : typeof value === 'string' && value.length <= 80;
          if (!valid) throw new Error(`Invalid value for ${key}`);
        }
        const next = { ...current.current, ...patch } as Values;
        flushSync(() => setValues(next));
        current.current = next;
        return { component: component.slug, values: next };
      },
    });
    return () => lifecycle.abort();
  }, [component, setValues]);
}
