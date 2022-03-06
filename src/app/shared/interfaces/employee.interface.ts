export interface Employee {
    $key?: string;
    fullName: string;
    email: string;
    phone: string;
    city: string;
    gender: string;
    department: string;
    departmentName?: string;
    img?: string;
    hireDate: any;
    isPermanent: boolean;
}

export interface Department {
    $key?: string;
    code: string;
    name: string;
}