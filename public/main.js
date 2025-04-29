// var thumbUp = document.getElementsByClassName("fa-thumbs-up");
// var thumbDown = document.getElementsByClassName("fa-thumbs-down"); //added this to mirror first thumbsup to down
// var trash = document.getElementsByClassName("fa-trash");
const deleteButtons = document.querySelectorAll('.delete');
const starButtons = document.querySelectorAll('.star');


Array.from(deleteButtons).forEach(function(button) {
  button.addEventListener('click', function(){
    const character = button.dataset.character;
    const quote = button.dataset.quote;
    fetch('/quotes', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'character': character,
        'quote': quote
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

//edited old thumbup from sav demo
Array.from(starButtons).forEach(function(button) {
  button.addEventListener('click', function() {
    const character = button.dataset.character;
    const quote = button.dataset.quote;

    fetch('/star', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        character: character,
        quote: quote
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log('Star Added!');
      window.location.reload(true);
    });
  });
});

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('/quotes', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// //Newly Added copied Thumb Down function foreach - Calvin, ONLY CHANGE WAS array.from(NAME) & JUST CHANGE FETCH PATH TO 'DOWN'!
// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     fetch('down', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbUp':thumbUp
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

