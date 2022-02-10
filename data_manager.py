import database_connection


@database_connection.connection_handler
def get_boards(cursor):
    query = """
        SELECT *
        FROM boards
        ORDER BY id
    ;"""
    cursor.execute(query)
    return cursor.fetchall()


@database_connection.connection_handler
def get_cards_by_board_id(cursor, board_id):
    query = """
        SELECT *
        FROM cards
        WHERE board_id = %(board_id)s
    ;"""
    cursor.execute(query, {'board_id': board_id})
    return cursor.fetchall()


@database_connection.connection_handler
def get_user(cursor, username):
    query = """
    SELECT username, password
    FROM users
    WHERE username = %(username)s
    ;"""
    cursor.execute(query, {'username': username})
    return cursor.fetchone()

    cursor.execute(query, {"board_id": board_id})
    return cursor.fetchall()


@database_connection.connection_handler
def insert_user(cursor, user):
    query = """ 
    INSERT INTO users(username, password) 
    VALUES (%(username)s, %(password)s)
    ;"""
    cursor.execute(query, user)


@database_connection.connection_handler
def create_board(cursor):
    query = """
        INSERT INTO boards(title)
        VALUES ('New Board')
    ;"""
    cursor.execute(query)
    insert_default_statuses_for_board()


@database_connection.connection_handler
def create_card(cursor, board_id):
    query = """
        INSERT INTO cards(board_id, status_id, title, card_order)
        VALUES (%(board_id)s, (SELECT id FROM board_statuses WHERE board_id=%(board_id)s ORDER BY id LIMIT 1), 'New card', 1)
    ;"""
    cursor.execute(query, {'board_id': board_id})


@database_connection.connection_handler
def update_card(cursor, card):
    query = """
        UPDATE cards
        SET status_id = %(status_id)s,
        title = %(title)s,
        board_id = (SELECT board_id FROM board_statuses WHERE id=%(status_id)s LIMIT 1)
        WHERE id=%(card_id)s
            ;"""
    cursor.execute(query, card)


@database_connection.connection_handler
def insert_default_statuses_for_board(cursor):
    query = """INSERT INTO board_statuses(title, board_id)
    SELECT statuses.title,(SELECT id FROM boards ORDER BY id DESC LIMIT 1) as board_id
    FROM statuses
    ORDER BY statuses.id;"""
    cursor.execute(query)


@database_connection.connection_handler
def get_statuses_by_board_id(cursor, board_id):
    query = """
        SELECT id, title
        FROM board_statuses
        WHERE board_id = %(board_id)s
        ORDER BY id
    ;"""
    cursor.execute(query, {"board_id": board_id})
    return cursor.fetchall()


@database_connection.connection_handler
def add_status(cursor, board_id):
    query = """
        INSERT INTO board_statuses(title, board_id) 
        VALUES ('New Status', %(board_id)s)
    ;"""
    cursor.execute(query, {"board_id": board_id})


@database_connection.connection_handler
def delete_card(cursor, card_id):
    query = """
        DELETE FROM cards
        WHERE id=%(card_id)s
    ;"""
    cursor.execute(query, {"card_id": card_id})


@database_connection.connection_handler
def delete_status(cursor, status):
    print(status)
    query = """
        DELETE FROM cards 
        WHERE status_id=%(status_id)s;
        DELETE FROM board_statuses
        WHERE id=%(status_id)s
    ;"""
    cursor.execute(query, status)


@database_connection.connection_handler
def delete_board(cursor, board_id):
    query = """
        DELETE FROM cards
        WHERE board_id=%(board_id)s;
        DELETE FROM board_statuses
        WHERE board_id=%(board_id)s;
        DELETE FROM boards
        WHERE id=%(board_id)s
    ;"""
    cursor.execute(query, {"board_id": board_id})


@database_connection.connection_handler
def update_status_name(cursor, status):
    query = """
            UPDATE board_statuses
            SET title = %(title)s
            WHERE id = %(status_id)s
            ;"""
    cursor.execute(query, status)


@database_connection.connection_handler
def update_board_name(cursor, board):
    query = """
            UPDATE boards
            SET title= %(title)s
            WHERE id= %(board_id)s
            ;"""
    cursor.execute(query, board)


@database_connection.connection_handler
def update_card_name(cursor, card):
    query = """
            UPDATE cards
            SET title= %(title)s
            WHERE id=%(card_id)s
            ;"""
    cursor.execute(query, card)
