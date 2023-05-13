function isSafari(a) {
  return /safari|applewebkit/i.test(a)
}

function isIos(a) {
  return /iPad|iPhone|iPod/.test(a)
}

function isMacOS(a) {
  return /Mac OS X/.test(a)
}

/**
 *
 * @param {File} file
 * @returns {string}
 */
export async function toDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onerror = () => {
      resolve('')
    }

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.readAsDataURL(file)
  })
}

/**
 *
 * @param {*} node
 * @param {string} caption
 * @returns
 */
async function generateAndDownloadImage(node, caption) {
  const { toBlob } = await import('html-to-image')

  const userAgent = navigator.userAgent

  if (isSafari(userAgent) || isIos(userAgent) || isMacOS(userAgent)) {
    // https://github.com/bubkoo/html-to-image/issues/361#issuecomment-1402537176
    await toBlob(node)
    await toBlob(node)
    await toBlob(node)
  }

  const blob = await toBlob(node, {
    type: 'image/jpeg',
    backgroundColor: 'white',
    pixelRatio: 2,
  })

  if (!blob) {
    return
  }

  const filename = [caption.replace(/ +/, '-'), Date.now()].join('-') + '.jpg'
  const dataUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.download = filename
  a.href = dataUrl
  a.click()

  URL.revokeObjectURL(dataUrl)
}

// window.generateAndDownloadImage = generateAndDownloadImage

window.onload = () => {
  /** @type {HTMLButtonElement} */
  const downloadBtn = document.querySelector('#download-poem')
  const caption = document.querySelector('#caption')
  const poem = document.querySelector('#poem')

  downloadBtn.onclick = async () => {
    downloadBtn.classList.add('loading')
    downloadBtn.setAttribute('disabled', true)

    try {
      await generateAndDownloadImage(poem, caption.textContent)
    } catch (error) {
      console.error(error)
    }

    downloadBtn.classList.remove('loading')
    downloadBtn.removeAttribute('disabled')
  }
}
