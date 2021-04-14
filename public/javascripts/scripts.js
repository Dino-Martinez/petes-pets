if (document.querySelector('#new-pet')) {
  document.querySelector('#new-pet').addEventListener('submit', e => {
    console.log('ya')
    e.preventDefault()

    let pet = {}
    const inputs = document.querySelectorAll('.form-control')
    for (const input of inputs) {
      pet[input.name] = input.value
    }
    console.log(pet)
    axios
      .post('/pets', pet)
      .then(function(response) {
        window.location.replace(`/pets/${response.data._id}`)
      })
      // New Catch Code
      .catch(function(error) {
        const alert = document.getElementById('alert')
        alert.classList.add('alert-warning')
        alert.textContent =
          'Oops, something went wrong saving your pet. Please check your information and try again.'
        alert.style.display = 'block'
        setTimeout(() => {
          alert.classList.remove('alert-warning')
          alert.style.display = 'none'
        }, 3000)
      })
  })
}
