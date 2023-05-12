import '../css/app.css'

window.onload = () => {
  const form = document.querySelector('form')
  const imageInput = document.querySelector('#image')
  const selectImageBtn = document.querySelector('#upload')

  selectImageBtn.onclick = () => imageInput.click()

  form.onchange = (ev) => {
    const files = ev.target.files
    const file = files[0]

    if (file) {
      selectImageBtn.setAttribute('disabled', true)
      selectImageBtn.classList.add('loading')

      form.submit()
    }
  }
}
