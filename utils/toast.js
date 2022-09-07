function toast(title, icon, duration) {
	uni.showToast({
		title,
		icon,
		duration
	})
}
toast.err = function(title, duration = 3000) {
	uni.showToast({
		title,
		icon: 'error',
		duration
	})
}
toast.success = function(title, duration = 3000) {
	uni.showToast({
		title,
		icon: 'success',
		duration
	})
}
export default toast