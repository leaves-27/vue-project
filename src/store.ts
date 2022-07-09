import { reactive } from 'vue'

interface GlobalState {
  token: string;
  updateToken: (token:string)=>void
}

export const store = reactive<GlobalState>({
  token: '',
  updateToken(token){
    this.token = token;
  }
})