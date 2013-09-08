{exec} = require 'child_process'
COFFEE = 'coffee --compile'
COFFE_MAP = '#{COFFEE} --map'

task 'build', 'Build client and server code', ->
    invoke 'build:client'
    invoke 'build:server'

task 'build:client', 'Build client code only', ->
    exec "#{COFFEE} client/js/", (err, stdout, stderr) ->
        throw err if err

task 'build:server', 'Build server code only', ->
    exec "#{COFFEE} server/js/", (err, stdout, stderr) ->
        throw err if err
