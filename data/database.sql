drop table cards;
drop table board_statuses;
drop table statuses;
drop table boards;
drop table users;



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
create table users
(
    id       serial
        constraint users_pk
            primary key,
    username text,
    password text
);


INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'new', 4);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'in progress', 4);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'testing', 4);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'done', 4);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'testing', 1);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'in progress', 3);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'new', 3);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'done', 2);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'testing', 3);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'done', 1);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'done', 3);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'new', 2);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'testing', 2);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'in progress', 2);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'in progress', 1);
INSERT INTO public.board_statuses (id, title, board_id) VALUES (default, 'new', 1);
INSERT INTO public.boards (id, title) VALUES (default, 'Board 1');
INSERT INTO public.boards (id, title) VALUES (default, 'Board 2');
INSERT INTO public.boards (id, title) VALUES (default, 'New Board');
INSERT INTO public.boards (id, title) VALUES (default, 'New Board');
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 1, 'new card 2', 2);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 1, 4, 'done card 1', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 1, 1, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 4, 12, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 1, 2, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 1, 3, 'in progress card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 1, 3, 'planning', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 2, 5, 'new card 1', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 2, 5, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 2, 5, 'new card 2', 2);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 2, 6, 'in progress card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 3, 1, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 4, 13, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 3, 7, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 4, 14, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 4, 13, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 1, 4, 'done card 1', 2);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 2, 7, 'done card 1', 2);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 4, 16, 'done card 1', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 1, 2, 'new card 1', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 2, 7, 'planning', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 2, 6, 'New card', 1);
INSERT INTO public.cards (id, board_id, status_id, title, card_order) VALUES (default, 3, 8, 'New card', 1);
INSERT INTO public.statuses (id, title) VALUES (default, 'new');
INSERT INTO public.statuses (id, title) VALUES (default, 'in progress');
INSERT INTO public.statuses (id, title) VALUES (default, 'testing');
INSERT INTO public.statuses (id, title) VALUES (default, 'done');



