const authHeader = (): any => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    // for Node.js Express back-end
    return { 'auth-token': user.token };
  } else {
    return {};
  }
};

export default authHeader;
