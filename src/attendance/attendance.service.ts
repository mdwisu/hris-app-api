import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
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

  async checkIn(createAttendanceDto: CreateAttendanceDto) {
    const employee = await this.employeeRepository.findOne({
      where: { id: createAttendanceDto.employeeId },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    const attendance = this.attendanceRepository.create({
      employee: employee,
      checkIn: new Date(),
    });
    return this.attendanceRepository.save(attendance);
  }

  async checkOut(userId: number) {
    const attendances = await this.attendanceRepository.find({
      where: { employee: { id: userId }, checkOut: IsNull() },
    });
    if (!attendances) {
      throw new NotFoundException('Attendance not found');
    }

    const updateAttendances = attendances.map((attendance) => {
      attendance.checkOut = new Date();
      return this.attendanceRepository.save(attendance);
    });
    await Promise.all(updateAttendances);
    // attendance.checkOut = new Date();
    return attendances;
  }

  async getAttendanceByEmployee(employeeId: number): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { employee: { id: employeeId } },
    });
  }
}
