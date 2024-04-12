export function fieldRequired(field: string) {
  return (value) => {
    if (value) return true
    return `${field} é obrigatório`
  }
}

export function fieldMinLength(field: string, length: number) {
  return (value) => {
    if (value?.length && (value.trim().length  >= length)) return true
    return `${field} precisa ter no mínimo ${length} caracteres`
  }
}

export function fieldMaxLength(field: string, length: number) {
  return (value) => {
    if (value?.length && (value.trim().length  <= length)) return true
    return `${field} precisa ter no máximo ${length} caracteres`
  }
}

export function fieldIsNumber(field: string) {
  return (value) => {
    if (!isNaN(value)) return true
    return `${field} precisa ser um número`
  }
}

export function fieldIsEmail(field: string) {
  return (value) => {
    if (/.+@.+\..+/.test(value)) return true
    return `${field} precisa ser válido`
  }
}

export function fieldIsCpf(field: string) {
  return (value) => {
    if (value?.length <= 14 && /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)) return true
    return `${field} precisa ser válido`
  }
}

export function fieldIsStrongPassword(field: string) {
  return (value) => {
    if (value?.length < 8) return `${field} precisa ter no mínimo 8 caracteres`
    if (!/[A-Z]/.test(value)) return `${field} precisa ter pelo menos uma letra maiúscula`
    if (!/[a-z]/.test(value)) return `${field} precisa ter pelo menos uma letra minúscula`
    if (!/[0-9]/.test(value)) return `${field} precisa ter pelo menos um número`
    if (!/[^A-Za-z0-9]/.test(value)) return `${field} precisa ter pelo menos um caractere especial`
    return true
  }
}
