# SQL Fundamentals

## Data Definition Language (DDL)

DDL commands are used to define and manage the structure of the database and its objects.

### Core Structure Commands

- **CREATE**: Used to create new database objects like tables, databases, indexes, and views.

  ```sql
  CREATE TABLE Employees (
      EmployeeID int,
      LastName varchar(255),
      FirstName varchar(255),
      BirthDate date
  );
  ```

- **ALTER**: Modifies the structure of an existing database object.

  ```sql
  ALTER TABLE Employees
  ADD Email varchar(255);
  ```

- **DROP**: Deletes an existing database object.

  ```sql
  DROP TABLE Employees;
  ```

### Enforcing Integrity and Performance

- **Creating Tables with Constraints**: Enforce rules on data in a table at the column level. Constraints include `PRIMARY KEY`, `NOT NULL`, `CHECK`, and `FOREIGN KEY`.

  ```sql
  CREATE TABLE Employees (
      EmployeeID INT PRIMARY KEY,
      LastName VARCHAR(255) NOT NULL,
      FirstName VARCHAR(255) NOT NULL,
      BirthDate DATE CHECK (BirthDate > '1900-01-01'),
      DepartmentID INT,
      FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
  );
  ```

- **Creating Indexes**: Used to improve the performance of queries.

  ```sql
  CREATE INDEX idx_lastname ON Employees (LastName);
  ```

- **Partitioning Tables**: Divides large tables into smaller, more manageable parts, which can improve query efficiency.

  ```sql
  CREATE TABLE Sales (
      SaleID INT,
      SaleDate DATE,
      Amount DECIMAL(10, 2)
  ) PARTITION BY RANGE (SaleDate) (
      PARTITION p0 VALUES LESS THAN ('2023-01-01'),
      PARTITION p1 VALUES LESS THAN ('2024-01-01')
  );
  ```

## Data Manipulation Language (DML)

DML commands are for managing data within schema objects.

### Fundamental Data Operations

- **SELECT**: Retrieves data from one or more tables.

  ```sql
  SELECT FirstName, LastName FROM Employees;
  ```

- **INSERT**: Adds new rows of data into a table.

  ```sql
  INSERT INTO Employees (EmployeeID, LastName, FirstName, BirthDate)
  VALUES (1, 'Doe', 'John', '1980-01-01');
  ```

- **UPDATE**: Modifies existing data within a table.

  ```sql
  UPDATE Employees
  SET Email = 'john.doe@example.com'
  WHERE EmployeeID = 1;
  ```

- **DELETE**: Removes existing rows from a table.

  ```sql
  DELETE FROM Employees
  WHERE EmployeeID = 1;
  ```

### Complex Queries and Data Shaping

- **Correlated Subqueries**: A subquery that references columns from the outer query.

  ```sql
  SELECT FirstName, LastName
  FROM Employees e
  WHERE EXISTS (
      SELECT 1
      FROM Departments d
      WHERE d.DepartmentID = e.DepartmentID
      AND d.DepartmentName = 'HR'
  );
  ```

- **Common Table Expressions (CTEs)**: Create temporary, named result sets that you can reference within a statement.

  ```sql
  WITH DepartmentSales AS (
      SELECT DepartmentID, SUM(Amount) AS TotalSales
      FROM Sales
      GROUP BY DepartmentID
  )
  SELECT d.DepartmentName, ds.TotalSales
  FROM Departments d
  JOIN DepartmentSales ds ON d.DepartmentID = ds.DepartmentID;
  ```

- **Window Functions**: Perform calculations across a set of table rows that are related to the current row.

  ```sql
  SELECT EmployeeID, LastName, FirstName,
         SUM(Salary) OVER (PARTITION BY DepartmentID ORDER BY Salary) AS RunningTotal
  FROM Employees;
  ```

## Data Control Language (DCL)

DCL commands are used to control access to data within the database.

### Managing User Permissions

- **GRANT**: Gives users privileges to access the database.

  ```sql
  GRANT SELECT, INSERT ON Employees TO 'username';
  ```

- **REVOKE**: Removes user access privileges.

  ```sql
  REVOKE SELECT, INSERT ON Employees FROM 'username';
  ```

### Role-Based Access Control

- **Managing Roles and Permissions**: Roles are collections of privileges that can be granted to users for better access control management.

  ```sql
  CREATE ROLE Manager;
  GRANT SELECT, INSERT, UPDATE ON Employees TO Manager;
  GRANT Manager TO 'username';
  ```

## Transaction Control Language (TCL)

TCL commands are used to manage transactions in the database to ensure data integrity.

### Managing Single Transactions

- **COMMIT**: Saves all the transactions to the database.
- **ROLLBACK**: Undoes transactions that have not yet been committed to the database.
- **SAVEPOINT**: Sets a specific point within a transaction to which you can later roll back.

### Concurrency and Distributed Transactions

- **Transaction Isolation Levels**: Control the visibility of changes made by one transaction to others.

  ```sql
  SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
  ```

- **Two-Phase Commit**: A protocol used to ensure that distributed transactions (across multiple databases) are committed atomically.

  ```sql
  -- Phase 1: Prepare
  PREPARE TRANSACTION 'tx1';
  -- Phase 2: Commit
  COMMIT PREPARED 'tx1';
  ```

## Additional SQL Constructs

### Essential Query Components

- **Clauses**: Modify SQL commands to specify conditions (`WHERE`), sort results (`ORDER BY`), or group data (`GROUP BY`, `HAVING`).
- **Functions and Expressions**: SQL has built-in functions (like `COUNT`, `SUM`, `AVG`) and allows for expressions to perform calculations.
- **Joins**: Combine rows from two or more tables based on a related column between them.
- **Subqueries**: A query nested inside another query.

### Sophisticated SQL Logic

- **Recursive CTEs**: Used for querying hierarchical data.
- **Pivoting and Unpivoting Data**: Transforms data from a row-level format to a columnar format and vice-versa.
- **Stored Procedures and Triggers**: Encapsulate SQL logic into reusable components that can be executed on demand or automatically in response to an event.
- **Dynamic SQL**: Allows for building and executing SQL statements dynamically at runtime.

```sql
-- Example of Dynamic SQL
DECLARE @sql NVARCHAR(MAX);
SET @sql = 'SELECT * FROM ' + @tableName;
EXEC sp_executesql @sql;
```

---

## Examples of Using Advanced SQL Features

Here are practical examples demonstrating how advanced SQL features can be used to solve complex problems.

### 1. Navigating Hierarchies with Recursive CTEs

A recursive CTE is ideal for querying hierarchical data, like an organizational chart stored in an `Employees` table. This example finds an employee and all their subordinates in the hierarchy.

```sql
-- Assumes an Employees table with EmployeeID, ManagerID, FirstName, LastName
WITH RECURSIVE EmployeeHierarchy AS (
    -- Anchor member: Select the top-level manager
    SELECT EmployeeID, ManagerID, FirstName, LastName, 0 AS HierarchyLevel
    FROM Employees
    WHERE ManagerID IS NULL -- Or specify a starting EmployeeID, e.g., WHERE EmployeeID = 1

    UNION ALL

    -- Recursive member: Find employees who report to the previous level
    SELECT e.EmployeeID, e.ManagerID, e.FirstName, e.LastName, eh.HierarchyLevel + 1
    FROM Employees e
    JOIN EmployeeHierarchy eh ON e.ManagerID = eh.EmployeeID
)
SELECT * FROM EmployeeHierarchy
ORDER BY HierarchyLevel, LastName;
```

### 2. Ranking Results with Window Functions

Window functions perform calculations across a set of rows related to the current row. This example ranks employees within each department based on their salary.

```sql
-- Assumes an Employees table with EmployeeID, FirstName, LastName, DepartmentID, and Salary
SELECT
    FirstName,
    LastName,
    d.DepartmentName,
    Salary,
    RANK() OVER (PARTITION BY DepartmentID ORDER BY Salary DESC) as SalaryRank
FROM
    Employees e
JOIN
    Departments d ON e.DepartmentID = d.DepartmentID;
```

### 3. Summarizing Data with PIVOT

Pivoting transforms data from rows to columns. This is useful for creating summary reports, such as converting quarterly sales data into a yearly summary with a column for each quarter.

```sql
-- Assumes a SalesData table with Year, Quarter, and Sales amount
SELECT Year, [Q1], [Q2], [Q3], [Q4]
FROM (
    SELECT Year, Quarter, Sales
    FROM SalesData
) AS SourceTable
PIVOT (
    SUM(Sales)
    FOR Quarter IN ([Q1], [Q2], [Q3], [Q4])
) AS PivotTable;
```

### 4. Ensuring Data Integrity with Stored Procedures and Transactions

Stored procedures can encapsulate complex logic, and TCL commands ensure that operations are atomic (either all succeed or all fail). This example creates a procedure to transfer funds between two accounts, wrapping the logic in a transaction.

```sql
CREATE PROCEDURE TransferFunds
    @FromAccount INT,
    @ToAccount INT,
    @Amount DECIMAL(10, 2)
AS
BEGIN
    -- Start a transaction
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Subtract amount from the source account
        UPDATE Accounts
        SET Balance = Balance - @Amount
        WHERE AccountID = @FromAccount;

        -- Add amount to the destination account
        UPDATE Accounts
        SET Balance = Balance + @Amount
        WHERE AccountID = @ToAccount;

        -- If both updates succeed, commit the transaction
        COMMIT TRANSACTION;
        PRINT 'Transfer successful.';
    END TRY
    BEGIN CATCH
        -- If any error occurs, roll back all changes
        ROLLBACK TRANSACTION;
        PRINT 'Transfer failed. All changes have been rolled back.';
    END CATCH
END;
```
