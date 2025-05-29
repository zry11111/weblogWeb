import axios from "@/axios";
//上传文件接口
export function uploadFile(data) {
    return axios.post("/admin/file/upload", data);
}