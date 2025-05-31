import { filmsRepos } from '../repositories/films.repo.ts';
import {ActorRepository} from "../repositories/actor.repos.ts";

export const filmService = {
    getAll: () => filmsRepos.findAll(),
    getById: (id: number) => filmsRepos.findById(id),
    add: (title: string, description: string, release_year:number, language_id:number) =>
        filmsRepos.add({ title, description, release_year, language_id }),

    update: (id: number, data: { title: string; description: string; release_year: number; language_id: number }) =>
        filmsRepos.update(id, data),

    delete: (id: number) => filmsRepos.delete(id),
};