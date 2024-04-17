/**
 * Integration test example for the `post` router
 */
import type { inferProcedureInput } from '@trpc/server';
import { createInnerTRPCContext } from '~/server/context';
import type { AppRouter } from '~/server/router';
import { createCaller } from '~/trpc/server';
import { expect, test, describe, it, mock } from 'bun:test';

describe('post router', () => {
  test('test router', async () => {
    const ctx = await createInnerTRPCContext({
      headers: undefined,
      session: null,
    });
    const caller = createCaller(ctx);
    const input: inferProcedureInput<AppRouter['test']['greet']> = {
      name: 'Human',
    };
    const result = await caller.test.greet(input);
    expect(result).toEqual({
      greeting: 'Hello Human',
    });
  });
  it.todo('should test something else');
});
