Function::bind = (bind) ->
  self = this
  ->
    args = Array::slice.call(arguments_)
    self.apply bind or null, args

isInt = (n) ->
  (n % 1) is 0

TRANSITIONEND = "transitionend webkitTransitionEnd oTransitionEnd"

# http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (->
  window.requestAnimationFrame or window.webkitRequestAnimationFrame or window.mozRequestAnimationFrame or window.oRequestAnimationFrame or window.msRequestAnimationFrame or (callback, element) -> # function 
# DOMElement
    window.setTimeout callback, 1000 / 60
)()
getUrlVars = ->
  
  #from http://snipplr.com/view/19838/get-url-parameters/
  vars = {}
  parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/g, (m, key, value) ->
    vars[key] = value
  )
  vars
