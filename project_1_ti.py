#!/usr/bin/env python3
import cgi
import cgitb

from math import tan
from math import cos
from math import pi
import codecs
cgitb.enable()
form = cgi.FieldStorage()
power = int(form.getvalue("power", "(no data)"))
angle = int(form.getvalue("angle", "(no data)"))

def function():
    g = 9.80665
    inradian = angle * (pi/180)
    print("{ \"elementy\" : [")
    for el in range(501):
        x =int(el)
        y = x * tan(inradian) - ((g / ( 2*(power**2) * cos(inradian)**2)) * (x**2) )
        print ('{"x" : "' + str(x) + '", "y" : ' + str(y+60) +'}')
        if x != 500:
            print(',')
    print("]}")




if __name__ == '__main__':
    print ("Content-type: text/html\n")
    function()
