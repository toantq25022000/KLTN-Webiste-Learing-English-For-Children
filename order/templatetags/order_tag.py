from django import template
from order.models import (
    Order,OrderItem
)
register = template.Library()


