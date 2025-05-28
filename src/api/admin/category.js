import axios from '@/axios'

export function getCategoryPageList(data){
    return axios.post("/admin/category/list",data)
}