import { Controller, Post, Body, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class AppController {
  private tasks: any[] = []; // Simulasi database

  // 1. TANGKAP EVENT ASYNC (RabbitMQ)
  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: any) {
    console.log('--- RabbitMQ: Menerima Pesan User Baru ---', data);
    
    // Otomatis buat task "Welcome" untuk user baru tersebut
    const autoTask = {
      id: Date.now(),
      userId: data.userId,
      title: `Welcome Task for ${data.email}`,
      status: 'Auto-Generated'
    };
    this.tasks.push(autoTask);
    console.log('Task otomatis berhasil dibuat.');
  }

  // 2. API CREATE TASK MANUAL (Untuk Laravel)
  @Post('create')
  async createManualTask(@Body() dto: CreateTaskDto) {
    const newTask = {
      id: Date.now(),
      ...dto,
      title: `Order Product #${dto.productId}`,
      status: 'Manual'
    };
    this.tasks.push(newTask);
    
    return {
      event: "task.created",
      data: newTask
    };
  }

  // Helper untuk cek data
  @Get()
  getAllTasks() {
    return this.tasks;
  }
}