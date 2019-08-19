//Storage의 기본값은 null입니다.
export default{
    get(key){
        return localStorage.getItem(key);
    }, 
    set(key, value){
        localStorage.setItem(key, value)
    } 
}