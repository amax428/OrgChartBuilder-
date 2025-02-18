# Organization Chart Builder Challenge

## 🚀 Setup Instructions

### 🖥️ Backend Setup

1. Install all required packages:
   ```sh
   pip install -r requirements.txt
   ```
2. Start the backend server (listens on port `8000`):
   ```sh
   uvicorn main:app --reload
   ```
3. (Optional) Create a new database:
   ```sh
   python create_database.py
   ```
   - This will generate a new database file named `employees.db`.

### 🌐 Frontend Setup

The project has two versions:
- **Version 1**: Uses `react-dnd`
- **Version 2**: Uses `reactflow`

#### Steps:
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the frontend on port `5173`:
   ```sh
   npm run dev
   ```

---

## 🔍 Technical Choices

### 📌 Backend
- No special choices apart from the required dependencies.
- Used **FastAPI** for the backend framework.
- Used **SQLite3** as the database.

### 🎨 Frontend
- Used **Axios** for better API handling.
- **Version 1 (react-dnd)**:
  - Provides powerful drag-and-drop functionality.
  - Allows dragging a card and dropping it on another card.
  - Does **not** include built-in support for connectors between nodes.
- **Version 2 (reactflow)**:
  - Offers a beautiful UI with built-in node connectors.
  - Provides easy edge connections.
  - Lacks built-in drag-and-drop (DnD) support on nodes.

---

## ⏳ Time Log
| Task                        | Time Spent |
|-----------------------------|------------|
| Backend Development         | 20 min     |
| Frontend (Version 1)        | 40 min     |
| Frontend (Version 2)        | 20 min     |
| Documentation & Versioning  | 30 min     |

---

### 📌 Notes
- If you encounter issues with dependencies, ensure you are using the correct versions.
- Contributions and suggestions are welcome!

🎯 **Thank you for your time and interest!** 🚀

