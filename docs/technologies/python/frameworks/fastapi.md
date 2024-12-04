# FastAPI

FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints. It is designed to be easy to use and highly performant.

## Setting Up Your Environment

### Install FastAPI and Uvicorn

You can install FastAPI and Uvicorn (an ASGI server) using pip:

```bash
pip install fastapi uvicorn
```

### Create a Virtual Environment (Optional but Recommended)

```bash
python -m venv myenv
source myenv/bin/activate  # On Windows use `myenv\Scripts\activate`
```

## Creating a FastAPI Project

### Create a Project Directory

```bash
mkdir myproject
cd myproject
```

### Create a Main Application File

```py title="main.py"
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

### Run the Development Server

```bash
uvicorn main:app --reload
```

Visit `http://127.0.0.1:8000/` to see the default FastAPI welcome message.

## Creating Endpoints

### Define Path Parameters

```py
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

### Define Query Parameters

```py
@app.get("/users/")
def read_users(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
```

## Request Body and Pydantic Models

### Create a Pydantic Model

```py
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None
```

### Use the Model in an Endpoint

```py
@app.post("/items/")
def create_item(item: Item):
    return item
```

## Dependency Injection

### Create a Dependency

```py
def common_parameters(q: str = None, skip: int = 0, limit: int = 10):
    return {"q": q, "skip": skip, "limit": limit}
```

### Use the Dependency in an Endpoint

```py
@app.get("/items/")
def read_items(commons: dict = Depends(common_parameters)):
    return commons
```

## Background Tasks

### Define a Background Task

```py
from fastapi import BackgroundTasks

def write_log(message: str):
    with open("log.txt", "a") as log_file:
        log_file.write(message)

@app.post("/send-notification/{email}")
def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(write_log, f"Notification sent to {email}")
    return {"message": f"Notification will be sent to {email}"}
```

## Middleware

### Create Middleware

```py
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

class CustomMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Custom-Header"] = "CustomValue"
        return response

app.add_middleware(CustomMiddleware)
```

## Static Files

### Serve Static Files

```py
from fastapi.staticfiles import StaticFiles

app.mount("/static", StaticFiles(directory="static"), name="static")
```

## Database Integration

### Install SQLAlchemy and Databases

```bash
pip install sqlalchemy databases
```

### Configure the Database

```py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

### Create a Model

```py
from sqlalchemy import Column, Integer, String

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
```

### Create the Database Tables

```py
Base.metadata.create_all(bind=engine)
```

### Create CRUD Operations

```py
from sqlalchemy.orm import Session

def get_items(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Item).offset(skip).limit(limit).all()

def create_item(db: Session, item: Item):
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
```

### Use Dependency Injection for Database Session

```py
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/items/", response_model=Item)
def create_item_for_user(item: Item, db: Session = Depends(get_db)):
    return create_item(db=db, item=item)
```

## Deployment

### Prepare for Deployment

Make sure your application is configured for production.

### Choose a Hosting Provider

Popular choices include Heroku, AWS, and DigitalOcean.

### Deploy Your Application

Follow the specific instructions for your chosen hosting provider.

## Resources

- **FastAPI Documentation**: [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)
- **FastAPI Tutorial**: [https://fastapi.tiangolo.com/tutorial/](https://fastapi.tiangolo.com/tutorial/)
