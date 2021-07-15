export const apiTable = {
    async getCarsData() {
        const responce = await fetch("https://city-mobil.ru/api/cars");
        return await responce.json();
    }
}
