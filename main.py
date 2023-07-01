from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer='TRAIN'

@app.get('/answer')
def get_answer():
    return answer

#/wordle menas the name(location) it is located
app.mount("/wordle", StaticFiles(directory='static', html=True), name="static")