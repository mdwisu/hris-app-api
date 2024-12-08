import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('check-in')
  @UseGuards(JwtAuthGuard)
  checkIn(
    @Request() req: any,
    @Body() createAttendanceDto: CreateAttendanceDto,
  ) {
    return this.attendanceService.checkIn(createAttendanceDto);
  }

  @Post('check-out')
  @UseGuards(JwtAuthGuard)
  checkOut(@Request() req: any) {
    return this.attendanceService.checkOut(req.user.id);
  }

  @Get('employee')
  @UseGuards(JwtAuthGuard)
  getAttendanceByEmployee(@Request() req: any) {
    return this.attendanceService.getAttendanceByEmployee(req.user.id);
  }
}
