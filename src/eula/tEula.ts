export interface EulaResponse {
  message: string;
  data: Data;
}

export interface Data {
  url: string;
  actionsAvailable: string[];
}

export interface EulaParams{
  action: EulaAction
}

type EulaAction = 'ACCEPT' | 'PENDING' | 'REJECT' | 'REMOVE' | 'DELETE'