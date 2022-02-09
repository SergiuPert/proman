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
    cursor.execute(query)


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
