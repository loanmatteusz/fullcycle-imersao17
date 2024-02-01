import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { Product } from './modules/products/entities/product.entity';
import { OrdersModule } from './modules/orders/orders.module';
import { Order } from './modules/orders/entities/order.entity';
import { OrderItem } from './modules/orders/entities/order-item.entity';
import { AuthModule } from './modules/auth/auth.module';
import { RebbitmqModule } from './modules/rebbitmq/rebbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "root",
      password: "root",
      database: "nest",
      entities: [
        Product,
        Order,
        OrderItem
      ],
      synchronize: true,
      logging: true,
    }),
    ProductsModule,
    OrdersModule,
    AuthModule,
    RebbitmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
