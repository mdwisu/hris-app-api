import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Employee } from '../employee/employee.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee;

  @CreateDateColumn()
  checkIn: Date;

  @Column({ nullable: true })
  checkOut: Date;
}
