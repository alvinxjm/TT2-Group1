function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user["access_token"]) {
      return { 
        Authorization: 'Bearer ' + user["access_token"],
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
    } else {
      return {};
    }
}

export default authHeader