// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }

  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
  
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employee;
  }
  function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employee;
  }
  function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
  
    return (timeOut.hour - timeIn.hour) / 100;
  }
  function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
  }
  function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(event => event.date);
  
    let payable = eligibleDates.reduce((total, date) => {
      return total + wagesEarnedOnDate(employee, date);
    }, 0);
  
    return payable;
  }
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  }
// Example data
const employeeData = [
    ["Janelle", "Monae", "Singer", 50],
    ["Sza", "Artist", "Musician", 60],
    ["Thunder", "Cat", "Bassist", 70],
    ["Frank", "Ocean", "Singer", 80]
  ];
  
  const employees = createEmployeeRecords(employeeData);
  
  createTimeInEvent(employees[0], "2024-07-28 0800");
  createTimeOutEvent(employees[0], "2024-07-28 1200");
  
  createTimeInEvent(employees[1], "2024-07-28 0900");
  createTimeOutEvent(employees[1], "2024-07-28 1700");
  
  createTimeInEvent(employees[2], "2024-07-28 1000");
  createTimeOutEvent(employees[2], "2024-07-28 1400");
  
  createTimeInEvent(employees[3], "2024-07-28 1100");
  createTimeOutEvent(employees[3], "2024-07-28 1900");
  
  console.log(calculatePayroll(employees)); // Output the total payroll
                