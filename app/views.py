from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

def index(request):
    template = loader.get_template('Index.jinja')
    data = {
        'data': {
            'title': 'Hello man',
            'arr': [1,2,3,4,5,6,7,8,9]
        }
    }
    return HttpResponse(template.render(data))
