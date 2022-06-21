import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Home } from './home.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private homeRepository: Repository<Home>,
  ) {}

  async add(home) {
    const newHome = this.homeRepository.create(home);

    const saved = await this.homeRepository.save(newHome);
    console.log(saved);
    return saved;
  }
}
