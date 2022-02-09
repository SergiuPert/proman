from flask import Flask, render_template, url_for, request, session
from dotenv import load_dotenv

import cryptography
import data_manager
from util import json_response
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = b'_1#23x"F4Qdu\n\xec]/'
load_dotenv()


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/user", methods=['GET', 'POST', 'PUT', 'DELETE'])
@json_response
def user():
    if request.method == 'POST':
        json_var = request.json
        user = data_manager.get_user(json_var['username'])
        print(user)
        if user:
            if cryptography.verify_password(json_var['password'], user['password']):
                session.update({"username": user["username"]})
                return {'attempt': 'Connected'}
            return {'attempt': 'Incorrect password'}
        return {'attempt': 'Incorrect username'}
    if request.method == 'GET':
        return {'username': session['username'] if 'username' in session else ''}
    if request.method == 'PUT':
        json_var = request.json
        if not data_manager.get_user(json_var['username']):
            data_manager.insert_user({
                'username': json_var['username'],
                'password': cryptography.hash_password(json_var['password'])
            })
            return {'attempt': 'Success!'}
        return {'attempt': 'Username already exists!'}
    if request.method == 'DELETE':
        session.pop('username')




@app.route("/api/boards")
@json_response
def get_boards():
    boards = data_manager.get_boards()
    return boards


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    cards = data_manager.get_cards_by_board_id(board_id)
    return cards


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
