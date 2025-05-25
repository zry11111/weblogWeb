import 'element-plus/es/components/message/style/css'
import nprogress from 'nprogress'
// 消息提示
export function showMessage(message = '提示内容', type = 'success', customClass = '') {
    return ElMessage({
        type: type,
        message,
        customClass,
    })
}
export function showPageLoading() {
    nprogress.start()
}
export function hidePageLoading() {
    nprogress.done()
}