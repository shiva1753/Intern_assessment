SELECT d.dept_name,
       e.name,
       e.salary
FROM Employees e
JOIN Departments d
    ON e.dept_id = d.dept_id
JOIN (
    SELECT dept_id, MAX(salary) AS max_salary
    FROM Employees
    GROUP BY dept_id
) m
    ON e.dept_id = m.dept_id
   AND e.salary = m.max_salary;