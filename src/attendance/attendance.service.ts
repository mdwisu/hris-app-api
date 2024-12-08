import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  create(createAttendanceDto: CreateAttendanceDto) {
    return 'This action adds a new attendance';
  }

  findAll() {
    return `This action returns all attendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
