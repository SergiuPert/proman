create table board_statuses
(
	id serial
		constraint board_statuses_pk
			primary key,
	title text,
	board_id integer
		constraint board_statuses_boards_id_fk
			references boards
);

create table boards
(
	id serial
		constraint boards_pkey
			primary key,
	title varchar(200) not null
);

create table cards
(
	id serial
		constraint cards_pkey
			primary key,
	board_id integer not null
		constraint fk_cards_board_id
			references boards,
	status_id integer not null
		constraint fk_cards_status_id
			references board_statuses,
	title varchar(200) not null,
	card_order integer not null
);

create table statuses
(
	id serial
		constraint statuses_pkey
			primary key,
	title varchar(200) not null
);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (13, 'new', 4);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (14, 'in progress', 4);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (15, 'testing', 4);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (16, 'done', 4);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (3, 'testing', 1);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (10, 'in progress', 3);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (9, 'new', 3);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (8, 'done', 2);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (11, 'testing', 3);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (4, 'done', 1);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (12, 'done', 3);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (5, 'new', 2);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (7, 'testing', 2);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (6, 'in progress', 2);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (2, 'in progress', 1);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (1, 'new', 1);
INSERT INTO public.boards (id, title) VALUES (1, 'Board 1');
INSERT INTO public.boards (id, title) VALUES (2, 'Board 2');
INSERT INTO public.boards (id, title) VALUES (3, 'New Board');
INSERT INTO public.boards (id, title) VALUES (4, 'New Board');
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (2, 1, 1, 'new card 2', 2);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (5, 1, 4, 'done card 1', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (17, 1, 1, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (23, 4, 12, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (13, 1, 2, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (3, 1, 3, 'in progress card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (4, 1, 3, 'planning', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (7, 2, 5, 'new card 1', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (14, 2, 5, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (8, 2, 5, 'new card 2', 2);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (9, 2, 6, 'in progress card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (19, 3, 1, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (20, 4, 13, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (15, 3, 7, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (21, 4, 14, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (22, 4, 13, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (12, 1, 4, 'done card 1', 2);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (6, 2, 7, 'done card 1', 2);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (11, 4, 16, 'done card 1', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (1, 1, 2, 'new card 1', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (10, 2, 7, 'planning', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (18, 2, 6, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (16, 3, 8, 'New card', 1);
INSERT INTO public.statuses (id, title) VALUES (1, 'new');
INSERT INTO public.statuses (id, title) VALUES (2, 'in progress');
INSERT INTO public.statuses (id, title) VALUES (3, 'testing');
INSERT INTO public.statuses (id, title) VALUES (4, 'done');



