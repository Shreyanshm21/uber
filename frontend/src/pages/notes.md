axios.get(
  `${import.meta.env.VITE_BASE_URL}/captains/profile`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
.then((response) => {
  if (response.status === 200) {
    setCaptain(response.data.captain);
    setIsLoading(false); // ✅ corrected from setisLoading to setIsLoading
  }
})
.catch((err) => {
  console.log(err);
  localStorage.removeItem('token');
  navigate('/captain-login');
});
