const fs = require('fs');
const path = './employees.json';

function loadEmployees() {
    if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}

function saveEmployees(employees) {
    fs.writeFileSync(path, JSON.stringify(employees, null, 2), 'utf-8');
}

let employees = loadEmployees();

function addEmployee(id, name, position, department) {
    employees.push({ id, name, position, department });
    saveEmployees(employees);
}

function listEmployees() {
    return employees;
}

function findEmployee(id) {
    return employees.find(employee => employee.id === id);
}

function updateEmployee(id, newName, newPosition, newDepartment) {
    const employee = findEmployee(id);
    if (employee) {
        employee.name = newName || employee.name;
        employee.position = newPosition || employee.position;
        employee.department = newDepartment || employee.department;
        saveEmployees(employees);
    }
}

function deleteEmployee(id) {
    employees = employees.filter(employee => employee.id !== id);
    saveEmployees(employees);
}

// Example usage
addEmployee(1, 'Fikir Anteneh', 'Developer', 'IT');
addEmployee(2, 'Anteneh Fikir', 'Designer', 'Creative');
console.log(listEmployees());
console.log(findEmployee(1));
updateEmployee(1, 'abc', 'Senior Developer', 'IT');
deleteEmployee(2);
console.log(listEmployees());
