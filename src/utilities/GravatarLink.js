import md5 from 'md5'

export default function link (hash, email, size = 80, defaultImg = 'retro', rating = 'g') {
  const img = [
    '//gravatar.loli.net/avatar/',
    hash || md5(email.trim().toLowerCase()),
    `?s=${size}`,
    `&d=${defaultImg}`,
    `&r=${rating}`
  ]
  return img.join('')
}
