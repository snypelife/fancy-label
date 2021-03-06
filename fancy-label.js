// matches() polyfill
// --------------------
+function (root, doc) {  
  var matches = doc.documentElement.matchesSelector ||
                doc.documentElement.webkitMatchesSelector ||
                doc.documentElement.mozMatchesSelector ||
                doc.documentElement.oMatchesSelector ||
                doc.documentElement.msMatchesSelector

  root.matches = matches
}(this, document)

+function (doc) {
  var placeholderToLabel = function (evt) {
        if (matches.call(evt.target, 'input, select')) {
          var input = evt.target
            , text = input.getAttribute('placeholder')
          
          if (!text) {
            return
          }

          if (!doc.querySelector('[for="' + input.id + '"]')) {
            var label = doc.createElement('label')

            input.parentNode.style.position = 'relative'

            label.classList.add('fancy-label')
            label.setAttribute('for', input.id)
            label.innerHTML = input.getAttribute('placeholder')
            label.style.top = (input.offsetTop - (input.offsetHeight / 2)) - 3 + 'px'
            label.style.left = input.offsetLeft + 'px'

            input.parentNode.insertBefore(label, input)
          }
          setTimeout(function () {
            input.previousSibling.classList[input.value !== '' ? 'add' : 'remove']('visible')
          }, 10)
        }
      }

  doc.addEventListener('keydown', placeholderToLabel, false)
  doc.addEventListener('change', placeholderToLabel, false)
}(document)
