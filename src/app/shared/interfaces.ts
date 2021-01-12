export interface Msg{
    id?: number,
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