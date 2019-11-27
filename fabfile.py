# -*- coding:utf-8 -*-
from fabric.api import *

env.roledefs = {
    'product_server': ['182.92.227.219']
}
env.key_filename = '~/.ssh/id_rsa.pub'
env.shell = "/bin/bash -l -c -i"

@roles('product_server')
def product(op='restart', branch='master'):
    env.user = "jack"
    print 'product host', env.host
    with cd('/home/jack/website'):
        run('git fetch')
        run('git checkout %s;' % branch)
        run('git pull origin %s;' % branch)
        run('NODE_ENV=production gulp build')
