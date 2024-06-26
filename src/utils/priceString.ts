export default function priceToString(val: number) {
  let maximumFractionDigits = 3
  if (val < 0.1) {
    maximumFractionDigits = Math.floor(1 / val).toString().length + 2
    if (maximumFractionDigits > 7) maximumFractionDigits = 7
  } else if (val > 10000) {
    maximumFractionDigits = 0
  }
  const floorDec = Math.pow(10, maximumFractionDigits)
  return (Math.floor(val * floorDec) / floorDec).toLocaleString('en', { maximumFractionDigits })
}
