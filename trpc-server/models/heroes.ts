import { Hero } from "../types/heroes";
import axios from 'axios'

interface ITRPCResponse{
  result: {
      data: Hero[];
  }
}

export const all = async(): Promise<Hero[]> => {
  return await axios.get('http://localhost:3000/heroes').then(
    response => { return response.data }
  );
  };

export const findById = async(input: string): Promise<Hero> => {
  console.log(input);
   return await axios.get('http://localhost:3000/heroes').then(
     response => { 
      return response.data.filter((item: Hero) => item.id === input)?.[0]}
   );
   };

export const create = async(newHero: Hero): Promise<ITRPCResponse> => {
    return await axios.post<ITRPCResponse>('http://localhost:3000/heroes', newHero).then(
      response => { 
       return response.data}
    );
    };

export const deleteById = async(id: string): Promise<ITRPCResponse> => {
  console.log(id);
    return await axios.delete<ITRPCResponse>('http://localhost:3000/heroes'+'/'+id).then(
      response => { 
      return response.data}
    );
    };

export const update = async(id: string, updatedHero: Hero): Promise<ITRPCResponse> => {
    return await axios.put<ITRPCResponse>('http://localhost:3000/heroes'+'/'+id, updatedHero).then(
        response => { 
        return response.data}
    );
    };
