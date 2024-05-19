SQL (Structured Query Language) is a standard programming language used for managing and manipulating relational databases. 

### 1. **Data Definition Language (DDL)**
DDL commands define and manage the structure of the database and its objects. Common DDL commands include:
- **CREATE**: Creates a new table, database, index, view, or other objects.
  ```sql
  CREATE TABLE Employees (
      EmployeeID int,
      LastName varchar(255),
      FirstName varchar(255),
      BirthDate date
  );
  ```
- **ALTER**: Modifies an existing database object, such as a table or index.
  ```sql
  ALTER TABLE Employees
  ADD Email varchar(255);
  ```
- **DROP**: Deletes an existing database object.
  ```sql
  DROP TABLE Employees;
  ```

### 2. **Data Manipulation Language (DML)**
DML commands are used for managing data within schema objects. They allow you to query and modify data. Common DML commands include:
- **SELECT**: Retrieves data from one or more tables.
  ```sql
  SELECT FirstName, LastName FROM Employees;
  ```
- **INSERT**: Adds new rows of data to a table.
  ```sql
  INSERT INTO Employees (EmployeeID, LastName, FirstName, BirthDate)
  VALUES (1, 'Doe', 'John', '1980-01-01');
  ```
- **UPDATE**: Modifies existing data in a table.
  ```sql
  UPDATE Employees
  SET Email = 'john.doe@example.com'
  WHERE EmployeeID = 1;
  ```
- **DELETE**: Removes existing data from a table.
  ```sql
  DELETE FROM Employees
  WHERE EmployeeID = 1;
  ```

### 3. **Data Control Language (DCL)**
DCL commands control access to data within the database. The main DCL commands are:
- **GRANT**: Gives users access privileges to the database.
  ```sql
  GRANT SELECT, INSERT ON Employees TO 'username';
  ```
- **REVOKE**: Removes access privileges from users.
  ```sql
  REVOKE SELECT, INSERT ON Employees FROM 'username';
  ```

### 4. **Transaction Control Language (TCL)**
TCL commands manage transactions in the database, ensuring data integrity. Common TCL commands include:
- **COMMIT**: Saves all transactions to the database.
  ```sql
  COMMIT;
  ```
- **ROLLBACK**: Undoes transactions that have not been committed.
  ```sql
  ROLLBACK;
  ```
- **SAVEPOINT**: Sets a savepoint within a transaction.
  ```sql
  SAVEPOINT SavepointName;
  ```
- **RELEASE SAVEPOINT**: Removes a savepoint.
  ```sql
  RELEASE SAVEPOINT SavepointName;
  ```

### Additional Elements

- **Clauses**: Clauses modify SQL commands to specify additional parameters, such as `WHERE`, `ORDER BY`, `GROUP BY`, and `HAVING`.
  ```sql
  SELECT FirstName, LastName
  FROM Employees
  WHERE BirthDate > '1990-01-01'
  ORDER BY LastName ASC;
  ```

- **Functions and Expressions**: SQL includes built-in functions (e.g., `COUNT`, `SUM`, `AVG`) and allows for expressions to perform calculations or operations on data.
  ```sql
  SELECT COUNT(*) AS NumberOfEmployees
  FROM Employees;
  ```

- **Joins**: Joins combine rows from two or more tables based on related columns.
  ```sql
  SELECT Employees.FirstName, Employees.LastName, Departments.DepartmentName
  FROM Employees
  JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID;
  ```

- **Subqueries**: Subqueries are nested queries used within another SQL query to provide results for the main query.
  ```sql
  SELECT FirstName, LastName
  FROM Employees
  WHERE DepartmentID = (SELECT DepartmentID FROM Departments WHERE DepartmentName = 'HR');
  ```
