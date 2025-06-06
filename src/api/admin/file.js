import axios from "@/axios";
//上传文件接口
export function uploadFile(formData) {
    return new Promise((resolve, reject) => {
        // 从 FormData 中提取图片 File
        const file = formData.get("file");

        if (!(file instanceof File)) {
            return reject(new Error("FormData 中未找到有效的图片文件"));
        }

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        return reject(new Error("WebP 转换失败"));
                    }

                    // 创建新的 FormData，使用 webp 图片替换
                    const newFormData = new FormData();
                    newFormData.append("file", blob, file.name.replace(/\.\w+$/, ".webp"));

                    // 其他字段也复制进来（如果有）
                    for (let [key, value] of formData.entries()) {
                        if (key !== "file") {
                            newFormData.append(key, value);
                        }
                    }

                    axios
                        .post("/admin/file/upload", newFormData)
                        .then(resolve)
                        .catch(reject);
                },
                "image/webp",
                0.8
            );
        };

        img.onerror = reject;
        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}
