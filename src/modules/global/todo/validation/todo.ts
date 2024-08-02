import {z} from 'zod';

export const idSchema = z
    .number({message: 'ID é requerido e deve ser do tipo Number'})
    .int({message: 'ID deve ser um número inteiro'})
    .positive({message: 'ID deve ser um número positivo'});

export const descricaoSchema = z
    .string({message: 'Descrição é requerido e deve ser do tipo String'})
    .min(0, {message: 'Descrição não pode estar vazia'})
    .max(254, {message: 'O tamanho máximo de descrição é 254 caracteres.'});
