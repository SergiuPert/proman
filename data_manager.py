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
    cursor.execute(query, {"board_id": board_id})
    return cursor.fetchall()
