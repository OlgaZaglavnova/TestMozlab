export interface Msg{
    id?: string,
    text: string,
    likes: number
}

export interface Environment{
    production: boolean,
    apiKey:string,
    dbUrl: string
}

export interface AddResponse{
    name: string
  }