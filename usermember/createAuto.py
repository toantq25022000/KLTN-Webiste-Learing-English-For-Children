from datetime import datetime


def create_auto_id_std(user_id):
    first_str = '2001'
    year_today = datetime.now().year % 100
    id_format = "{0:0>4}".format(user_id)
    auto_id = first_str + str(year_today) + id_format
    print(auto_id)
    
    return auto_id
    
    