import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Req() request: Request,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create({
      ...createOrderDto,
      client_id: request["user"].sub,
    });
  }

  @Get()
  findAll(
    @Req() request: Request,
  ) {
    const { sub } = request["user"];
    return this.ordersService.findAll(sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    const { sub } = request["user"];
    return this.ordersService.findOne(id, sub);
  }
}
