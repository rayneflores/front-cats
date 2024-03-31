export interface AuthResponse {
  body: {
    email: string;
    token: string;
  };
}

export interface AuthResponseError {
    body: {
        error: string;
    }
}

export interface Cat {
  id: number,
  name: string,
  age: number,
  createdAt: string,
  updatedAt?: string | undefined,
  deletedAt?: string | undefined,
  userEmail: string,
  breed: {
    id: number,
    name: string
  }
}