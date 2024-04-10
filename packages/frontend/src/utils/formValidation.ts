export function fieldRequired(field: string) {
  return (value) => {
    if (value) return true
    return `${field} é obrigatório`
  }
}

export function fieldMinLength(field: string, length: number) {
  return (value) => {
    if (value?.length >= length) return true
    return `${field} precisa ter no mínimo ${length} caracteres`
  }
}

export function fieldMaxLength(field: string, length: number) {
  return (value) => {
    if (value?.length <= length) return true
    return `${field} precisa ter no máximo ${length} caracteres`
  }
}

export function fieldIsEmail(field: string) {
  return (value) => {
    if (/.+@.+\..+/.test(value)) return true
    return `${field} precisa ser um e-mail válido`
  }
}

export function fieldIsCpf(field: string) {
  return (value) => {
    if (value?.length <= 14 && /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)) return true
    return `${field} precisa ser um CPF válido`
  }
}
