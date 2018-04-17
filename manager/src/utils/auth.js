
export function getUsername(){
  return localStorage.getItem('username');
}
export function setUsername(msg){
  localStorage.setItem('username',msg);
}
