import { Hono } from 'hono';
import { actorSchema } from '../schemas/actor_schema.ts';
import { ActorController } from '../controllers/actor.controller.ts';
import { validateBody } from '../middlewares/validate.ts'; // este es el nuevo middleware

const actorRouter = new Hono();

actorRouter.get('/actors', async (): Promise<Response> => {
    const { status, body } = await ActorController.getAll();
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

actorRouter.get('/actors/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await ActorController.getById(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

actorRouter.post(
    '/actors',
    validateBody(actorSchema), // ✅ validación personalizada
    async (c) => {
        const bodyValidated = c.get('validatedBody') as actorSchema; // ya está validado
        const { status, body } = await ActorController.add(bodyValidated );
        return new Response(JSON.stringify(body), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
);

actorRouter.put(
    '/actors/:id',
    validateBody(actorSchema),
    async (c) => {
        const id = Number(c.req.param('id'));
        const bodyValidated = c.get('validatedBody') as actorSchema;

        const { status, body } = await ActorController.update(id, bodyValidated);
        return new Response(JSON.stringify(body), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
);

actorRouter.delete('/actors/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await ActorController.remove(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

actorRouter.put(
    '/actors/:id',
    validateBody(actorSchema), // validación de entrada
    async (c) => {
        const id = Number(c.req.param('id'));
        const bodyValidated = c.get('validatedBody') as actorSchema;
        const { status, body } = await ActorController.update(id, bodyValidated);
        return new Response(JSON.stringify(body), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
);

actorRouter.delete('/actors/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await ActorController.remove(id);
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
});


export default actorRouter;
