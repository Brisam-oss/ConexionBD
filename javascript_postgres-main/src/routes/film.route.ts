import { Hono } from 'hono';
import { filmSchema } from '../schemas/film.schema.ts';
import { filmController } from '../controllers/film.controller.ts';
import { validateBody } from '../middlewares/validate.ts';
import {actorSchema} from "../schemas/actor_schema.ts";
import {ActorController} from "../controllers/actor.controller.ts";
import actorRouter from "./actor.route.ts"; // este es el nuevo middleware

const filmRouter = new Hono();

filmRouter.get('/films', async (): Promise<Response> => {
    const { status, body } = await filmController.getAll();
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

filmRouter.get('/films/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await filmController.getById(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

filmRouter.post(
    '/films',
    //validateBody(filmSchema), // ✅ validación personalizada
    async (c) => {
        //const bodyValidated = c.get('validatedBody'); // ya está validado
        const bodyRequest = await c.req.json();
        const { status, body } = await filmController.add(bodyRequest);
        return new Response(JSON.stringify(body), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
);

filmRouter.put('/films/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json();
    const { status, body: response } = await filmController.update(id, body);
    return new Response(JSON.stringify(response), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
});

filmRouter.delete('/films/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body: response } = await filmController.delete(id);
    return new Response(JSON.stringify(response), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
});

export default filmRouter;