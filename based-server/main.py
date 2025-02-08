import uvicorn
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

mdTestText = '''
## Overview
Welcome to the CS1550 base. Push your notes a shared folder, directly from obsidian. Access the shared notes directly from your own vault.

### [[Research Notes]] #research/Article
- [Reading_notes](obsidian://open?vault=hack-vault&file=Reading_notes)
- [Docs_notes](obsidian://open?vault=hack-vault&file=Docs_notes)
- [Textbook_notes](obsidian://open?vault=hack-vault&file=Textbook_notes)
	- [Chapter_1](obsidian://open?vault=hack-vault&file=Chapter_1)
	- [Chapter_2](obsidian://open?vault=hack-vault&file=Chapter_2)
	- [Chapter_3](obsidian://open?vault=hack-vault&file=Chapter_3)
	- [Chapter_4](obsidian://open?vault=hack-vault&file=Chapter_4)
- These have a tag to related article or resource link
### [[Lectures]]
- [Lecture_1_Shared](obsidian://open?vault=hack-vault&file=Lecture_1_Shared)
- [Lecture_2_Shared](obsidian://open?vault=hack-vault&file=Lecture_2_Shared)
- [Lecture_8_Shared](obsidian://open?vault=hack-vault&file=Lecture_8_Shared)
- [Lecture_9_Shared](obsidian://open?vault=hack-vault&file=Lecture_9_Shared)
- [Lecture_10_Shared](obsidian://open?vault=hack-vault&file=Lecture_10_Shared)
- [Lecture_11_Shared](obsidian://open?vault=hack-vault&file=Lecture_11_Shared)
### [[Review]]
- [Midterm_Review](obsidian://open?vault=hack-vault&file=Midterm_Review)
- [Final_Review](obsidian://open?vault=hack-vault&file=Final_Review)
### [[Info_Bank]]
- [Links](obsidian://open?vault=hack-vault&file=Links)
- [Files](obsidian://open?vault=hack-vault&file=Files)
- [Questions](obsidian://open?vault=hack-vault&file=Questions)
	- Change dataview sorting criteria
- [Tasks](obsidian://open?vault=hack-vault&file=Tasks)
	- Dataview plugin for different sorting methods.
	- Our plugin will transform the data-view query.

### [[Uncategorized]]
'''

tag_mapping = {
    "#review/final": "Final_Review",
    "#review/midterm": "Midterm_Review",
    "#uncategorized": "Uncategorized",
    "#textbook/ch1":"Chapter_1",
    "#textbook/ch2":"Chapter_2",
    "#textbook/ch3":"Chapter_3",
    "#research/docs":"Docs_notes",
    "#research/reading":"Reading_notes",
    "#base":"CS1550",
    "#questions":"Questions",
    "#files":"Files",
    "#links":"Links",
    "#lecture/0":"Lecture_0_shared",
    "#lecture/1":"Lecture_1_shared",
    "#lecture/2":"Lecture_2_shared",
    "#lecture/3":"Lecture_3_shared",
    "#lecture/4":"Lecture_4_shared",
    "#lecture/5":"Lecture_5_shared",
    "#lecture/6":"Lecture_6_shared",
    "#lecture/7":"Lecture_7_shared",
    "#lecture/8":"Lecture_8_shared",
    "#lecture/9":"Lecture_9_shared",
    "#lecture/10":"Lecture_10_shared",
    "#lecture/11":"Lecture_11_shared",
}

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}

@app.get("/joinVault")
async def submit_text():
    # Process the received text
    # For example, save it to a database or perform analysis
    return {"note_name0":{"username": "your_mom", "location_tag":"note location tag", "inline_tags":["inline_tag0", "inline_tag1", "inline_tag2"], "text_content":mdTestText},"note_name1":{"username": "your_mom", "location_tag":"note location tag", "inline_tags":["inline_tag0", "inline_tag1", "inline_tag2"], "text_content":"MARKDOWN TEXT CONTENT"}}

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
