function cpfMask(cpf: string): string {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

function phoneMask(phone: string): string {
  return phone
    .replace(/\D/g, '')
    .replace(/(\d{0})(\d)/, '$1($2')
    .replace(/(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

export { cpfMask, phoneMask };
