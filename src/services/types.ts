export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  email: string;
  username: string;
  password: string;
}
