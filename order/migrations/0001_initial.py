# Generated by Django 3.0.14 on 2021-11-25 17:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateTimeField(auto_now_add=True)),
                ('ordered_date', models.DateTimeField()),
                ('ordered', models.BooleanField(default=False)),
                ('payment_method', models.CharField(choices=[('Cash on Delivery', 'Thanh toán khi nhận hàng'), ('PayPal', 'PayPal')], default='Cash on Delivery', max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='OrderCashOnDelivery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=0, default=0, max_digits=8)),
                ('status', models.CharField(choices=[('A', 'Chưa duyệt đơn hàng'), ('B', 'Đã duyệt đơn hàng'), ('C', 'Nhân viên đang đến'), ('D', 'Đã thanh toán tiền')], default='A', max_length=30)),
                ('time_order', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchased', models.BooleanField(default=False)),
                ('total_price', models.DecimalField(decimal_places=0, default=0, max_digits=8)),
                ('vip_days', models.PositiveSmallIntegerField(default=0)),
                ('is_lifetime', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paymentId', models.CharField(blank=True, max_length=255, null=True)),
                ('orderId', models.CharField(blank=True, max_length=255, null=True)),
                ('amount', models.DecimalField(decimal_places=0, default=0, max_digits=8)),
                ('payment_text_method', models.CharField(blank=True, max_length=50, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='order.Order')),
            ],
        ),
    ]