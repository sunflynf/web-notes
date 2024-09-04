---
tags:
    - SQL
---

# Advanced SQL

## Advanced Data Definition Language (DDL)

DDL commands not only define and manage database structures but also include sophisticated features like constraints, indexes, and more.

- **Creating Tables with Constraints**: Constraints enforce rules at the column level.

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

- **Creating Indexes**: Indexes improve query performance.

  ```sql
  CREATE INDEX idx_lastname ON Employees (LastName);
  ```

- **Partitioning Tables**: Partition large tables to manage and query data more efficiently.

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

## Advanced Data Manipulation Language (DML)

DML commands include complex queries, subqueries, common table expressions (CTEs), and window functions.

- **Subqueries and Correlated Subqueries**: Subqueries that reference columns from the outer query.

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

- **Common Table Expressions (CTEs)**: CTEs provide a way to create temporary result sets.

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

- **Window Functions**: Perform calculations across a set of table rows related to the current row.

  ```sql
  SELECT EmployeeID, LastName, FirstName,
         SUM(Salary) OVER (PARTITION BY DepartmentID ORDER BY Salary) AS RunningTotal
  FROM Employees;
  ```

## Advanced Data Control Language (DCL)

Advanced DCL involves fine-grained permissions and roles.

- **Managing Roles and Permissions**: Create roles for better access control.

  ```sql
  CREATE ROLE Manager;
  GRANT SELECT, INSERT, UPDATE ON Employees TO Manager;
  GRANT Manager TO 'username';
  ```

## Advanced Transaction Control Language (TCL)

TCL commands in advanced SQL manage complex transactions and concurrency control.

- **Transaction Isolation Levels**: Control the visibility of transactions.

  ```sql
  SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
  BEGIN TRANSACTION;
  -- SQL statements
  COMMIT;
  ```

- **Two-Phase Commit**: Ensure transactions are committed across multiple databases.

  ```sql
  BEGIN;
  -- Phase 1: Prepare
  PREPARE TRANSACTION 'tx1';
  -- Phase 2: Commit
  COMMIT PREPARED 'tx1';
  ```

## Additional Advanced Elements

- **Recursive CTEs**: Useful for hierarchical data.

  ```sql
  WITH RECURSIVE EmployeeHierarchy AS (
      SELECT EmployeeID, ManagerID, FirstName, LastName
      FROM Employees
      WHERE ManagerID IS NULL
      UNION ALL
      SELECT e.EmployeeID, e.ManagerID, e.FirstName, e.LastName
      FROM Employees e
      JOIN EmployeeHierarchy eh ON e.ManagerID = eh.EmployeeID
  )
  SELECT * FROM EmployeeHierarchy;
  ```

- **Advanced Joins**: Complex joins involving multiple tables.

  ```sql
  SELECT e.FirstName, e.LastName, p.ProjectName
  FROM Employees e
  JOIN EmployeeProjects ep ON e.EmployeeID = ep.EmployeeID
  JOIN Projects p ON ep.ProjectID = p.ProjectID;
  ```

- **Pivoting and Unpivoting Data**: Transform rows into columns and vice versa.

  ```sql
  SELECT *
  FROM (
      SELECT Year, Quarter, Sales
      FROM SalesData
  ) src
  PIVOT (
      SUM(Sales)
      FOR Quarter IN ([Q1], [Q2], [Q3], [Q4])
  ) pvt;
  ```

- **Dynamic SQL**: Build and execute SQL queries dynamically.

  ```sql
  DECLARE @sql NVARCHAR(MAX);
  SET @sql = 'SELECT * FROM ' + @tableName;
  EXEC sp_executesql @sql;
  ```

- **Stored Procedures and Triggers**: Encapsulate SQL logic in reusable components.

  ```sql
  CREATE PROCEDURE AddEmployee
      @FirstName NVARCHAR(50),
      @LastName NVARCHAR(50),
      @BirthDate DATE,
      @DepartmentID INT
  AS
  BEGIN
      INSERT INTO Employees (FirstName, LastName, BirthDate, DepartmentID)
      VALUES (@FirstName, @LastName, @BirthDate, @DepartmentID);
  END;
  ```
  