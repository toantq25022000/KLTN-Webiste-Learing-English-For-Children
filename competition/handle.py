import random
import string
from .models import RoomCompetition
def get_random_string_digits(length):
    # choose from all lowercase letter
    letters = (string.ascii_lowercase + string.digits)
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

def check_id_room(room_id):
    check = False
    check_room = RoomCompetition.objects.filter(id_room = room_id)
    if check_room:
        check = True
    return check
