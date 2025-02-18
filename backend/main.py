from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from typing import List, Optional

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. For security, you can specify only the frontend URL, e.g., "http://localhost:3000"
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allows all headers
)
# Employee model for serialization
class Employee(BaseModel):
    id: int
    name: str
    title: str
    manager_id: Optional[int] = None

# Function to get all employees from the database
def get_employees() -> List[Employee]:
    conn = sqlite3.connect("employees.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, title, manager_id FROM employees")
    employees = cursor.fetchall()
    conn.close()

    return [Employee(id=row[0], name=row[1], title=row[2], manager_id=row[3]) for row in employees]

# 1. Employee Data Endpoint
@app.get("/employees", response_model=List[Employee])
def read_employees():
    return get_employees()

# Request model for the Update Manager Endpoint
class UpdateManagerRequest(BaseModel):
    employee_id: int
    new_manager_id: int

# 2. Update Manager Endpoint
@app.put("/update_manager")
def update_manager(request: UpdateManagerRequest):
    conn = sqlite3.connect("employees.db")
    cursor = conn.cursor()

    # Check if the employee exists
    cursor.execute("SELECT * FROM employees WHERE id = ?", (request.employee_id,))
    employee = cursor.fetchone()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    # Check if the new manager exists or if it’s None
    if request.new_manager_id:
        cursor.execute("SELECT * FROM employees WHERE id = ?", (request.new_manager_id,))
        manager = cursor.fetchone()
        if not manager:
            raise HTTPException(status_code=404, detail="New manager not found")

    # Update the manager_id for the employee
    cursor.execute("UPDATE employees SET manager_id = ? WHERE id = ?", 
                   (request.new_manager_id, request.employee_id))
    conn.commit()
    conn.close()

    return {"message": "Manager updated successfully"}

