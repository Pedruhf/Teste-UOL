export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

export const customerStatus: any = {
  active: {
    name: "Ativo",
    color: "#4AAD5B",
  },
  inactive: {
    name: "Inativo",
    color: "#D73240",
  },
  waiting: {
    name: "Aguardando ativação",
    color: "#D3A710",
  },
  disabled: {
    name: "Desativado",
    color: "#D2D2D2",
  }
}