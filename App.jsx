import React, { useState, useEffect, useMemo, useRef } from "react";
import { Calendar, ShoppingCart, BookOpen, Shuffle, Lock, Unlock, Send, RefreshCw, Heart, EyeOff, GripVertical, ChevronDown, ChevronRight } from "lucide-react";

const PRATOS = [{"id": "P01", "nome": "Papilote de Frango", "proteina": "Frango", "tipo": "Principal", "porcoes": 4, "kcal": null}, {"id": "P02", "nome": "Bife Acebolado", "proteina": "Carne", "tipo": "Principal", "porcoes": 2, "kcal": null}, {"id": "P03", "nome": "Coq au Vin (Frango ao Vinho)", "proteina": "Frango", "tipo": "Principal", "porcoes": 4, "kcal": null}, {"id": "P04", "nome": "Frango ao Curry com Leite de Coco", "proteina": "Frango", "tipo": "Principal", "porcoes": 4, "kcal": null}, {"id": "P05", "nome": "Frango Grelhado com Mostarda e Mel", "proteina": "Frango", "tipo": "Principal", "porcoes": 4, "kcal": null}, {"id": "P06", "nome": "Frango Recheado com Espinafre e Queijo Feta", "proteina": "Frango", "tipo": "Principal", "porcoes": 4, "kcal": null}, {"id": "P07", "nome": "Salmao Grelhado com Molho de Abacaxi e Gengibre", "proteina": "Peixe", "tipo": "Principal", "porcoes": 4, "kcal": null}, {"id": "P08", "nome": "Salada com Molho Pesto", "proteina": "Vegetariano", "tipo": "Salada", "porcoes": 4, "kcal": null}, {"id": "P09", "nome": "Frango Assado com Parmesao", "proteina": "Frango", "tipo": "Principal", "porcoes": 4, "kcal": 158}, {"id": "P10", "nome": "Torta de Legumes Low Carb", "proteina": "Frango", "tipo": "Principal", "porcoes": 4, "kcal": null}, {"id": "P11", "nome": "Abobrinha Recheada com Ricota e Nozes", "proteina": "Vegetariano", "tipo": "Acompanhamento", "porcoes": 4, "kcal": null}, {"id": "P12", "nome": "Sopa Fria de Pimentao Amarelo com Iogurte", "proteina": "Vegetariano", "tipo": "Sopa", "porcoes": 4, "kcal": null}, {"id": "P13", "nome": "Robalo com Crosta de Castanha do Para e Limao", "proteina": "Peixe", "tipo": "Principal", "porcoes": 4, "kcal": null}, {"id": "P14", "nome": "Berinjela com Queijo", "proteina": "Vegetariano", "tipo": "Acompanhamento", "porcoes": 4, "kcal": 61}, {"id": "P15", "nome": "Omelete com Cogumelos", "proteina": "Ovo", "tipo": "Principal", "porcoes": 1, "kcal": 159}, {"id": "P16", "nome": "Pure de Batata com Alecrim", "proteina": "Vegetariano", "tipo": "Acompanhamento", "porcoes": 4, "kcal": null}, {"id": "P17", "nome": "Peito de Frango com Tomate", "proteina": "Frango", "tipo": "Principal", "porcoes": 4, "kcal": 188}, {"id": "P18", "nome": "File Mignon ao Molho Light", "proteina": "Carne", "tipo": "Principal", "porcoes": 6, "kcal": 153}, {"id": "P19", "nome": "Abobrinha Escabeche", "proteina": "Vegetariano", "tipo": "Acompanhamento", "porcoes": 3, "kcal": 63}, {"id": "P20", "nome": "Carne Assada com Alecrim", "proteina": "Carne", "tipo": "Principal", "porcoes": 4, "kcal": 176}, {"id": "P21", "nome": "Abobora no Azeite", "proteina": "Vegetariano", "tipo": "Acompanhamento", "porcoes": 4, "kcal": 37}, {"id": "P22", "nome": "Lasagna de Berinjela", "proteina": "Vegetariano", "tipo": "Principal", "porcoes": 4, "kcal": null}];
const ING = [{"pid": "P01", "nome": "Peito de frango (file)", "qtd": "4.0", "un": "un", "cat": "Acougue/Proteina"}, {"pid": "P01", "nome": "Cebola", "qtd": "2.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P01", "nome": "Tomate sweet grape", "qtd": "16.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P01", "nome": "Tomilho", "qtd": "4.0", "un": "ramos", "cat": "Hortifruti"}, {"pid": "P01", "nome": "Vinho branco", "qtd": "0.5", "un": "xicara", "cat": "Mercearia/Secos"}, {"pid": "P01", "nome": "Paprica doce", "qtd": "2.0", "un": "colher (cha)", "cat": "Mercearia/Secos"}, {"pid": "P01", "nome": "Cominho", "qtd": "0.5", "un": "colher (cha)", "cat": "Mercearia/Secos"}, {"pid": "P01", "nome": "Azeite", "qtd": "0.25", "un": "xicara", "cat": "Mercearia/Secos"}, {"pid": "P01", "nome": "Sal e pimenta-do-reino", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P02", "nome": "Bife de contrafile (alcatra/coxao mole)", "qtd": "2.0", "un": "un", "cat": "Acougue/Proteina"}, {"pid": "P02", "nome": "Cebola", "qtd": "1.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P02", "nome": "Agua", "qtd": "2.0", "un": "colher (sopa)", "cat": "Outros"}, {"pid": "P02", "nome": "Vinagre de vinho branco", "qtd": "2.0", "un": "colher (cha)", "cat": "Mercearia/Secos"}, {"pid": "P02", "nome": "Manteiga", "qtd": "1.0", "un": "colher (cha)", "cat": "Laticinios/Ovos"}, {"pid": "P02", "nome": "Azeite", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P02", "nome": "Sal e pimenta-do-reino", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P03", "nome": "Coxas e sobrecoxas de frango", "qtd": "", "un": "A gosto", "cat": "Acougue/Proteina"}, {"pid": "P03", "nome": "Cebola", "qtd": "1.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P03", "nome": "Cenoura", "qtd": "2.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P03", "nome": "Alho", "qtd": "2.0", "un": "dentes", "cat": "Hortifruti"}, {"pid": "P03", "nome": "Vinho tinto", "qtd": "1.0", "un": "garrafa", "cat": "Mercearia/Secos"}, {"pid": "P03", "nome": "Caldo de galinha", "qtd": "1.0", "un": "xicara", "cat": "Mercearia/Secos"}, {"pid": "P03", "nome": "Ervas frescas (tomilho, louro)", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P03", "nome": "Champignons frescos", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P03", "nome": "Manteiga", "qtd": "", "un": "A gosto", "cat": "Laticinios/Ovos"}, {"pid": "P03", "nome": "Sal e pimenta", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P04", "nome": "Peito de frango (em cubos)", "qtd": "", "un": "A gosto", "cat": "Acougue/Proteina"}, {"pid": "P04", "nome": "Cebola", "qtd": "1.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P04", "nome": "Alho", "qtd": "2.0", "un": "dentes", "cat": "Hortifruti"}, {"pid": "P04", "nome": "Curry em po", "qtd": "1.0", "un": "colher (sopa)", "cat": "Mercearia/Secos"}, {"pid": "P04", "nome": "Leite de coco", "qtd": "1.0", "un": "lata", "cat": "Mercearia/Secos"}, {"pid": "P04", "nome": "Azeite", "qtd": "1.0", "un": "colher (sopa)", "cat": "Mercearia/Secos"}, {"pid": "P04", "nome": "Coentro fresco", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P04", "nome": "Sal e pimenta", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P05", "nome": "Peito de frango", "qtd": "", "un": "A gosto", "cat": "Acougue/Proteina"}, {"pid": "P05", "nome": "Mostarda Dijon", "qtd": "3.0", "un": "colher (sopa)", "cat": "Mercearia/Secos"}, {"pid": "P05", "nome": "Mel", "qtd": "2.0", "un": "colher (sopa)", "cat": "Mercearia/Secos"}, {"pid": "P05", "nome": "Vinagre balsamico", "qtd": "1.0", "un": "colher (sopa)", "cat": "Mercearia/Secos"}, {"pid": "P05", "nome": "Ervas frescas (manjericao, tomilho)", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P05", "nome": "Sal e pimenta", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P06", "nome": "Peito de frango", "qtd": "", "un": "A gosto", "cat": "Acougue/Proteina"}, {"pid": "P06", "nome": "Espinafre fresco", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P06", "nome": "Queijo feta", "qtd": "", "un": "A gosto", "cat": "Laticinios/Ovos"}, {"pid": "P06", "nome": "Azeite de oliva", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P06", "nome": "Suco de limao", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P06", "nome": "Ervas frescas (salsa, cebolinha)", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P06", "nome": "Sal e pimenta", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P07", "nome": "File de salmao", "qtd": "", "un": "A gosto", "cat": "Acougue/Proteina"}, {"pid": "P07", "nome": "Suco de abacaxi", "qtd": "1.0", "un": "xicara", "cat": "Mercearia/Secos"}, {"pid": "P07", "nome": "Gengibre ralado", "qtd": "2.0", "un": "colher (sopa)", "cat": "Hortifruti"}, {"pid": "P07", "nome": "Mel", "qtd": "1.0", "un": "colher (sopa)", "cat": "Mercearia/Secos"}, {"pid": "P07", "nome": "Coentro fresco", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P07", "nome": "Sal e pimenta", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P08", "nome": "Folhas verdes (alface/rucula)", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P08", "nome": "Rabanete", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P08", "nome": "Manjericao", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P08", "nome": "Alho", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P08", "nome": "Nozes", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P08", "nome": "Parmesao ralado", "qtd": "", "un": "A gosto", "cat": "Laticinios/Ovos"}, {"pid": "P08", "nome": "Azeite", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P08", "nome": "Sal", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P09", "nome": "Coxa de frango grande (sem pele)", "qtd": "4.0", "un": "un", "cat": "Acougue/Proteina"}, {"pid": "P09", "nome": "Alho", "qtd": "1.0", "un": "dente", "cat": "Hortifruti"}, {"pid": "P09", "nome": "Cebola", "qtd": "0.5", "un": "un", "cat": "Hortifruti"}, {"pid": "P09", "nome": "Requeijao light", "qtd": "3.0", "un": "colher (sobremesa)", "cat": "Laticinios/Ovos"}, {"pid": "P09", "nome": "Parmesao ralado", "qtd": "3.0", "un": "colher (sobremesa)", "cat": "Laticinios/Ovos"}, {"pid": "P10", "nome": "Couve-flor", "qtd": "150.0", "un": "g", "cat": "Hortifruti"}, {"pid": "P10", "nome": "Brocolis", "qtd": "150.0", "un": "g", "cat": "Hortifruti"}, {"pid": "P10", "nome": "Cenoura", "qtd": "150.0", "un": "g", "cat": "Hortifruti"}, {"pid": "P10", "nome": "Peito de frango", "qtd": "250.0", "un": "g", "cat": "Acougue/Proteina"}, {"pid": "P10", "nome": "Cebola", "qtd": "0.5", "un": "un", "cat": "Hortifruti"}, {"pid": "P10", "nome": "Tomate sweet grape", "qtd": "10.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P10", "nome": "Creme de ricota", "qtd": "150.0", "un": "g", "cat": "Laticinios/Ovos"}, {"pid": "P10", "nome": "Ovos", "qtd": "3.0", "un": "un", "cat": "Laticinios/Ovos"}, {"pid": "P10", "nome": "Sal rosa ou marinho", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P11", "nome": "Abobrinha grande", "qtd": "2.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P11", "nome": "Ricota esfarelada", "qtd": "300.0", "un": "g", "cat": "Laticinios/Ovos"}, {"pid": "P11", "nome": "Cebola", "qtd": "0.5", "un": "un", "cat": "Hortifruti"}, {"pid": "P11", "nome": "Alho", "qtd": "1.0", "un": "dente", "cat": "Hortifruti"}, {"pid": "P11", "nome": "Nozes", "qtd": "0.25", "un": "xicara", "cat": "Mercearia/Secos"}, {"pid": "P11", "nome": "Azeite", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P11", "nome": "Parmesao ralado", "qtd": "", "un": "A gosto", "cat": "Laticinios/Ovos"}, {"pid": "P11", "nome": "Hortela", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P11", "nome": "Salsinha", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P11", "nome": "Noz-moscada", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P11", "nome": "Sal e pimenta-do-reino", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P12", "nome": "Pimentao amarelo", "qtd": "3.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P12", "nome": "Iogurte natural sem acucar (170g)", "qtd": "3.0", "un": "potes", "cat": "Laticinios/Ovos"}, {"pid": "P12", "nome": "Cominho em po", "qtd": "0.5", "un": "colher (cha)", "cat": "Mercearia/Secos"}, {"pid": "P12", "nome": "Sal", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P12", "nome": "Croutons", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P12", "nome": "Sementes de girassol", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P13", "nome": "Posta de robalo (~150g)", "qtd": "4.0", "un": "un", "cat": "Acougue/Proteina"}, {"pid": "P13", "nome": "Farinha de mandioca flocada (biju)", "qtd": "0.5", "un": "xicara", "cat": "Mercearia/Secos"}, {"pid": "P13", "nome": "Castanha-do-para", "qtd": "0.25", "un": "xicara", "cat": "Mercearia/Secos"}, {"pid": "P13", "nome": "Manteiga gelada", "qtd": "50.0", "un": "g", "cat": "Laticinios/Ovos"}, {"pid": "P13", "nome": "Limao (raspas)", "qtd": "1.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P13", "nome": "Azeite", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P13", "nome": "Sal e pimenta-do-reino", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P14", "nome": "Berinjela grande", "qtd": "1.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P14", "nome": "Alho", "qtd": "1.0", "un": "dente", "cat": "Hortifruti"}, {"pid": "P14", "nome": "Passata de tomate", "qtd": "5.0", "un": "colher (sopa)", "cat": "Mercearia/Secos"}, {"pid": "P14", "nome": "Mucarela", "qtd": "2.0", "un": "fatias", "cat": "Laticinios/Ovos"}, {"pid": "P14", "nome": "Azeite (untar)", "qtd": "0.5", "un": "colher (sobremesa)", "cat": "Mercearia/Secos"}, {"pid": "P14", "nome": "Ervas finas", "qtd": "1.0", "un": "colher (sopa)", "cat": "Mercearia/Secos"}, {"pid": "P15", "nome": "Gema", "qtd": "1.0", "un": "un", "cat": "Laticinios/Ovos"}, {"pid": "P15", "nome": "Claras", "qtd": "3.0", "un": "un", "cat": "Laticinios/Ovos"}, {"pid": "P15", "nome": "Champignon fresco fatiado", "qtd": "0.5", "un": "xicara", "cat": "Hortifruti"}, {"pid": "P15", "nome": "Alho", "qtd": "1.0", "un": "dente", "cat": "Hortifruti"}, {"pid": "P15", "nome": "Azeite", "qtd": "1.0", "un": "colher (cha)", "cat": "Mercearia/Secos"}, {"pid": "P15", "nome": "Salsinha", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P15", "nome": "Tomate (em cubinhos)", "qtd": "0.5", "un": "un", "cat": "Hortifruti"}, {"pid": "P15", "nome": "Sal", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P16", "nome": "Batata", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P16", "nome": "Margarina", "qtd": "", "un": "A gosto", "cat": "Laticinios/Ovos"}, {"pid": "P16", "nome": "Alho", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P16", "nome": "Leite", "qtd": "", "un": "A gosto", "cat": "Laticinios/Ovos"}, {"pid": "P16", "nome": "Alecrim", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P16", "nome": "Sal", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P17", "nome": "File de peito de frango (100g)", "qtd": "4.0", "un": "un", "cat": "Acougue/Proteina"}, {"pid": "P17", "nome": "Alho", "qtd": "1.0", "un": "dente", "cat": "Hortifruti"}, {"pid": "P17", "nome": "Azeite", "qtd": "1.0", "un": "colher (sobremesa)", "cat": "Mercearia/Secos"}, {"pid": "P17", "nome": "Tomate (em rodelas)", "qtd": "1.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P17", "nome": "Molho de tomate", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P17", "nome": "Cebola", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P17", "nome": "Sal", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P18", "nome": "File mignon ou contra file em bifes", "qtd": "500.0", "un": "g", "cat": "Acougue/Proteina"}, {"pid": "P18", "nome": "Azeite", "qtd": "1.0", "un": "colher (sobremesa)", "cat": "Mercearia/Secos"}, {"pid": "P18", "nome": "Mostarda", "qtd": "4.0", "un": "colher (sopa)", "cat": "Mercearia/Secos"}, {"pid": "P18", "nome": "Requeijao", "qtd": "4.0", "un": "colher (sopa)", "cat": "Laticinios/Ovos"}, {"pid": "P18", "nome": "Sal e pimenta-do-reino", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P19", "nome": "Cebola (rodelas finas)", "qtd": "1.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P19", "nome": "Azeite de oliva", "qtd": "1.0", "un": "colher (sobremesa)", "cat": "Mercearia/Secos"}, {"pid": "P19", "nome": "Salsinha", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P19", "nome": "Alho", "qtd": "2.0", "un": "dentes", "cat": "Hortifruti"}, {"pid": "P19", "nome": "Abobrinha (fatiada)", "qtd": "1.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P19", "nome": "Azeitonas picadas", "qtd": "25.0", "un": "g", "cat": "Mercearia/Secos"}, {"pid": "P19", "nome": "Sal", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P20", "nome": "Lagarto", "qtd": "400.0", "un": "g", "cat": "Acougue/Proteina"}, {"pid": "P20", "nome": "Azeite", "qtd": "1.0", "un": "colher (sobremesa)", "cat": "Mercearia/Secos"}, {"pid": "P20", "nome": "Agua", "qtd": "1.0", "un": "xicara", "cat": "Outros"}, {"pid": "P20", "nome": "Vinho branco", "qtd": "0.25", "un": "xicara", "cat": "Mercearia/Secos"}, {"pid": "P20", "nome": "Alho", "qtd": "1.0", "un": "dente", "cat": "Hortifruti"}, {"pid": "P20", "nome": "Alecrim seco", "qtd": "1.0", "un": "colher (cha)", "cat": "Mercearia/Secos"}, {"pid": "P20", "nome": "Cebola media", "qtd": "1.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P20", "nome": "Sal e pimenta-do-reino", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P21", "nome": "Abobrinha", "qtd": "200.0", "un": "g", "cat": "Hortifruti"}, {"pid": "P21", "nome": "Abobora", "qtd": "200.0", "un": "g", "cat": "Hortifruti"}, {"pid": "P21", "nome": "Azeite", "qtd": "1.0", "un": "colher (sopa)", "cat": "Mercearia/Secos"}, {"pid": "P21", "nome": "Alho (em fatias)", "qtd": "2.0", "un": "dentes", "cat": "Hortifruti"}, {"pid": "P21", "nome": "Manjericao e hortela", "qtd": "", "un": "A gosto", "cat": "Hortifruti"}, {"pid": "P21", "nome": "Folha de louro", "qtd": "1.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P21", "nome": "Vinagre", "qtd": "0.5", "un": "xicara", "cat": "Mercearia/Secos"}, {"pid": "P21", "nome": "Sal e pimenta-do-reino", "qtd": "", "un": "A gosto", "cat": "Mercearia/Secos"}, {"pid": "P22", "nome": "Berinjela", "qtd": "3.0", "un": "un", "cat": "Hortifruti"}, {"pid": "P22", "nome": "Molho de tomate caseiro", "qtd": "2.0", "un": "xicara", "cat": "Mercearia/Secos"}, {"pid": "P22", "nome": "Mucarela ralada", "qtd": "300.0", "un": "g", "cat": "Laticinios/Ovos"}, {"pid": "P22", "nome": "Parmesao ralado", "qtd": "", "un": "A gosto", "cat": "Laticinios/Ovos"}];

// ---------------- lógica ----------------
const PRATO_UNICO = new Set(["P10", "P15", "P22"]);
const TIPOS_ACOMP = ["Acompanhamento", "Salada", "Sopa"];
const DIAS = ["Seg", "Ter", "Qua", "Qui"];

const STAPLES = new Set(["azeite","sal","sal e pimenta","sal rosa","pimenta","vinagre","vinagre balsamico","mostarda","mel","paprica doce","cominho","curry em po","alecrim","alecrim seco","noz-moscada","ervas finas","ervas frescas","nozes","castanha-do-para","farinha de mandioca flocada","azeitonas picadas","caldo de galinha","molho de tomate","passata de tomate","leite de coco","sementes de girassol","croutons","agua","margarina"]);
const QUALIF = new Set(["grande","grandes","media","medias","medio","pequena","pequeno","fatiada","fatiadas","fatiado","ralado","ralada","esfarelada","gelada","fresco","fresca","frescas","frescos","seco","seca","light","em","rodelas","cubos","cubinhos","fatias","finas","fino"]);
const SINON = {"file de peito de frango":"peito de frango","coxa de frango":"frango (coxa/sobrecoxa)","coxas e sobrecoxas de frango":"frango (coxa/sobrecoxa)","bife de contrafile":"contrafile","posta de robalo":"robalo","file de salmao":"salmao","file mignon ou contra file":"file mignon","azeite de oliva":"azeite","pimenta-do-reino":"pimenta","sal e pimenta-do-reino":"sal e pimenta"};
const UNIT_PLURAL = {"dentes":"dente","fatias":"fatia","potes":"pote","ramos":"ramo","postas":"posta","latas":"lata","garrafas":"garrafa","unidades":"un","unidade":"un"};
const IGNORAR = new Set(["agua"]);
const PROT_COR = { Frango:"#C8892B", Carne:"#A24B3C", Peixe:"#3E6E8E", Vegetariano:"#4E7A4A", Ovo:"#B89020" };

const semAcento = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
function canon(nome) {
  let base = semAcento(nome.split("(")[0].trim().toLowerCase());
  for (const k in SINON) if (base.startsWith(k)) return SINON[k];
  base = base.split(/\s+/).filter((w) => !QUALIF.has(w)).join(" ").trim();
  return SINON[base] || base;
}
function score(p, usadosProt, vespera, prefs) {
  let s = prefs.fav.includes(p.id) ? 2 : 1;
  s -= 3 * (usadosProt[p.proteina] || 0);
  if (p.proteina === vespera) s -= 5;
  s += Math.random();
  return s;
}
function escolher(pool, usados, usadosProt, vespera, prefs) {
  let cand = pool.filter((p) => !usados.has(p.id));
  if (!cand.length) cand = pool;
  return cand.reduce((a, b) => (score(b, usadosProt, vespera, prefs) > score(a, usadosProt, vespera, prefs) ? b : a));
}
const ehAcomp = (p) => TIPOS_ACOMP.includes(p.tipo);
function pools(prefs, evitar) {
  const hide = new Set(prefs.hide);
  let prin = PRATOS.filter((p) => p.tipo === "Principal" && !hide.has(p.id) && !evitar.has(p.id));
  if (prin.length < DIAS.length) prin = PRATOS.filter((p) => p.tipo === "Principal" && !hide.has(p.id));
  let aco = PRATOS.filter((p) => ehAcomp(p) && !hide.has(p.id) && !evitar.has(p.id));
  if (aco.length < DIAS.length) aco = PRATOS.filter((p) => ehAcomp(p) && !hide.has(p.id));
  return { prin, aco };
}
function gerarSemana(prev, locked, prefs, evitar) {
  evitar = evitar || new Set();
  const { prin, aco } = pools(prefs, evitar);
  const plano = [], usados = new Set(), usadosProt = {};
  let vespera = null;
  for (let i = 0; i < DIAS.length; i++) {
    let p, a;
    if (locked.has(i) && prev && prev[i]) { p = prev[i].principal; a = prev[i].acomp; }
    else { p = escolher(prin, usados, usadosProt, vespera, prefs); a = PRATO_UNICO.has(p.id) ? null : escolher(aco, usados, usadosProt, null, prefs); }
    usados.add(p.id); if (a) usados.add(a.id);
    usadosProt[p.proteina] = (usadosProt[p.proteina] || 0) + 1;
    plano.push({ principal: p, acomp: a, proteina: p.proteina });
    vespera = p.proteina;
  }
  return plano;
}
function trocarDia(plano, idx, prefs, evitar) {
  evitar = evitar || new Set();
  const { prin, aco } = pools(prefs, evitar);
  const usados = new Set();
  plano.forEach((d, i) => { if (i !== idx) { usados.add(d.principal.id); if (d.acomp) usados.add(d.acomp.id); } });
  usados.add(plano[idx].principal.id);
  const vespera = idx > 0 ? plano[idx - 1].proteina : null;
  const usadosProt = {};
  plano.forEach((d, i) => { if (i !== idx) usadosProt[d.proteina] = (usadosProt[d.proteina] || 0) + 1; });
  const p = escolher(prin, usados, usadosProt, vespera, prefs); usados.add(p.id);
  const a = PRATO_UNICO.has(p.id) ? null : escolher(aco, usados, usadosProt, null, prefs);
  const novo = plano.slice();
  novo[idx] = { principal: p, acomp: a, proteina: p.proteina };
  return novo;
}
function listaDeCompras(plano) {
  const ids = new Set();
  plano.forEach((d) => { ids.add(d.principal.id); if (d.acomp) ids.add(d.acomp.id); });
  const sel = ING.filter((r) => ids.has(r.pid));
  const agg = {};
  sel.forEach((r) => {
    const nc = canon(r.nome);
    if (IGNORAR.has(nc)) return;
    const un = UNIT_PLURAL[r.un] || r.un;
    if (!agg[nc]) agg[nc] = { unidades: {}, gosto: false, cat: r.cat, rotulo: {} };
    const a = agg[nc];
    a.cat = r.cat;
    const rot = r.nome.split("(")[0].trim();
    a.rotulo[rot] = (a.rotulo[rot] || 0) + 1;
    const num = parseFloat(String(r.qtd).replace(",", "."));
    if (!isNaN(num) && un !== "A gosto" && String(r.qtd).trim() !== "") a.unidades[un] = (a.unidades[un] || 0) + num;
    else a.gosto = true;
  });
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const comprar = [], despensa = new Set();
  for (const nc in agg) {
    const a = agg[nc];
    const rotulo = cap(Object.entries(a.rotulo).sort((x, y) => y[1] - x[1])[0][0]);
    if (STAPLES.has(nc)) { despensa.add(rotulo); continue; }
    const us = Object.keys(a.unidades);
    if (us.length) us.forEach((un) => {
      let q = Math.round(a.unidades[un] * 100) / 100; if (q === Math.floor(q)) q = Math.floor(q);
      comprar.push({ cat: a.cat, nome: rotulo, qtd: String(q).replace(".", ","), un });
    });
    else comprar.push({ cat: a.cat, nome: rotulo, qtd: "a gosto", un: "" });
  }
  const ordem = ["Acougue/Proteina", "Hortifruti", "Laticinios/Ovos", "Mercearia/Secos", "Outros"];
  comprar.sort((x, y) => (ordem.indexOf(x.cat) - ordem.indexOf(y.cat)) || x.nome.localeCompare(y.nome));
  return { comprar, despensa: [...despensa].sort((a, b) => a.localeCompare(b)) };
}
const CAT_LABEL = { "Acougue/Proteina": "Açougue", Hortifruti: "Hortifruti", "Laticinios/Ovos": "Laticínios e ovos", "Mercearia/Secos": "Mercearia", Outros: "Outros" };
function mensagem(plano, comprar, despensa) {
  const L = ["*🍽️ Cardápio da Semana*", ""];
  plano.forEach((d, i) => { L.push(`*${DIAS[i]}* — ${d.principal.nome}`); if (d.acomp) L.push(`        _+ ${d.acomp.nome}_`); });
  L.push("", "*🛒 Lista de Compras*", "");
  let cat = null;
  comprar.forEach((r) => { if (r.cat !== cat) { cat = r.cat; L.push(`_${CAT_LABEL[cat] || cat}_`); } L.push(`• ${r.nome}: ${r.qtd}${r.un ? " " + r.un : ""}`); });
  if (despensa.length) { L.push("", "_🧂 Conferir na despensa_"); L.push("• " + despensa.join(", ")); }
  return L.join("\n");
}

// ---------------- persistência (localStorage) ----------------
const KEY = "cardapio:";
function load(k, fb) { try { const v = localStorage.getItem(KEY + k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } }
function save(k, v) { try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch (e) {} }

// ---------------- UI ----------------
const PAPEL = "#FAF6EE", TINTA = "#1E3A32", MUTE = "#6B7A6F", VERDE = "#2E7D5B", ACAFRAO = "#C8892B", LINHA = "#E4DDCD";
function Chip({ prot }) {
  return <span className="chip" style={{ background: PROT_COR[prot] + "22", color: PROT_COR[prot], borderColor: PROT_COR[prot] + "55" }}>{prot}</span>;
}

export default function App() {
  const [tab, setTab] = useState("semana");
  const [prefs, setPrefs] = useState(() => load("prefs", { fav: [], hide: [] }));
  const [anterior, setAnterior] = useState(() => load("anterior", null));
  const [plano, setPlano] = useState(() => load("semana", null) || gerarSemana(null, new Set(), load("prefs", { fav: [], hide: [] }), new Set()));
  const [locked, setLocked] = useState(() => load("locked", []));
  const [verAnterior, setVerAnterior] = useState(false);

  const cardRefs = useRef([]);
  const dragRef = useRef(null);
  const [dragVis, setDragVis] = useState(null);

  useEffect(() => { save("semana", plano); }, [plano]);
  useEffect(() => { save("anterior", anterior); }, [anterior]);
  useEffect(() => { save("prefs", prefs); }, [prefs]);
  useEffect(() => { save("locked", locked); }, [locked]);

  const { comprar, despensa } = useMemo(() => plano ? listaDeCompras(plano) : { comprar: [], despensa: [] }, [plano]);
  const lockedSet = useMemo(() => new Set(locked), [locked]);
  const evitar = useMemo(() => new Set(anterior ? anterior.flatMap((d) => [d.principal.id, d.acomp ? d.acomp.id : null]).filter(Boolean) : []), [anterior]);

  const novaSemana = () => {
    const evit = new Set(plano.flatMap((d) => [d.principal.id, d.acomp ? d.acomp.id : null]).filter(Boolean));
    setAnterior(plano);
    setPlano(gerarSemana(plano, lockedSet, prefs, evit));
    setVerAnterior(true);
  };
  const trocar = (i) => setPlano(trocarDia(plano, i, prefs, evitar));
  const toggleLock = (i) => setLocked((l) => l.includes(i) ? l.filter((x) => x !== i) : [...l, i]);
  const toggleFav = (id) => setPrefs((p) => ({ ...p, fav: p.fav.includes(id) ? p.fav.filter((x) => x !== id) : [...p.fav, id], hide: p.hide.filter((x) => x !== id) }));
  const toggleHide = (id) => setPrefs((p) => ({ ...p, hide: p.hide.includes(id) ? p.hide.filter((x) => x !== id) : [...p.hide, id], fav: p.fav.filter((x) => x !== id) }));

  const onGripDown = (e, i) => { e.currentTarget.setPointerCapture(e.pointerId); dragRef.current = i; setDragVis(i); };
  const onGripMove = (e) => {
    if (dragRef.current === null) return;
    const y = e.clientY; let target = dragRef.current;
    for (let k = 0; k < plano.length; k++) {
      const el = cardRefs.current[k]; if (!el) continue;
      const r = el.getBoundingClientRect();
      if (y < r.top + r.height / 2) { target = k; break; }
      target = k;
    }
    if (target !== dragRef.current) {
      setPlano((p) => { const a = p.slice(); const [m] = a.splice(dragRef.current, 1); a.splice(target, 0, m); return a; });
      dragRef.current = target; setDragVis(target);
    }
  };
  const onGripUp = () => { dragRef.current = null; setDragVis(null); };

  const waLink = plano ? "https://wa.me/?text=" + encodeURIComponent(mensagem(plano, comprar, despensa)) : "#";

  return (
    <div className="wrap">
      <style>{CSS}</style>
      <header className="top">
        <div className="kicker">Cardápio da casa · Seg a Qui</div>
        <h1 className="brand">A Semana à Mesa</h1>
      </header>

      <nav className="tabs">
        {[["semana", "Semana", Calendar], ["compras", "Compras", ShoppingCart], ["pratos", "Pratos", BookOpen]].map(([k, label, Icon]) => (
          <button key={k} className={"tab" + (tab === k ? " on" : "")} onClick={() => setTab(k)}><Icon size={16} /> {label}</button>
        ))}
      </nav>

      {tab === "semana" && (
        <main className="list">
          {anterior && (
            <div className="prev">
              <button className="prevtoggle" onClick={() => setVerAnterior((v) => !v)}>
                {verAnterior ? <ChevronDown size={15} /> : <ChevronRight size={15} />} Semana anterior
              </button>
              {verAnterior && (
                <div className="prevlist">
                  {anterior.map((d, i) => (<div key={i} className="prevrow"><b>{DIAS[i]}</b> {d.principal.nome}{d.acomp ? <i> + {d.acomp.nome}</i> : ""}</div>))}
                  <div className="prevnote">Esses pratos não se repetem na semana nova.</div>
                </div>
              )}
            </div>
          )}
          <p className="dragtip">Arraste pelo <GripVertical size={13} style={{ verticalAlign: "-2px" }} /> para trocar os pratos de dia.</p>
          {plano.map((d, i) => (
            <article key={i} ref={(el) => (cardRefs.current[i] = el)}
              className={"day" + (dragVis === i ? " dragging" : "")} style={{ borderLeftColor: PROT_COR[d.proteina] }}>
              <div className="dayhead">
                <span className="dayname">{DIAS[i]}</span>
                <div className="dayacts">
                  <button className="icon grip" title="Arrastar" onPointerDown={(e) => onGripDown(e, i)} onPointerMove={onGripMove} onPointerUp={onGripUp} onPointerCancel={onGripUp}><GripVertical size={16} /></button>
                  <button className="icon" title={lockedSet.has(i) ? "Soltar" : "Manter na próxima semana"} onClick={() => toggleLock(i)}>{lockedSet.has(i) ? <Lock size={15} /> : <Unlock size={15} />}</button>
                  <button className="icon" title="Trocar prato" onClick={() => trocar(i)}><Shuffle size={15} /></button>
                </div>
              </div>
              <h2 className="dish">{d.principal.nome}</h2>
              <div className="meta"><Chip prot={d.proteina} />{d.acomp ? <span className="side">+ {d.acomp.nome}</span> : <span className="side solo">prato único</span>}</div>
            </article>
          ))}
        </main>
      )}

      {tab === "compras" && (
        <main className="shop">
          {["Acougue/Proteina", "Hortifruti", "Laticinios/Ovos", "Mercearia/Secos", "Outros"].map((cat) => {
            const itens = comprar.filter((c) => c.cat === cat);
            if (!itens.length) return null;
            return (<section key={cat} className="grp"><h3 className="grphead">{CAT_LABEL[cat] || cat}</h3>
              {itens.map((c, j) => (<label key={j} className="row"><input type="checkbox" /><span className="rname">{c.nome}</span><span className="rqtd">{c.qtd}{c.un ? " " + c.un : ""}</span></label>))}
            </section>);
          })}
          {despensa.length > 0 && (<section className="grp pantry"><h3 className="grphead">Conferir na despensa</h3><p className="pantryitems">{despensa.join(" · ")}</p></section>)}
        </main>
      )}

      {tab === "pratos" && (
        <main className="cat">
          <p className="hint">Toque no coração pra favoritar (aparece mais) ou no olho pra esconder um prato.</p>
          {PRATOS.map((p) => {
            const fav = prefs.fav.includes(p.id), hid = prefs.hide.includes(p.id);
            return (<div key={p.id} className={"catrow" + (hid ? " hid" : "")}>
              <div className="catinfo"><span className="catname">{p.nome}</span><div className="catmeta"><Chip prot={p.proteina} /><span className="cattipo">{p.tipo}{p.kcal ? ` · ${p.kcal} kcal` : ""}</span></div></div>
              <div className="catacts"><button className={"icon" + (fav ? " act" : "")} onClick={() => toggleFav(p.id)}><Heart size={16} fill={fav ? ACAFRAO : "none"} /></button><button className={"icon" + (hid ? " act" : "")} onClick={() => toggleHide(p.id)}><EyeOff size={16} /></button></div>
            </div>);
          })}
        </main>
      )}

      <footer className="bar">
        <button className="btn ghost" onClick={novaSemana}><RefreshCw size={17} /> Nova semana</button>
        <a className="btn send" href={waLink} target="_blank" rel="noreferrer"><Send size={17} /> Enviar no WhatsApp</a>
      </footer>
    </div>
  );
}

const CSS = `
*{box-sizing:border-box}
.wrap{max-width:520px;margin:0 auto;min-height:100vh;background:${PAPEL};color:${TINTA};font-family:-apple-system,Segoe UI,Roboto,sans-serif;padding-bottom:96px;position:relative}
.top{padding:22px 20px 8px}
.kicker{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${MUTE};font-weight:600}
.brand{margin:2px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:600;letter-spacing:-.01em}
.tabs{display:flex;gap:4px;padding:8px 16px 0;position:sticky;top:0;background:${PAPEL};z-index:5}
.tab{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;border:0;background:transparent;color:${MUTE};font-size:13px;font-weight:600;padding:10px 4px;border-bottom:2px solid transparent;cursor:pointer}
.tab.on{color:${TINTA};border-bottom-color:${ACAFRAO}}
.list{padding:10px 16px;display:flex;flex-direction:column;gap:12px}
.prev{border:1px solid ${LINHA};border-radius:12px;background:#fff;overflow:hidden}
.prevtoggle{width:100%;display:flex;align-items:center;gap:6px;border:0;background:transparent;color:${MUTE};font-weight:700;font-size:13px;padding:11px 14px;cursor:pointer}
.prevlist{padding:0 14px 12px}
.prevrow{font-size:13px;color:${TINTA};padding:3px 0;border-top:1px dashed ${LINHA}}
.prevrow b{font-weight:700;margin-right:4px}
.prevrow i{color:${MUTE}}
.prevnote{font-size:12px;color:${ACAFRAO};margin-top:8px;font-weight:600}
.dragtip{font-size:12px;color:${MUTE};margin:2px 2px 0;display:flex;align-items:center;gap:4px}
.day{background:#fff;border:1px solid ${LINHA};border-left:5px solid;border-radius:12px;padding:14px 16px;animation:rise .35s ease both;transition:box-shadow .15s,transform .15s}
.day.dragging{box-shadow:0 10px 26px rgba(30,58,50,.18);transform:scale(1.02);z-index:3;animation:none}
.dayhead{display:flex;justify-content:space-between;align-items:center}
.dayname{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${MUTE}}
.dayacts{display:flex;gap:2px}
.dish{margin:6px 0 10px;font-family:Georgia,serif;font-size:20px;font-weight:600;line-height:1.2}
.meta{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.chip{font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;border:1px solid}
.side{font-style:italic;color:${MUTE};font-size:14px}
.side.solo{opacity:.7}
.icon{border:0;background:transparent;color:${MUTE};padding:7px;border-radius:9px;cursor:pointer;line-height:0}
.icon:hover{background:${PAPEL};color:${TINTA}}
.icon.act{color:${ACAFRAO}}
.grip{cursor:grab;touch-action:none}
.grip:active{cursor:grabbing}
.shop{padding:14px 16px}
.grp{margin-bottom:18px}
.grphead{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${ACAFRAO};font-weight:700;margin:0 0 8px;border-bottom:1px solid ${LINHA};padding-bottom:6px}
.row{display:flex;align-items:center;gap:10px;padding:8px 2px;border-bottom:1px dashed ${LINHA};cursor:pointer}
.row input{width:18px;height:18px;accent-color:${VERDE}}
.rname{flex:1;font-size:15px}
.rqtd{font-size:13px;color:${MUTE};font-variant-numeric:tabular-nums}
.row:has(input:checked) .rname{text-decoration:line-through;color:${MUTE}}
.pantry .grphead{color:${MUTE}}
.pantryitems{font-size:14px;color:${MUTE};line-height:1.7;margin:0}
.cat{padding:10px 16px}
.hint{font-size:13px;color:${MUTE};margin:4px 2px 12px}
.catrow{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 2px;border-bottom:1px solid ${LINHA}}
.catrow.hid{opacity:.45}
.catname{font-size:15px;font-weight:600;display:block}
.catmeta{display:flex;align-items:center;gap:8px;margin-top:5px}
.cattipo{font-size:12px;color:${MUTE}}
.catacts{display:flex;gap:2px;flex-shrink:0}
.bar{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:520px;display:flex;gap:10px;padding:12px 16px;background:${PAPEL};border-top:1px solid ${LINHA}}
.btn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:13px;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;border:1px solid ${LINHA};text-decoration:none}
.btn.ghost{background:#fff;color:${TINTA}}
.btn.ghost:hover{border-color:${ACAFRAO};color:${ACAFRAO}}
.btn.send{background:${VERDE};color:#fff;border-color:${VERDE}}
.btn.send:hover{filter:brightness(1.05)}
.btn:focus-visible,.tab:focus-visible,.icon:focus-visible{outline:2px solid ${ACAFRAO};outline-offset:2px}
@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.day{animation:none}}
`;
