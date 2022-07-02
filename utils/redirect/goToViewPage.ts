export function goToViewPage(token: string): void {
    window.location.href = window.location.origin + '/form/view?token=' + (token)
}