import inquirer from 'inquirer';

//Defining a student class
class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    //Method to enroll a student in a course
    enroll_course(course: string) {
        this.courses.push(course);
    }
    //Method to check balance of a student
    view_balance() {
        console.log(`Current balance of ${this.name} is: $${this.balance}.`);
    }
    //Method to pay tuition fee of a student
    pay_fee(amount: number) {
        this.balance -= amount;
        console.log(`$${amount} paid for student ${this.name}.\nRemaining balance is ${this.balance}.`);
    }
    //Method to show student status
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses enrolled: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);

    }
}


//Defining a new class that manages students.
class student_manager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    //Method to find student.
    find_student(student_id: number) {
        return this.students.find(std => std.id == student_id);
    }

    //Method to add student.
    add_student(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student ${student.name} added successfully. Student ID: ${student.id}`);
    }

    //Method to enroll students in a course.
    enroll_students(student_id: number, course: string) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`Student ${student.name} enrolled in ${student.courses} course successfully.`);
        }
        else {
            console.log('Student not found. Kindly enter a correct student ID.');
        }
    }

    //Method to pay student fee.
    pay_student_fee(student_id: number, amount: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fee(amount);
            console.log(`$${amount} is successfully paid for ${student.name}. Student ID: ${student.id}`);
        }
        else {
            console.log('Student not found. Kindly enter a correct student ID.');
        }
    }

    //Method to view student balance.
    view_student_balance(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance()
        }
        else {
            console.log('Student not found. Kindly enter a correct student ID.');
        }
    }

    //Method to view student status.
    show_student_status(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status()
        }
        else {
            console.log('Student not found. Kindly enter a correct student ID.');
        }
    }
}

//Creating a main function to run the student management system.
async function main() {
    console.log("-".repeat(50));
    console.log(`"Welcome to Student Management System"`);
    console.log("-".repeat(50));

    let Student_manager = new student_manager();

    //Using While loop here to keep the program running.
    while (true) {
        let option = await inquirer.prompt([
            {
                name: 'choice',
                type: 'list',
                message: 'Select an option using arrow keys:',
                choices: [
                    'Add Student',
                    'Enroll in a course',
                    'View Student Balance',
                    'Pay Fee',
                    'View Student Status',
                    'Exit'
                ]
            }
        ])
        // Using Switch Cases to select an option.
        switch (option.choice) {
            case 'Add Student':
                let student_name = await inquirer.prompt([
                    {
                        name: 'name',
                        type: 'input',
                        message: "Enter student name: "
                    }
                ]);
                Student_manager.add_student(student_name.name);
                break;
            case 'Enroll in a course':
                let enroll_course = await inquirer.prompt([
                    {
                        name: 'ID',
                        type: 'number',
                        message: 'Enter student ID: '
                    },
                    {
                        name: 'course',
                        type: 'list',
                        message: "Select a course you want to get enrolled in: ",
                        choices: [
                            'Python',
                            'TypeScript',
                            'HTML',
                            'CSS',
                            'Java',
                            'React',
                            'Next.js'
                        ]
                    }
                ]);
                Student_manager.enroll_students(enroll_course.ID, enroll_course.course);
                break;
            case 'View Student Balance':
                let student_balance = await inquirer.prompt([
                    {
                        name: 'balance',
                        type: 'number',
                        message: 'Enter student ID to get the balance information: '
                    }
                ]);
                Student_manager.view_student_balance(student_balance.balance);
                break;
            case 'Pay Fee':
                let pay_fee = await inquirer.prompt([
                    {
                        name: 'ID',
                        type: 'number',
                        message: 'Enter student ID: '
                    },
                    {
                        name: 'fee',
                        type: 'number',
                        message: 'Enter student ID to pay student fee: '
                    }
                ]);
                Student_manager.pay_student_fee(pay_fee.ID, pay_fee.fee);
                break;
            case 'View Student Status':
                let student_status = await inquirer.prompt([
                    {
                        name: 'ID',
                        type: 'number',
                        message: 'Enter student ID: '
                    }
                ]);
                Student_manager.show_student_status(student_status.ID);
                break;
            case 'Exit':
                console.log("-".repeat(50));
                console.log('Thank you for using Student Management System.');
                console.log("-".repeat(50));
                process.exit();
        }
    }

}

main();