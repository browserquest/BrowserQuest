generateCollisionGrid = ->
  tileIndex = 0
  mapData.grid = []
  j = undefined
  i = 0

  while i < mapData.height
    mapData.grid[i] = []
    j = 0
    while j < mapData.width
      mapData.grid[i][j] = 0
      j++
    i++
  _.each mapData.collisions, (tileIndex) ->
    pos = tileIndexToGridPosition(tileIndex + 1)
    mapData.grid[pos.y][pos.x] = 1

  _.each mapData.blocking, (tileIndex) ->
    pos = tileIndexToGridPosition(tileIndex + 1)
    mapData.grid[pos.y][pos.x] = 1  if mapData.grid[pos.y] isnt `undefined`

generatePlateauGrid = ->
  tileIndex = 0
  mapData.plateauGrid = []
  j = undefined
  i = 0

  while i < mapData.height
    mapData.plateauGrid[i] = []
    j = 0
    while j < mapData.width
      if _.include(mapData.plateau, tileIndex)
        mapData.plateauGrid[i][j] = 1
      else
        mapData.plateauGrid[i][j] = 0
      tileIndex += 1
      j++
    i++
tileIndexToGridPosition = (tileNum) ->
  x = 0
  y = 0
  getX = (num, w) ->
    return 0  if num is 0
    (if (num % w is 0) then w - 1 else (num % w) - 1)

  tileNum -= 1
  x = getX(tileNum + 1, mapData.width)
  y = Math.floor(tileNum / mapData.width)
  x: x
  y: y
importScripts "../maps/world_client.js", "lib/underscore.min.js"
onmessage = (event) ->
  generateCollisionGrid()
  generatePlateauGrid()
  postMessage mapData
