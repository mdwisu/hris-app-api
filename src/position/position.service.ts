import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  create(createPositionDto: CreatePositionDto) {
    const position = this.positionRepository.create(createPositionDto);
    return this.positionRepository.save(position);
  }

  findAll() {
    return this.positionRepository.find();
  }

  findOne(id: number) {
    return this.positionRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    await this.positionRepository.update(id, updatePositionDto);
    return this.findOne(id);
  }

  remove(id: number) {
    this.positionRepository.delete(id);
    return `This action removes a #${id} position`;
  }
}
