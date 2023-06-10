function checkTokenExists(tokenName) {
  const cookies = document.cookie;

  // Split the cookies string into an array of individual cookies
  const cookieArray = cookies.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    // Remove leading and trailing spaces from the cookie
    const cookie = cookieArray[i].trim();

    // Check if the cookie starts with the specified token name
    if (cookie.startsWith(`${tokenName}=`)) {
      return true;
    }
  }
  
  return false;
}


export default checkTokenExists;