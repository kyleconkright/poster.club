export interface ActionResponse<T> {
    type: string,
    payload?: T,
  }