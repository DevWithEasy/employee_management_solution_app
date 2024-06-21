function getId(n) {
    if (n === 0) {
        return '001'
    } else if (n > 0 && n < 10) {
        return `00${n + 1}`
    } else if (n > 9 && n < 100) {
        return `0${n + 1}`
    } else {
        return `${n + 1}`
    }
}

export default getId