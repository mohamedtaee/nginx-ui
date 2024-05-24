from flask import Flask
from config import config
from flask_moment import Moment

moment = Moment()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    config[config_name].init_app(app)

    config[config_name].init_app(app)
    moment.init_app(app)

    from app.ui import views as ui_views
    app.register_blueprint(ui_views.bp)

    from app.api import endpoints as api_endpoints
    app.register_blueprint(api_endpoints.bp)

    return app
