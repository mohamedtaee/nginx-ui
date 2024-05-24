from flask import Blueprint, current_app, render_template
import os

bp = Blueprint('ui', __name__)


@bp.route('/',  methods=['GET'])
def index():
    """
    Delivers the home page of Nginx UI.

    :return: Rendered HTML document.
    :rtype: str
    """
    nginx_path = current_app.config['NGINX_PATH']
    config = [f for f in os.listdir(nginx_path) if os.path.isfile(os.path.join(nginx_path, f))]
    return render_template('index.html', config=config)
