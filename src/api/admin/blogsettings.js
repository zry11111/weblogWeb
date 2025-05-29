import axios from '@/axios';
export function getBlogSettings() {
    return axios.post("/admin/blog/settings/detail")
}
