import werkzeug
from flask.helpers import send_from_directory
from app import app
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from datetime import datetime
from werkzeug.utils import secure_filename
from werkzeug.routing import BaseConverter
import os

# Home Page
@app.route('/')
def home():
    return render_template('public/home.html', title='Scenes', scene_id=1)

@app.route('/scene/<scene_id>')
def scene(scene_id):
    return render_template('public/home.html', title='Scene', scene_id=scene_id)

@app.route('/render')
def rendernull():
    return render_template('public/render.html', title='Render', scene_id=1)

@app.route('/render/<scene_id>')
def render(scene_id):
    return render_template('public/render.html', title='Render', scene_id=scene_id)