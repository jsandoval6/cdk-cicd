import { handler } from "../services/hello";

describe('initial test', () => {
    test('initial test', async() => {
        const result = await handler( {} as any, {} as any );
        expect(result.statusCode).toBe(200);
    });
})


