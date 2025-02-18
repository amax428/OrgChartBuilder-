import sqlite3

def create_database():
    conn = sqlite3.connect("employees.db")
    cursor = conn.cursor()

    # Create employees table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            title TEXT NOT NULL,
            manager_id INTEGER,
            FOREIGN KEY(manager_id) REFERENCES employees(id)
        )
    """)

    # Insert sample employee data if the table is empty
    cursor.execute("SELECT COUNT(*) FROM employees")
    if cursor.fetchone()[0] == 0:
        employees = [
            (1, "Alice", "Manager", None),
            (2, "Bob", "Manager", None),
            (3, "Charlie", "Developer", 2),
            (4, "David", "Developer", 2),
            (5, "Eve", "Designer", 1)
        ]
        cursor.executemany("INSERT INTO employees (id, name, title, manager_id) VALUES (?, ?, ?, ?)", employees)
    
    conn.commit()
    conn.close()

create_database()
