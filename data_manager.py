import database_connection


@database_connection.connection_handler
def get_boards(cursor):
    query = """
        SELECT *
        FROM boards
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


@database_connection.connection_handler
def create_card(cursor, board_id):
    query = """
        INSERT INTO cards(board_id, status_id, title, card_order)
        VALUES (%(board_id)s, 1, 'New card', 1)
    ;"""
    cursor.execute(query, {'board_id': board_id})


@database_connection.connection_handler
def update_card(cursor, card):
    query = """
        UPDATE cards
        SET status_id=(SELECT id FROM statuses WHERE title=lower(%(status_title)s) LIMIT 1),
        title = %(title)s
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



