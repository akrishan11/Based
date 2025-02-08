import uvicorn
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/submitText")
async def submit_text(text: str = Body(...)):
    # Process the received text
    # For example, save it to a database or perform analysis
    print(text)
    return {"message": "Text received successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=6969)
