class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = "lolThisIsTotallySecretAndShouldNotBeChanged"

    SESSION_COOKIE_SECURE = True

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DEBUG = True
    SESSION_COOKIE_STORE = False

class TestingConfig(Config):
    TESTING = True
    SESSION_COOKIE_STORE = False