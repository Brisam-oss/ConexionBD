import { filmService } from '../services/film.service.ts';

import {HttpResponse} from "../utils/http_reponse.ts";


export const filmController = {
    getAll: async () => {
        try {
            const actors = await filmService.getAll();
            return HttpResponse.ok(actors, "Películas recuperados correctamente");
        } catch (error) {
            return HttpResponse.error("Error al recuperar los actores");
        }
    },

    getById: async (id: number) => {
        try {
            const film = await filmService.getById(id)
            if (!film) {
                return HttpResponse.notFound("Película no encontrada");
            }
            return HttpResponse.ok([film], "Película encontrado");
        } catch (error) {
            return HttpResponse.error("Error al recuperar el actor");
        }
    },

    add: async (body: { title: string; description: string, release_year: number, language_id:number }) => {
        try {
            console.log(body);
            const newFilm = await filmService.add(body.title, body.description, body.release_year, body.language_id);
            return HttpResponse.created(newFilm, "Película creado");
        } catch (error) {
            return HttpResponse.error("Error al crear la película");
        }
    },

    update: async (id: number, body: { title: string; description: string; release_year: number; language_id: number }) => {
        try {
            const updatedFilm = await filmService.update(id, body);
            return HttpResponse.ok(updatedFilm, "Película actualizada");
        } catch (error) {
            return HttpResponse.error("Error al actualizar la película");
        }
    },

    delete: async (id: number) => {
        try {
            const deleted = await filmService.delete(id);
            return HttpResponse.ok(deleted, "Película eliminada");
        } catch (error) {
            return HttpResponse.error("Error al eliminar la película");
        }
    },

};