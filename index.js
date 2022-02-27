/* eslint-disable eqeqeq */

const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const b = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const c = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

const regex = /^(\d{3})(\d{3})(\d{3})(\d{3})(\d{3})$/

const getLT100 = n => `${a[n[0]]} hundred `
const getGT20 = n => `${c[n[0]]} `
const getB10A20 = n => `${b[n[0]]} `
const getLT10 = n => ` ${a[n[0]]} `

module.exports = function numWords (input) {
  const num = Number(input)
  if (isNaN(num)) return ''
  if (num === 0) return 'zero'

  function convertThrees (substr_) {
    // 099 099 so no need to left pad here -- console.log(substr_, ('000' + substr_).slice(-3))
    const [, n1, n2, n3] = substr_.match(/^(\d)(\d)(\d)$/)

    let str = ''
    str += n1 != 0 ? getLT100(n1) : ''
    str += n2 != 0 && Number(n2) != 1 ? getGT20(n2) : ''
    str += n2 != 0 && Number(n2) === 1
      ? getB10A20(n3)
      : n3 != 0 ? getLT10(n3) : ''
    return str
  }

  const numStr = Math.sqrt(num ** 2).toString()
  if (numStr.length > 15) {
    throw new Error('overflow')
  }
  const [, n1, n2, n3, n4, n5] = ('000000000000000' + numStr).slice(-15).match(regex) // left pad zeros

  let words_ = ''
  words_ += n1 != 0 ? `${convertThrees(n1)} trillion, ` : ''
  words_ += n2 != 0 ? `${convertThrees(n2)} billion, ` : ''
  words_ += n3 != 0 ? `${convertThrees(n3)} million, ` : ''
  words_ += n4 != 0 ? `${convertThrees(n4)} thousand, ` : ''
  words_ += n5 != 0 ? convertThrees(n5) : ''

  if (words_[words_.length - 2] === ',') {
    words_ = words_.slice(0, words_.length - 2)
    words_ = words_ + '.'
  }

  return words_.split('  ').join(' ').trim()
}
