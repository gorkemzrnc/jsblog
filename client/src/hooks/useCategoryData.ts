import { useEffect, useState } from "react"
import { getCategories } from "../lib/api";
import { CategoriesParams } from '../types'

export const useCategory = ()=>{
  const [categories, setCategories] = useState<CategoriesParams[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchCategories = async ()=>{
      setLoading(true);
      try{
        const response = await getCategories();
        setCategories(response.data);
      }catch(err: any){
        setError(err);
      }finally{
        setLoading(false);
      }
    }
    fetchCategories();
  },[]);

  return {
    categories, loading, error
  }
}