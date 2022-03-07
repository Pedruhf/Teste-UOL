import { Customer } from "../models/customer";

export function validateCreateUser(customer: Customer) {
  validateName(customer.name);
  validateEmail(customer.email);
  validateCPF(customer.id);
  validatePhone(customer.phone);
  validateStatus(customer.status);
}

function validateName(name: string): void {
  if (!name || !name.trim()) {
    throw new Error("Por favor, informe seu nome completo");
  }

  if (name.length < 3) {
    throw new Error("O nome deve ter pelo menos 3 caracteres");
  }
}

function validateEmail(email: string): void {
  if (!email || !email.trim()) {
    throw new Error("Por favor, informe seu e-mail");
  }

  const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(!regExpEmail.test(email)) {
    throw new Error("Padrão inválido para o e-mail. O e-mail deve ter o formato como o seguinte exemplo: email@exemplo.com");
  }
}

function validateCPF(cpf: string): void {
  if (!cpf || !cpf.trim()) {
    throw new Error("Por favor, informe seu CPF")
  }

  const regExpCPF = /[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/;

  if(!regExpCPF.test(cpf)) {
    throw new Error("Padrão inválido para o CPF. O CPF deve ter o formato como o seguinte exemplo: 000.000.000-00");
  }
}

function validatePhone(phone: string): void {
  if (!phone || !phone.trim()) {
    throw new Error("Por favor, informe seu telefone")
  }

  const regExpPhone = /\([0-9]{2}\)\s[0-9]{5}-[0-9]{4}/;

  if(!regExpPhone.test(phone)) {
    throw new Error("Padrão inválido para o telefone. O telefone deve ter o formato como o seguinte exemplo: (00) 00000-0000");
  }
}

function validateStatus(status: string): void {
  const statusOptions = ['active', 'inactive', 'waiting', 'disabled'];
  if (!statusOptions.some(option => option === status)) {
    throw new Error("Insira um status válido para o usuário");
  }
}